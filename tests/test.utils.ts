import { setupServer } from "msw/node";
import { afterAll, beforeAll } from "vitest";

export const testServer = setupServer();

export const baseURL = "http://localhost:3000";

beforeAll(() => {
  testServer.listen();
});

afterAll(() => {
  testServer.close();
});
