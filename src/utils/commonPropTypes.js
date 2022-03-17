import t from "prop-types";

export const userPropType = t.shape({
  email: t.string.isRequired,
  id: t.string.isRequired,
});

export const ideaPropType = t.shape({
  description: t.string.isRequired,
  downvotes: t.number.isRequired,
  id: t.string.isRequired,
  title: t.string.isRequired,
  upvotes: t.number.isRequired,
  user: t.string.isRequired,
});
