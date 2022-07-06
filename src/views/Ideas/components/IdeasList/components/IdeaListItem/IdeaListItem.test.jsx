import { act, fireEvent, render } from "@testing-library/react";
import { getMockState, getMockUserState } from "src/mocks";
import { actionTypes, addVoteToIdea } from "src/services/ideas/ideas.ducks";
import { IdeasContext } from "src/services/ideas/ideas.provider";
import { beforeEach, describe, expect, it, vi } from "vitest";
import IdeaListItem from ".";

// vi.mock("@auth0/auth0-react");

vi.mock("src/services/ideas/ideas.ducks", () => ({
  addVoteToIdea: vi.fn(),
  actionTypes: {},
}));

describe.skip("<IdeaListItem/>", () => {
  let dispatch;
  let idea;
  let ideas;
  let user;

  const IdeasProvider = (
    { children } // eslint-disable-line
  ) => (
    <IdeasContext.Provider value={{ state: { ideas }, dispatch }}>
      {children}
    </IdeasContext.Provider>
  );

  beforeEach(() => {
    ideas = getMockState().ideas;
    user = getMockUserState().user;
    // useAuth0.mockReturnValue({ user: { votes: [] } });
    dispatch = vi.fn();
    idea = ideas[1];
  });

  it("should upvote idea", async () => {
    const { container, getByLabelText } = render(
      <IdeasProvider>
        <IdeaListItem idea={idea} />
      </IdeasProvider>
    );
    const upvoteButton = getByLabelText(/upvote/i);
    await act(async () => {
      fireEvent.click(upvoteButton);
    });
    expect(dispatch).toBeCalledWith({ type: actionTypes.IDEA_UPDATE });
    expect(addVoteToIdea).toHaveBeenCalledWith("1", 1);
    expect(dispatch).toBeCalledWith({ type: actionTypes.IDEA_UPDATE_SUCCESS });
    expect(container).toMatchSnapshot();
  });

  it("should downvote idea", async () => {
    const { getByLabelText } = render(
      <IdeasProvider>
        <IdeaListItem idea={idea} />
      </IdeasProvider>
    );

    await act(async () => {
      fireEvent.click(getByLabelText(/downvote/i));
    });

    expect(dispatch).toBeCalledWith({ type: actionTypes.IDEA_UPDATE });
    expect(addVoteToIdea).toHaveBeenCalledWith("1", -1);
    expect(dispatch).toBeCalledWith({ type: actionTypes.IDEA_UPDATE_SUCCESS });
  });

  it("should catch error", async () => {
    const { getByLabelText, getByText } = render(
      <IdeasProvider>
        <IdeaListItem idea={idea} />
      </IdeasProvider>
    );

    const error = "some error";
    addVoteToIdea.mockImplementation(() => {
      throw new Error(error);
    });

    await act(async () => {
      fireEvent.click(getByLabelText(/downvote/i));
    });

    expect(dispatch).toBeCalledWith({ type: actionTypes.IDEA_UPDATE });
    expect(addVoteToIdea).toHaveBeenCalledWith("1", -1);
    expect(dispatch).toBeCalledWith({
      type: actionTypes.IDEA_UPDATE_ERROR,
      payload: error,
    });
    expect(getByText(error)).toBeInTheDocument();
  });

  it.skip("should disable voting on ideas user already voted for", async () => {
    // Increase number of votes in order to enable downvote button
    user.votes = [idea.id];

    const { getByLabelText } = render(<IdeaListItem idea={idea} />);

    const downvoteButton = getByLabelText(/downvote/i);
    const upvoteButton = getByLabelText(/upvote/i);
    expect(downvoteButton.attributes.getNamedItem("disabled")).toBeTruthy();
    expect(upvoteButton.attributes.getNamedItem("disabled")).toBeTruthy();
  });

  it.skip("should disable voting if idea belongs to user", async () => {
    const { getByLabelText } = render(
      <IdeasProvider>
        <IdeaListItem idea={ideas[0]} />
      </IdeasProvider>
    );
    const upvoteButton = getByLabelText(/upvote/i);
    expect(upvoteButton.attributes.getNamedItem("disabled")).toBeTruthy();
    const button = getByLabelText(/downvote/i);
    expect(button.attributes.getNamedItem("disabled")).toBeTruthy();
  });
});
