import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextResponse } from "next/server";

import { openai } from "@/lib/openai";
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
    const { messages } = await req.json();

    // Request the OpenAI API for the response based on the prompt
    const response = await openai.chat.completions.create({
      ...DEFAULT_MODEL_OPTIONS,
      stream: true,
      messages: messages,
    });

    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response);

    // Respond with the stream
    return new StreamingTextResponse(stream);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error({ error: e });
    return NextResponse.json(null, {
      status: (e as { status: number }).status ?? 500,
    });
  }
}
