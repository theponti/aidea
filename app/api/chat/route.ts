import { getServerAuthSession } from "@/server/auth";
import { PromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { StreamingTextResponse, Message as VercelChatMessage } from "ai";
import { HttpResponseOutputParser } from "langchain/output_parsers";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const formatMessage = (message: VercelChatMessage) => {
  return `${message.role}: ${message.content}`;
};

const TEMPLATE = `
Current conversation:
{chat_history}

User: {input}
AI:`;

/**
 * This handler initializes and calls a simple chain with a prompt,
 * chat model, and output parser. See the docs for more information:
 *
 * https://js.langchain.com/docs/guides/expression_language/cookbook#prompttemplate--llm--outputparser
 */
export async function POST(req: NextRequest) {
  const session = await getServerAuthSession();

  if (!session) {
    return NextResponse.json(null, { status: 401 });
  }

  try {
    const body = await req.json();
    const messages = body.messages ?? [];
    const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);
    const currentMessageContent = messages[messages.length - 1].content;
    const prompt = PromptTemplate.fromTemplate(TEMPLATE);

    /**
     * You can also try e.g.:
     *
     * import { ChatAnthropic } from "langchain/chat_models/anthropic";
     * const model = new ChatAnthropic({});
     *
     * See a full list of supported models at:
     * https://js.langchain.com/docs/modules/model_io/models/
     */
    const model = new ChatOpenAI({
      temperature: 0.8,
      modelName: "gpt-3.5-turbo-1106",
    });

    /**
     * Chat models stream message chunks rather than bytes, so this
     * output parser handles serialization and byte-encoding.
     */
    const outputParser = new HttpResponseOutputParser();

    /**
     * Can also initialize as:
     *
     * import { RunnableSequence } from "@langchain/core/runnables";
     * const chain = RunnableSequence.from([prompt, model, outputParser]);
     */
    const chain = prompt.pipe(model).pipe(outputParser);

    const stream = await chain.stream({
      chat_history: formattedPreviousMessages.join("\n"),
      input: currentMessageContent,
    });

    return new StreamingTextResponse(stream);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    return NextResponse.json(null, {
      status: (e as { status: number })?.status ?? 500,
    });
  }
}

export async function GET() {
  const session = await getServerAuthSession();

  if (!session || !session.user || !prisma) {
    return NextResponse.json(null, { status: 401 });
  }

  const cookieStore = cookies();
  const activeChat = cookieStore.get("activeChat");

  if (!activeChat) {
    const newChat = await prisma.chat.create({
      data: {
        userId: session.user.id,
      },
    });
    cookieStore.set("activeChat", newChat.id);
    return NextResponse.json({ chatId: newChat.id, messages: [] });
  }

  const chat = await prisma.chat.findUnique({
    where: {
      id: activeChat.value,
    },
  });

  if (!chat) {
    return NextResponse.json(null, { status: 404 });
  }

  const messages = await prisma.message.findMany({
    where: {
      chatId: chat.id,
    },
  });

  return NextResponse.json({ chatId: chat.id, messages });
}
