import { PromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import {
  Message,
  StreamingTextResponse,
  createStreamDataTransformer,
} from "ai";
import { HttpResponseOutputParser } from "langchain/output_parsers";
import { NextResponse } from "next/server";

import { DEFAULT_MODEL_OPTIONS } from "@/lib/utils";
import { getServerAuthSession } from "@/server/auth";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const session = await getServerAuthSession();

  if (!session) {
    return NextResponse.json(null, { status: 401 });
  }

  try {
    // Extract the `messages` from the body of the request
    const { messages } = (await req.json()) as {
      messages: Message[];
    };

    // Extract the last message in the conversation
    const message = messages.at(-1)?.content;

    if (!message) {
      return NextResponse.json(
        { error: "No message was provided in the request body" },
        { status: 400 },
      );
    }

    const prompt = PromptTemplate.fromTemplate("{message}");

    const model = new ChatOpenAI({
      ...DEFAULT_MODEL_OPTIONS,
    });

    /**
     * Chat models stream message chunks rather than bytes.
     * This output parser handles serialization and encoding.
     */
    const parser = new HttpResponseOutputParser();

    // Create a sequence of operations to run
    const chain = prompt.pipe(model).pipe(parser);

    // Convert the response into a friendly text-stream
    const stream = await chain.stream({ message });

    // Respond with the stream
    return new StreamingTextResponse(
      stream.pipeThrough(createStreamDataTransformer()),
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: e.status ?? 500 });
  }
}
