<template>
    <div class="login">
        <h2>Login</h2>
        <form @submit.prevent="loginUser">
            <div>
                <label for="username">Username:</label>
                <input type="text" v-model="username" required />
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" v-model="password" required />
            </div>
            <button type="submit">Login</button>
        </form>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            username: '',
            password: '',
            errorMessage: ''
        };
    },
    methods: {
        async loginUser() {
            try {
                const response = await axios.post('http://localhost:8000/api/login', {
                    username: this.username,
                    password: this.password
                });
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('id', response.data.id);
                this.errorMessage = '';
                // Redirect to a dashboard or home page
                this.$router.push('/');
            } catch (error) {
                this.errorMessage = error.response.data.message || 'Login failed.';
            }
        }
    }
};
</script>

<style>
.login {
    max-width: 400px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.error {
    color: red;
}
</style>