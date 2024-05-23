import { PromptTemplate } from "langchain/prompts";

export const WRITING_PROMPT = `
  The user will provide a passage for comprehensive editing.
  Your task is to perform the following:
  - Correct all grammatical and spelling errors.
  - Rewrite the passage in the style of a highly educated academic, ensuring it is formal and sophisticated.
  - Eliminate any bias present in the text, ensuring the content is objective and neutral.
  - Enhance the argument by adding additional points and evidence that support the main thesis of the passage.

  Here is the passage for you to edit:
  {{Insert passage here}}
`;

export default PromptTemplate.fromTemplate(WRITING_PROMPT);
