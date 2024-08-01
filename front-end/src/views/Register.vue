<template>
    <div class="register">
      <h2>Register</h2>
      <form @submit.prevent="registerUser">
        <div>
          <label for="username">Username:</label>
          <input type="text" v-model="username" required />
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" v-model="password" required />
        </div>
        <button type="submit">Register</button>
      </form>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      <p v-if="successMessage" class="success">{{ successMessage }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        username: '',
        password: '',
        errorMessage: '',
        successMessage: ''
      };
    },
    methods: {
      async registerUser() {
        try {
          const response = await axios.post('http://localhost:8000/api/register', {
            username: this.username,
            password: this.password
          });
          this.successMessage = response.data.message;
          this.errorMessage = '';
        } catch (error) {
          this.errorMessage = error.response.data.message || 'Registration failed.';
          this.successMessage = '';
        }
      }
    }
  };
  </script>
  
  <style>
  .register {
    max-width: 400px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .error {
    color: red;
  }
  
  .success {
    color: green;
  }
  </style>
  