import Vue from "vue";
import Vuex from "vuex";
import getVideoId from "@/utils/utils.js";
import ACTIONS from "@/actions.js";
import MUTATIONS from "@/mutations.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    videoQueue: [],
    videoSrc: ""
  },
  getters: {
    getQueue: state => state.videoQueue,
    getVideoSource: state => state.videoSrc
  },
  mutations: {
    [MUTATIONS.PLAYER.ADD_TO_QUEUE_MUTATION]: function(state, payload) {
      state.videoQueue = [...payload];
      state.videoSrc = state.videoQueue[0].value
        ? getVideoId(state.videoQueue[0].value)
        : "";
    },
    [MUTATIONS.URL_LIST.MODIFY_LIST_MUTATION]: function(state, payload) {
      state.videoQueue = [...payload];
      state.videoSrc = state.videoQueue[0].value
        ? getVideoId(state.videoQueue[0].value)
        : "";
    },
    [MUTATIONS.PLAYER.UPDATE_QUEUE_MUTATION]: function(state) {
      state.videoQueue.shift();
      state.videoSrc = state.videoQueue[0].value
        ? getVideoId(state.videoQueue[0].value)
        : "";
    }
  },
  actions: {
    [ACTIONS.PLAYER.ADD_TO_QUEUE]: function({ commit }, payload) {
      commit(MUTATIONS.PLAYER.ADD_TO_QUEUE_MUTATION, payload);
    },
    [ACTIONS.URL_LIST.MODIFY_LIST]: function({ commit }, payload) {
      commit(MUTATIONS.URL_LIST.MODIFY_LIST_MUTATION, payload);
    },
    [ACTIONS.PLAYER.UPDATE_QUEUE]: function({ commit }) {
      commit(MUTATIONS.PLAYER.UPDATE_QUEUE_MUTATION);
    }
  }
});
