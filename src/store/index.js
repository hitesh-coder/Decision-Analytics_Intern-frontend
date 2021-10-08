import { createStore } from 'vuex'
import postService from "../postServices";
const jwt = require('jsonwebtoken');

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'Secret Code', {
    expiresIn: maxAge
  });
};

const messageTime = 3000;

export default createStore({
  state: {
    currentUserId: '',
    authentication: {
      email: '',
      password: ''
    },
    messages: {
      success: '',
      error: ''
    },
    meetSchedule: [],
    newMeet: {
      title: '',
      description: '',
      link: '',
      date: '',
      image: '',
      start: '',
      end: ''
    },
    editMode: Boolean
  },
  mutations: {
    updateEmail(state, payload) {
      state.authentication.email = payload;
    },
    updatePassword(state, payload) {
      state.authentication.password = payload;
    },
    updateSuccessMessage(state, message) {
      state.messages.success = message;

      setTimeout(() => {
        state.messages.success = ''
      }, messageTime);
    },
    updateErrorMessage(state, message) {
      state.messages.error = message;

      setTimeout(() => {
        state.messages.error = ''
      }, messageTime);
    },
    updateCurrentUserId(state, userId) {
      state.currentUserId = userId;
    },
    resetStates(state) {
      state.authentication.email = '';
      state.authentication.password = '';
    },
    logoutUser(state) {
      localStorage.removeItem("jwt")
      state.currentUserId = ''
    },
    getMeetSchedule(state, payload) {
      state.meetSchedule = payload.meet;
    },
    updateTitle(state, title) {
      state.newMeet.title = title;
    },
    updateDescription(state, description) {
      state.newMeet.description = description;
    },
    updateLink(state, link) {
      state.newMeet.link = link;
    },
    updateDate(state, date) {
      state.newMeet.date = date;
    },
    updateImage(state, image) {
      state.newMeet.image = image;
    },
    updateStart(state, start) {
      state.newMeet.start = start;
    },
    updateEnd(state, end) {
      state.newMeet.end = end;
    },
    resetMeetSchedule(state) {
      state.newMeet.title = '';
      state.newMeet.description = '';
      state.newMeet.link = '';
      state.newMeet.date = '';
      state.newMeet.image = '';
      state.newMeet.start = '';
      state.newMeet.end = '';
    },
    setEditModeTrue(state) {
      state.editMode = true;
    },
    setEditModeFalse(state) {
      state.editMode = false;
    }
  },
  actions: {
    async createUser({ state, commit }) {
      let credential = {
        email: state.authentication.email,
        password: state.authentication.password
      }
      try {
        let result = await postService.createUser(credential);
        if (result.user) {
          const token = createToken(result.user);
          localStorage.setItem("jwt", token)
          commit("updateSuccessMessage", "User Created");
          commit("updateCurrentUserId", result.user)
        }
        if (result.errors) {
          if (result.errors.email) {
            commit("updateErrorMessage", result.errors.email)
          } else {
            commit("updateErrorMessage", result.errors.password)
          }
        }
      } catch (err) {
        commit("updateErrorMessage", err);
      }
    },

    async loginUser({ state, commit }) {
      let credential = {
        email: state.authentication.email,
        password: state.authentication.password
      }
      try {
        let result = await postService.loginUser(credential);
        if (result.user) {
          const token = createToken(result.user);
          localStorage.setItem("jwt", token)
          commit("updateSuccessMessage", "You are logged in");
          commit("updateCurrentUserId", result.user)
        }
        if (result.errors) {
          if (result.errors.email) {
            commit("updateErrorMessage", result.errors.email)
          } else {
            commit("updateErrorMessage", result.errors.password)
          }
        }
      } catch (err) {
        commit("updateErrorMessage", err);
      }
    },

    logoutUser(state) {
      state.commit("logoutUser");
    },
    async loginUserFromGoogle(state, payload) {
      const token = createToken(payload);
      localStorage.setItem("jwt", token)
      state.commit("updateSuccessMessage", "You are logged in");
      state.commit("updateCurrentUserId", payload)
    },
    async getMeetSchedule({state, commit}) {
      const meetSchedule = await postService.meetSchedule(state.currentUserId);
      commit("getMeetSchedule",meetSchedule);
    },
    async uploadMeetDetail({state,commit}) {
      await postService.uploadMeetSchedule(state.newMeet, state.currentUserId);
      commit("resetMeetSchedule");
    },
    async deleteMeet(state,payload) {
      await postService.deleteMeet(payload);
      state.commit(
        "updateSuccessMessage",
        "Meet Deleted Successfully"
      );
    },
    async getParticularMeet(state,payload) {
      let meet = await postService.getParticularMeet(payload);
      state.commit("updateTitle", meet.meet.title);
      state.commit("updateDescription", meet.meet.description);
      state.commit("updateLink", meet.meet.link);
      state.commit("updateDate", meet.meet.date);
      state.commit("updateImage", meet.meet.image);
      state.commit("updateStart", meet.meet.start);
      state.commit("updateEnd", meet.meet.end);
    },
  },
  modules: {
  },
  getters: {
    messages: (state) => state.messages,
    userId: (state) => state.currentUserId,
    meetSchedule: (state) => state.meetSchedule,
    newMeet: (state) => state.newMeet,
    editMode: (state) => state.editMode,
  }
})