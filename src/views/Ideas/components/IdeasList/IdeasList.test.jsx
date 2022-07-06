import { useAuth0 } from "@auth0/auth0-react";
import { render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { getMockState, getMockUserState } from "src/mocks";
import { actionTypes, getIdeas } from "src/services/ideas/ideas.ducks";
import { IdeasContext } from "src/services/ideas/ideas.provider";
import { describe, it, vi } from 'vitest';
import Ideas from ".";

vi.mock("src/services/ideas/ideas.ducks", () => ({
  getIdeas: vi.fn(),
  actionTypes: {},
}));

describe.skip("<IdeasList/>", () => {
  it("should render ideas", async () => {
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
