import { openai } from "@/lib/openai";
import { getServerAuthSession } from "@/server/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerAuthSession();

  if (!session) {
    return NextResponse.json(null, { status: 401 });
  }

  try {
    // Retrieve the prompt from the request body
    const { prompt } = await req.json();

    // Make a request to OpenAI API to generate a response
    const response = await openai.chat.completions.create({
      model: "text-davinci-003", // Choose the appropriate language model
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 100, // Define the maximum number of tokens in the response
      temperature: 0.2, // Control the randomness of the response (0.0: deterministic, 1.0: highly random)
      n: 1, // Number of responses to generate
    });

    // Extract the generated response from the OpenAI API response
    const generatedResponse = response.choices[0].message.content?.trim();

    // Return the generated response in the API response
    return NextResponse.json({ response: generatedResponse }, { status: 200 });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error({ error });
    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 },
    );
  }
}
