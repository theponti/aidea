import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Button from ".";

describe("<Button/>", () => {
  it("should render component", () => {
    const { getByTestId } = render(<Button />);
    expect(getByTestId("button")).toMatchSnapshot();
  });

  it("should render a success button", () => {
    const { container } = render(<Button variant="success" />);
    expect(container).toMatchSnapshot();
  });

  it("should render a danger button", () => {
    const { container } = render(<Button variant="danger" />);
    expect(container).toMatchSnapshot();
  });
});
