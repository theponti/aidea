import t from "prop-types";

export const userPropType = t.shape({
  email: t.string.isRequired,
  email_verified: t.bool.isRequired,
  name: t.string.isRequired,
  nickname: t.string.isRequired,
  picture: t.string.isRequired,
  sub: t.string.isRequired,
  updated_at: t.string.isRequired,
});

export const ideaPropType = t.shape({
  description: t.string.isRequired,
  downvotes: t.number.isRequired,
  id: t.string.isRequired,
  title: t.string.isRequired,
  upvotes: t.number.isRequired,
  user: t.string.isRequired,
});
