import { getMockState } from "../../mocks";
import { actionTypes, ideasReducer } from "./ideas.ducks";

describe("AppReducer", () => {
  let idea;
  let state;

  beforeEach(() => {
    idea = { title: "some idea", description: "some other idea" };
    state = getMockState();
  });

  afterEach(() => {
    idea = null;
    state = null;
    jest.resetAllMocks();
  });

  it("should set state to loading when IDEA_UPDATE", () => {
    const newState = ideasReducer(state, {
      type: actionTypes.IDEA_UPDATE,
      payload: idea,
    });
    expect(newState).toEqual({ ...state, isLoading: true });
  });

  it("should remove error and set state LOADED when IDEA_UPDATE_SUCCESS", () => {
    const newState = ideasReducer(
      { ...state, error: "foo bar" },
      { type: actionTypes.IDEA_UPDATE_SUCCESS, payload: "foo bar" }
    );
    expect(newState).toEqual({
      ...state,
      isLoading: false,
      error: null,
    });
  });

  it("should add error when IDEA_UPDATE_ERROR", () => {
    const newState = ideasReducer(state, {
      type: actionTypes.IDEA_UPDATE_ERROR,
      payload: "foo bar",
    });
    expect(newState).toEqual({
      ...state,
      isLoading: false,
      error: "foo bar",
    });
  });
});
