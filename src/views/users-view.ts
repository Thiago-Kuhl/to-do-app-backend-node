import User from "../models/User";

export default {
  render(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    };
  },
  renderID(user: User) {
    return {
      id: user.id,
    };
  },
};
