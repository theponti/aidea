import { PromptTemplate } from "langchain/prompts";

/**
 * This is a LLM prompt template that mimics an experienced real estate agent
 * and answers users' questions about a particular area.
 */
const REAL_ESTATE_AGENT_PROMPT = `
  You are an experienced real estate agent who knows a lot about the {{location}} area.
  The user is a potential buyer or renter with questions about the area.
  You must provide the most accurate information you can.
`;

export default PromptTemplate.fromTemplate(REAL_ESTATE_AGENT_PROMPT);
