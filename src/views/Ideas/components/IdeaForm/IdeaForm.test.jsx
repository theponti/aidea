import { act, fireEvent, render } from "@testing-library/react";
import { actionTypes, saveIdea } from "src/services/ideas/ideas.ducks";
import { IdeasContext } from "src/services/ideas/ideas.provider";
import { describe, expect, it, vi } from "vitest";
import IdeaForm from ".";

vi.mock("src/services/ideas/ideas.ducks", () => ({
  saveIdea: vi.fn(),
  actionTypes: {},
}));

describe.skip("<IdeaForm/>", () => {
  it("should call addIdea with record", async () => {
    const dispatch = jest.fn();

    const { container } = render(
      <IdeasContext.Provider value={{ dispatch }}>
        <IdeaForm />
      </IdeasContext.Provider>
    );

    const idea = {
      title: "Rocketship for Cats",
      description: "Backpack for cats that takes them to space",
    };

    const titleInput = container.querySelector("input");
    const descriptionInput = container.querySelector("textarea");
    const form = container.querySelector("form");

    await act(async () => {
      fireEvent.change(titleInput, { target: { value: idea.title } });
      fireEvent.change(descriptionInput, {
        target: { value: idea.description },
      });
      fireEvent.submit(form);
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.ADD_IDEA,
    });

    expect(saveIdea).toHaveBeenCalledWith(idea);

    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.LOADED,
    });

    expect(titleInput.value).toEqual("");
    expect(descriptionInput.value).toEqual("");
  });
});
