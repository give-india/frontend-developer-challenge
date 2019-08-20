<template>
  <form class="link-form" @submit="submitHandler" :autocomplete="autoCompleteStatus">
    <label :for="inputName">
      <input
        :name="inputName"
        :placeholder="placeHolder"
        v-model="inputValue"
        @keyup="handleChange"
      />
    </label>
  </form>
</template>
<script>
import CONSTANTS from "@/constants.js";
import Store from "@/store.js";
import { mapGetters } from "vuex";
import ACTIONS from "@/actions.js";
import { setTimeout } from "timers";
export default {
  name: "InputComponent",
  data: () => ({
    inputName: CONSTANTS.INPUT_COMPONENT.INPUT_NAME,
    placeHolder: CONSTANTS.INPUT_COMPONENT.PLACEHOLDER,
    inputValue: "",
    youtubeRegex: CONSTANTS.INPUT_COMPONENT.YOUTUBE_REGEX,
    autoCompleteStatus: CONSTANTS.INPUT_COMPONENT.AUTO_COMPLETE_STATUS
  }),
  methods: {
    validateUrl: function() {
      let validationResult = this.inputValue.match(this.youtubeRegex);
      if (validationResult && validationResult[2].length === 11) {
        const newQueue = [...this.queue];
        this.getNewQueue(newQueue);
      }
    },
    handleChange: function() {
      this.validateUrl();
    },
    getNewQueue: function(queueSent) {
      const { dispatch } = Store;
      const queue = [...queueSent];
      const data = { id: Math.random(), value: this.inputValue };
      if (queue.length === 0) {
        queue.push(data);
      } else {
        const index = queue.findIndex(elem => elem.value === this.inputValue);
        if (index === -1) {
          queue.push(data);
        }
      }
      dispatch(ACTIONS.PLAYER.ADD_TO_QUEUE, [...queue]);
      setTimeout(this.resetInput, 500);
    },
    submitHandler: function(e) {
      e.preventDefault();
      this.validateUrl();
    },
    resetInput: function() {
      this.inputValue = "";
    }
  },
  computed: mapGetters({
    queue: "getQueue"
  })
};
</script>
<style lang="scss" scoped>
.link-form {
  box-sizing: border-box;
  width: 100%;
  input {
    border: none;
    border-bottom: 1px solid lightgray;
    padding: 10px;
    width: 100%;
    box-sizing: border-box;
    font-size: 16px;
    color: #fff;
    background: transparent;
    &::placeholder {
      color: grey;
    }
  }
}
</style>