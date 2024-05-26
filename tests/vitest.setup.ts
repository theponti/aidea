import "@testing-library/jest-dom";
import { vi } from "vitest";
import "./test.utils";

// Allow router mocks.
// eslint-disable-next-line no-undef
vi.mock("next/router", () => require("next-router-mock"));
