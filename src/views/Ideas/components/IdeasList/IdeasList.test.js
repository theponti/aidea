import { getMockState, getMockUserState } from "@aidea/mocks";
import { actionTypes, getIdeas } from "@aidea/services/ideas/ideas.ducks";
import { IdeasContext } from "@aidea/services/ideas/ideas.provider";
import { useAuth0 } from "@auth0/auth0-react";
import { render } from "@testing-library/react";
import React from "react";
import { act } from "react-dom/test-utils";
import Ideas from ".";

jest.mock("@aidea/services/ideas/ideas.ducks", () => ({
  getIdeas: jest.fn(),
  actionTypes: {},
}));

describe("<IdeasList/>", () => {
  xit("should render ideas", async () => {
    const state = getMockState();
    const dispatch = jest.fn();

    getIdeas.mockReturnValue(state.ideas);

    await act(async () => {
      render(
        <IdeasContext.Provider
          value={{
            state: {
              ideas: undefined,
              isLoading: false,
              error: null,
            },
            dispatch,
          }}
        >
          <Ideas />
        </IdeasContext.Provider>
      );
    });

    expect(dispatch).toHaveBeenCalledWith({ type: actionTypes.FETCH_IDEAS });
    expect(getIdeas).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.FETCH_IDEAS_SUCCESS,
      payload: state.ideas,
    });
  });

  it("should render ideas", () => {
    useAuth0.mockReturnValue({ user: getMockUserState() });
    const state = getMockState();
    const dispatch = jest.fn();
    const { getByText } = render(
      <IdeasContext.Provider
        value={{ state: { ideas: state.ideas, isLoading: false }, dispatch }}
      >
        <Ideas />
      </IdeasContext.Provider>
    );
    expect(getByText("upvotes: 0")).toBeInTheDocument();
    expect(getByText("upvotes: 5")).toBeInTheDocument();
  });
});
