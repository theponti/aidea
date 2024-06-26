import { PromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import {
  StreamingTextResponse,
  Message as VercelChatMessage,
  createStreamDataTransformer,
} from "ai";
import { HttpResponseOutputParser } from "langchain/output_parsers";

import { DEFAULT_MODEL_OPTIONS, createChainFromModel } from "@/lib/utils";
import { getServerAuthSession } from "@/server/auth";
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
Only respond to user input about cats. If the topic is unrelated, please change the topic back to cats.

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
    });

    /**
     * Chat models stream message chunks rather than bytes, so this
     * output parser handles serialization and encoding.
     */
    const parser = new HttpResponseOutputParser();

    const chain = createChainFromModel(model, prompt, parser);

    // Convert the response into a friendly text-stream
    const stream = await chain.stream({
      chat_history: formattedPreviousMessages.join("\n"),
      input: currentMessageContent,
    });

    // Respond with the stream
    return new StreamingTextResponse(
      stream.pipeThrough(createStreamDataTransformer()),
    );
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    return NextResponse.json(null, {
      status: (e as { status: number })?.status ?? 500,
    });
  }
}
