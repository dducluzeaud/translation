<template>
  <div id="app">
    <TheNavbar />
    <div class="page-container">
      <router-view />
    </div>
  </div>
</template>

<script>
import TheNavbar from "@/components/TheNavbar";

export default {
  name: "app",
  components: { TheNavbar }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.page-container {
  display: flex;
  flex: 1;
  height: 90vh;
  margin-bottom: 2rem;
  width: 60vw;
  margin: 2rem 20vw 0 20vw;
}
</style>
