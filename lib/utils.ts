import { ChatOpenAI, ChatOpenAICallOptions } from "@langchain/openai";
import { type ClassValue, clsx } from "clsx";
import { BaseLanguageModelInput } from "langchain/base_language";
import { HttpResponseOutputParser } from "langchain/output_parsers";
import { PromptTemplate } from "langchain/prompts";
import { Runnable } from "langchain/runnables";
import { AIMessageChunk } from "langchain/schema";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createChainFromModal(
  model:
    | ChatOpenAI
    | Runnable<BaseLanguageModelInput, AIMessageChunk, ChatOpenAICallOptions>,
  prompt: PromptTemplate,
  parser: HttpResponseOutputParser
) {
  return prompt.pipe(model).pipe(parser);
}

export const DEFAULT_MODEL_OPTIONS = {
  apiKey: process.env.OPENAI_API_KEY!,
  model: "gpt-3.5-turbo",
  // model: "gpt-4o",
  temperature: 0.8,
};
