<template>
  <div id="app">
    <NavBar />
    <!-- router-view is displays the page -->
    <router-view />
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
export default {
  name: "App",
  // Register NavBar
  components: {
    NavBar,
  },
};
</script>

<style>
/* do NOT use scoped for global use */
* {
  box-sizing: border-box;
  font-family: Arial;
}

#page-wrap {
  margin: auto;
  max-width: 800px;
  min-height: 100vh;
}

button {
  background-color: red;
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  outline: 0;
  padding: 16px;
}
</style>