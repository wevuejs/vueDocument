<template>
  <div id="app">
    <img :src="imgSource[1]">
    <button type="button" v-bind:disabled="wow" v-on:click="func('1111')">하하하하하하핳</button>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      imgSource: [
        'http://image-proxy.namuwikiusercontent.com/r/http%3A%2F%2Fi64.tinypic.com%2F2hnxrw4.jpg',
        'http://lorempixel.com/200/300/city',
      ],
      wow: false,
      func(msg) {
        console.log(msg);
      },
    };
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
