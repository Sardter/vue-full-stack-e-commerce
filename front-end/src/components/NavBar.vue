<template>
  <div id="nav-bar">
    <router-link to="/products" id="products-link">
      <h1>Feet City</h1>
    </router-link>
    <div class="nav-links">
      <router-link to="/login" id="login-link">
        <button>Login</button>
      </router-link>
      <router-link to="/register" id="register-link">
        <button>Register</button>
      </router-link>
      <router-link to="/cart" id="cart-link">
        <button>Shopping Cart</button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
};
</script>

<style scoped>
/* scoped means css style will ONLY affect this file */
#nav-bar {
  border-bottom: 1px solid #ddd;
  height: 75px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  box-sizing: border-box;
}

#products-link {
  text-align: center;
  display: block;
  color: black;
  font-size: 22px;
  text-decoration: none;
}

#products-link h1 {
  margin: 0;
}

.nav-links {
  display: flex;
  gap: 16px; /* Add space between buttons */
}

</style>
