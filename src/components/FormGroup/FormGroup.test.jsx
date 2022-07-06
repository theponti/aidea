import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import FormGroup from ".";

describe("<FormGroup/>", () => {
  it("should render component", () => {
    const { container } = render(<FormGroup />);
    expect(container).toMatchSnapshot();
  });
});
