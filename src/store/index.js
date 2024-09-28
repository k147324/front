import { createStore } from "vuex";
import user from "./user";
import student from "./student";
export default createStore({
  modules: {
    user,
    student,
  },
});
