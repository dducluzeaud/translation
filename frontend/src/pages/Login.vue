<template>
  <div class="form-container">
    <h2>Se connecter</h2>
    <form class="form" @submit.prevent="submit">
      <v-text-field
        v-model="email"
        :error-messages="emailErrors"
        label="E-mail"
        required
        @input="$v.email.$touch()"
        @blur="$v.email.$touch()"
      ></v-text-field>
      <v-text-field
        v-model="password"
        :append-icon="showPasswd ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPasswd ? 'text' : 'password'"
        :error-messages="passwordErrors"
        label="Password"
        required
        @click:append="showPasswd = !showPasswd"
        @input="$v.password.$touch()"
        @blur="$v.password.$touch()"
      ></v-text-field>
      <div class="button-container">
        <v-btn
          primary
          elevation-8
          @click="submit"
          :disabled="submitStatus === 'PENDING'"
          >submit</v-btn
        >
      </div>
      <p class="error" v-if="authError !== ''">{{ authError }}</p>
    </form>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email, minLength } from "vuelidate/lib/validators";
import { LOGIN } from "@/graphql/auth";
import { onLogin } from "@/vue-apollo";

export default {
  name: "Login",
  mixins: [validationMixin],
  validations: {
    email: { required, email },
    password: { required, minLength: minLength(6) }
  },
  data: () => ({
    email: "",
    password: "",
    submitStatus: null,
    showPasswd: false,
    authError: ""
  }),
  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("Password is required.");
      return errors;
    }
  },
  methods: {
    async submit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        // do your submit logic here
        this.submitStatus = "PENDING";
        try {
          const response = await this.$apollo.query({
            query: LOGIN,
            variables: {
              email: this.email,
              password: this.password
            }
          });
          const token = response.data.login.token;
          if (token) {
            const apolloClient = this.$apollo.provider.defaultClient;
            await onLogin(apolloClient, token);
            this.$router.push("/home");
            this.submitStatus = "";
          }
        } catch (error) {
          this.authError = error.graphQLErrors[0].message;
          this.submitStatus = "ERROR";
        }
      }
    }
  }
};
</script>

<style>
form {
  width: 100%;
}
.form-container {
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 40vw;
}

.button-container {
  display: flex;
  justify-content: center;
}

.error {
  display: flex;
  justify-content: center;
  color: red;
  margin: 1rem 0 0 0;
  font-weight: 500;
}
</style>
