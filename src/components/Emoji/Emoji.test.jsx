import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Emoji from ".";

describe("<Emoji/>", () => {
  it("should render component", () => {
    const { container } = render(<Emoji label="sheep" emoji="🐑" />);
    expect(container).toMatchSnapshot();
  });
});
