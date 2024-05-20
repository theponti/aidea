import { openai } from "@/lib/openai";
import { DEFAULT_MODEL_OPTIONS } from "@/lib/utils";
import { ChatOpenAI } from "@langchain/openai";
import { OpenAIStream } from "ai";
import { JsonOutputFunctionsParser } from "langchain/output_parsers";
import { PromptTemplate } from "langchain/prompts";
import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const chatRouter = createTRPCRouter({
  createChat: protectedProcedure
    .input(
      z.object({
        message: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { message } = input;

      const response = await openai.chat.completions.create({
        ...DEFAULT_MODEL_OPTIONS,
        stream: true,
        messages: [
          {
            role: "user",
            content: message,
          },
        ],
      });

      const stream = OpenAIStream(response);

      return { stream };
    }),
  getChatResponse: protectedProcedure
    .input(
      z.object({
        chatId: z.string(),
        message: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { chatId, message } = input;
      const [chat, messages] = await ctx.db.$transaction([
        ctx.db.chat.findUnique({
          where: { id: chatId },
        }),
        ctx.db.message.findMany({
          where: { chatId },
        }),
      ]);
      const currentMessageContent = message;

      const TEMPLATE = `Extract the requested fields from the input.

        The field "entity" refers to the first mentioned entity in the input.

        Input:
        {input}`;

      const prompt = PromptTemplate.fromTemplate(TEMPLATE);
      /**
       * Function calling is currently only supported with ChatOpenAI models
       */
      const model = new ChatOpenAI({
        temperature: 0.8,
        modelName: "gpt-3.5-turbo-1106",
      });

      /**
       * We use Zod (https://zod.dev) to define our schema for convenience,
       * but you can pass JSON Schema directly if desired.
       */
      const schema = z.object({
        tone: z
          .enum(["positive", "negative", "neutral"])
          .describe("The overall tone of the input"),
        entity: z.string().describe("The entity mentioned in the input"),
        word_count: z.number().describe("The number of words in the input"),
        chat_response: z.string().describe("A response to the human's input"),
        final_punctuation: z
          .optional(z.string())
          .describe("The final punctuation mark in the input, if any."),
      });

      /**
       * Bind the function and schema to the OpenAI model.
       * Future invocations of the returned model will always use these arguments.
       *
       * Specifying "function_call" ensures that the provided function will always
       * be called by the model.
       */
      const functionCallingModel = model.bind({
        functions: [
          {
            name: "output_formatter",
            description: "Should always be used to properly format output",
            parameters: zodToJsonSchema(schema),
          },
        ],
        function_call: { name: "output_formatter" },
      });

      /**
       * Returns a chain with the function calling model.
       */
      const chain = prompt
        .pipe(functionCallingModel)
        .pipe(new JsonOutputFunctionsParser());

      const result = await chain.invoke({
        input: currentMessageContent,
      });

      return result;
    }),
});
