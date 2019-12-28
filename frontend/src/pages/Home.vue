<template>
  <div class="wrapper">
    <div class="container">
      <input type="file" @change="handleJSONUpload"/>
      <v-btn @click="submitJSON" :disabled="disabled">Soumettre</v-btn>
    </div>
  </div>
</template>

<script> 
import { UPLOAD_TRANSLATIONS } from '@/graphql/file'

export default {
  name: "Home",
  data() {
    return {
      lang: '',
      JSON: '',
      loading: false
    } 
  },
  methods: {
    handleJSONUpload(e) {
      const reader = new FileReader();
      this.lang = e.target.files[0].name.split('.')[0]
      reader.readAsText(e.target.files[0]);
      reader.onload = e => {this.JSON = e.target.result};
    },
    async submitJSON() {
      await this.$apollo.mutate({
        mutation: UPLOAD_TRANSLATIONS,
        variables: {
          value: JSON.parse(this.JSON),
        }
      });
    },
  },
  computed: {
    disabled() {
        return this.JSON === ""; // or === 0   
    },
}
};
</script>

<style></style>
