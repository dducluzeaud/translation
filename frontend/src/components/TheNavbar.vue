<template>
  <div>
    <v-toolbar>
      <v-toolbar-title
        ><router-link to="/">Translate APP</router-link></v-toolbar-title
      >

      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn text><router-link to="/login">Login</router-link></v-btn>
      </v-toolbar-items>

      <template v-if="$vuetify.breakpoint.smAndUp">
        <v-btn icon>
          <v-icon>mdi-export-variant</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-login</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-account-circle</v-icon>
        </v-btn>
      </template>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  name: "TheNavbar"
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 80%;
  margin-left: 10%;
  border-bottom-color: cornflowerblue;
  border-bottom-width: 10px;
  background-color: blueviolet;
}
</style>
