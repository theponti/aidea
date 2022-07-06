import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Label from "./Label";

describe("<Label/>", () => {
  it("should render component", () => {
    const { container } = render(<Label />);
    expect(container).toMatchSnapshot();
  });
});
