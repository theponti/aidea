import { act, fireEvent, render } from "@testing-library/react";
import { getMockState, getMockUserState } from "src/mocks";
import { IdeasContext } from "src/services/ideas/ideas.provider";
import { beforeEach, describe, expect, it, vi } from "vitest";
import IdeaListItem from ".";

let vote = vi.fn();

vi.mock("@auth0/auth0-react", () => ({
  useAuth0: () => ({ user: { votes: [] } }),
}));

vi.mock("src/services/ideas/ideas.hooks", () => ({
  useVoteOnIdea: vi.fn(() => ({
    vote,
  })),
}));

describe("<IdeaListItem/>", () => {
  let dispatch;
  let idea;
  let ideas;
  let user;

  // eslint-disable-next-line
  const IdeasProvider = ({ children }) => (
    <IdeasContext.Provider value={{ state: { ideas }, dispatch }}>
      {children}
    </IdeasContext.Provider>
  );

  beforeEach(() => {
    ideas = getMockState().ideas;
    user = getMockUserState().user;
    dispatch = vi.fn();
    idea = ideas[1];
    vi.clearAllMocks();
  });

  it.skip("should upvote idea", async () => {
    const { container, getByLabelText } = render(
      <IdeasProvider>
        <IdeaListItem idea={idea} />
      </IdeasProvider>
    );
    const upvoteButton = getByLabelText(/upvote/i);
    await act(async () => {
      fireEvent.click(upvoteButton);
    });

    expect(vote).toHaveBeenCalledWith("1", 1);
    expect(container).toMatchSnapshot();
  });

  it("should downvote idea", async () => {
    const { getAllByLabelText } = render(
      <IdeasProvider>
        <IdeaListItem idea={idea} />
      </IdeasProvider>
    );

    const downvoteButton = getAllByLabelText(/downvote/i)[0];
    await act(async () => {
      fireEvent.click(downvoteButton);
    });

    expect(vote).toHaveBeenCalledWith("1", -1);
  });

  it.skip("should catch error", async () => {
    const { getByLabelText, getByText } = render(
      <IdeasProvider>
        <IdeaListItem idea={idea} />
      </IdeasProvider>
    );

    const error = "some error";
    vote.mockImplementation(() => {
      throw new Error(error);
    });

    await act(async () => {
      fireEvent.click(getByLabelText(/downvote/i));
    });

    expect(vote).toHaveBeenCalledWith("1", -1);
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
