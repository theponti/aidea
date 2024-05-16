import {NextResponse} from 'next/server';
import {Configuration, OpenAIApi} from 'openai';

const {OPENAI_API_KEY, OPENAI_ORG_ID} = process.env;

const configuration = new Configuration({
  organization: OPENAI_ORG_ID,
  apiKey: OPENAI_API_KEY,
});

// Initialize OpenAI API client
const openai = new OpenAIApi(configuration);

// Define the Next.js API route handler
export async function POST(req: Request) {
  try {
    // Retrieve the prompt from the request body
    const {prompt} = await req.json();

    // Make a request to OpenAI API to generate a response
    const response = await openai.createCompletion({
      model: 'text-davinci-003', // Choose the appropriate language model
      prompt: prompt,
      max_tokens: 100, // Define the maximum number of tokens in the response
      temperature: 0.2, // Control the randomness of the response (0.0: deterministic, 1.0: highly random)
      n: 1, // Number of responses to generate
    });

    // Extract the generated response from the OpenAI API response
    const generatedResponse = response.data.choices[0].text.trim();

    // Return the generated response in the API response
    return NextResponse.json({response: generatedResponse}, {status: 200});
  } catch (error) {
    console.error(error.message);
    return NextResponse.json(
      {error: 'Failed to generate response'},
      {status: 500}
    );
  }
}
