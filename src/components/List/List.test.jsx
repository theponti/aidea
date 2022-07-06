import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import List from "./List";

describe("<List/>", () => {
  it("should render component", () => {
    const { container } = render(<List data={[]} />);
    expect(container).toMatchSnapshot();
  });
});
