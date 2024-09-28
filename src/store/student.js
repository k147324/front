const state = {
  studentList: [],
};

const mutations = {
  setStudentList(state, studentData) {
    state.studentList = studentData;
  },
};

const getters = {
  getStudentList: (state) => state.studentList,
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
};
