<template>
  <div>
    <h3>Landing Page</h3>
    <form
      id="loginForm"
      @submit="submitForm"
    >
      <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="error in errors" :key="error">{{ error }}</li>
        </ul>
      </p>

      <p>
        <label for="email">Email</label>
        <input
          id="email"
          v-model="email"
          type="email"
          name="email"
          @input="validateForm"
        >
      </p>

      <p>
        <label for="password">Password</label>
        <input
          id="password"
          v-model="password"
          type="password"
          name="password"
          @input="validateForm"
        >
      </p>
    </form>
    <button type="submit" form="loginForm" value="Submit" :disabled="disabled">Login</button>
  </div>
</template>

<script>
  export default {
    name: 'Landing',
    data() {
      return {
        errors: [],
        email: "",
        password: "",
        disabled: true
      }
    },
    methods: {
      validateForm: function () {
        const validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        const validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,10}$/;
        this.disabled = false;
        this.errors = [];

        if (this.email.search(validEmail) !== 0) {
          this.disabled = true;
          this.errors.push('Valid email required.');
        }

        if (this.password.search(validPassword)) {
          this.disabled = true;
          this.errors.push('Valid password required. Password should have at least 1 capital letter, 1 lower case letter, 1 number, and is between 6-10 characters.');
        }

      },
      submitForm: function () {
        setTimeout(() => {this.$router.push("/search")}, 3000);
      }
    }
  }
</script>

<style scoped>
  input:invalid {
    color: red;
  }
</style>
