import { PromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";

import { DEFAULT_MODEL_OPTIONS } from "@/lib/utils";
import { getServerAuthSession } from "@/server/auth";
import { Chat, Message } from "@prisma/client";
import { HttpResponseOutputParser } from "langchain/output_parsers";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * Basic memory formatter that stringifies and passes
 * message history directly into the model.
 */
const formatMessage = (message: Message) => {
  return `${message.role}: ${message.content}`;
};

const TEMPLATE = `
You are an expert at what the user starts the conversation with.

- Only respond based on the conversation topic that was set based on the user's first message.
- Do not introduce new topics.
- Do not provide any information that is not directly related to the user's first message.
- Do not ask questions.
- If the user asks a question, provide a direct answer.
- If the user makes a statement, provide a response that is relevant to the user's statement.
- If the user makes a statement that is not related to the conversation topic, inform the user what the conversation topic is.

Current conversation:
{chat_history}

user: {input}
assistant:`;

export async function POST(req: Request) {
  const session = await getServerAuthSession();
  const cookieStore = cookies();

  if (!session || !session.user) {
    return NextResponse.json(null, { status: 401 });
  }

  try {
    let chat: Chat | null = null;
    // Extract the `messages` from the body of the request
    const hasActiveChat = cookieStore.has("activeChat");

    if (hasActiveChat) {
      chat = await prisma!.chat.findFirst({
        where: {
          id: cookieStore.get("activeChat")!.value,
        },
      });
    } else {
      chat = await prisma!.chat.create({
        data: {
          title: "Basic Chat",
          user: {
            connect: {
              id: session.user.id,
            },
          },
        },
      });
      // Set the chat ID in the headers for future requests
      cookieStore.set("activeChat", chat.id);
    }

    if (!chat) {
      return NextResponse.json(null, { status: 404 });
    }

    const messages = await prisma!.message.findMany({
      where: {
        chatId: chat.id,
      },
    });
    const { message } = await req.json();

    const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);

    const prompt = PromptTemplate.fromTemplate(TEMPLATE);

    const model = new ChatOpenAI({
      ...DEFAULT_MODEL_OPTIONS,
      streaming: false,
    });

    // Convert the response into a friendly text-stream
    const result = await prompt
      .pipe(model)
      /**
       * Chat models stream message chunks rather than bytes, so this
       * output parser handles serialization and encoding.
       */
      .pipe(new HttpResponseOutputParser())
      .invoke({
        chat_history: formattedPreviousMessages.join("\n"),
        input: message,
      });

    const formattedBufferResult = Buffer.from(result).toString("utf-8");
    const newMessages = await prisma!.message.createManyAndReturn({
      data: [
        {
          userId: session.user.id,
          chatId: chat.id,
          role: "user",
          content: message,
        },
        {
          userId: session.user.id,
          chatId: chat.id,
          role: "assistant",
          content: formattedBufferResult,
        },
      ],
      skipDuplicates: true,
    });

    return NextResponse.json({
      messages: messages.concat(newMessages),
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    return NextResponse.json(null, {
      status: (e as { status: number })?.status ?? 500,
    });
  }
}
