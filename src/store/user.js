const state = {
  user: {
    userId: "",
    username: "",
    password: "",
  },
};
const mutations = {
  setUser(state, userData) {
    state.user.userId = userData.userId;
    state.user.username = userData.username;
    state.user.password = userData.password;
    console.log("Success");
  },
};
const getters = {
  getUser: (state) => state.user,
};
export default {
  namespaced: true,
  state,
  mutations,
  getters,
};
