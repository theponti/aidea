import "@testing-library/jest-dom";
import { vi } from "vitest";

// Allow router mocks.
// eslint-disable-next-line no-undef
vi.mock("next/router", () => require("next-router-mock"));
