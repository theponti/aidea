import { actionTypes, saveIdea } from "@aidea/actions";
import { IdeasContext } from "@aidea/providers/IdeasProvider";
import { act, fireEvent, render } from "@testing-library/react";
import React from "react";
import IdeaForm from ".";

jest.mock("src/actions", () => ({
  saveIdea: jest.fn(),
  actionTypes: {},
}));

xdescribe("<IdeaForm/>", () => {
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
