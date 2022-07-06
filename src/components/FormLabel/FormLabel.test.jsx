import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import FormLabel from ".";

describe("<FormLabel/>", () => {
  it("should render component", () => {
    const { container } = render(<FormLabel />);
    expect(container).toMatchSnapshot();
  });
});
