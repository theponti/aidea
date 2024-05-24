import { PromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { Message as VercelChatMessage } from "ai";

import { DEFAULT_MODEL_OPTIONS } from "@/lib/utils";
import { getServerAuthSession } from "@/server/auth";
import { HttpResponseOutputParser } from "langchain/output_parsers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * Basic memory formatter that stringifies and passes
 * message history directly into the model.
 */
const formatMessage = (message: VercelChatMessage) => {
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

  if (!session) {
    return NextResponse.json(null, { status: 401 });
  }

  try {
    // Extract the `messages` from the body of the request
    const { messages } = await req.json();

    const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);

    const currentMessageContent = messages.at(-1).content;

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
        input: currentMessageContent,
      });

    const formattedBufferResult = Buffer.from(result).toString("utf-8");

    return NextResponse.json({ output: formattedBufferResult });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    return NextResponse.json(null, {
      status: (e as { status: number })?.status ?? 500,
    });
  }
}
