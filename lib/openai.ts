import { env } from "env";
import OpenAI from "openai";
import "server-only";

export const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY!,
});
