<template>
  <!-- v-if shows a product if that product id exists -->
  <div id="page-wrap" v-if="product">
    <div id="img-wrap">
      <img v-bind:src="product.imageUrl" />
    </div>
    <div id="product-details">
      <h1>{{ product.name }}</h1>
      <h3 id="price">{{ product.price }}$</h3>
      <p>Average rating:{{ product.averageRating }}</p>

      <!-- v-on:click invokes a desired method
      show only if item is NOT in cart -->
      <button
        id="add-to-cart"
        v-on:click="addToCart"
        v-if="!itemIsInCart && !showSuccessMessage"
      >
        Add to Cart
      </button>

      <!-- show only if item is in cart -->
      <button
        id="add-to-cart"
        class="green-button"
        v-if="!itemIsInCart && showSuccessMessage"
      >
        Successfully added item to cart
      </button>

      <!-- show only if item is ALREADY in cart -->
      <button id="add-to-cart" class="grey-button" v-if="itemIsInCart">
        Item is already in cart
      </button>
      <h4>Description</h4>
      <p>{{ product.description }}</p>
    </div>
  </div>
  <!-- v-else will display the NotFoundPage when product id does NOT exist -->
  <NotFoundPage v-else />
</template>

<script>
import axios from "axios";
import NotFoundPage from "./NotFoundPage";
export default {
  name: "ProductDetailPage",
  // Register NotFoundPage
  components: {
    NotFoundPage,
  },
  data() {
    return {

      product: {},
      cartItems: [],
      showSuccessMessage: false,
    };
  },

  computed: {
    itemIsInCart() {
      return this.cartItems.some((item) => item.id === this.product.id);
    },
  },
  // to call methods from within vue template
  methods: {
    async addToCart() {
      const userId = localStorage.getItem('id');
      await axios.post(`http://localhost:8000/api/users/${userId}/cart`, {
        productId: this.$route.params.id,
      });
      // set showSuccessMessage to true after adding item to cart
      this.showSuccessMessage = true;
      // redirect user to products page after 1000 milliseconds
      setTimeout(() => {
        this.$router.push("/products");
      }, 1000);
    },
  },

  async created() {

    const { data: product } = await axios.get(
      `http://localhost:8000/api/products/${this.$route.params.id}`
    );
    // set product in vue component to product from server
    this.product = product;

     const userId = localStorage.getItem('id');
    const { data: cartItems } = await axios.get(`http://localhost:8000/api/users/${userId}/cart`);
    // set cart items in vue component to cart items from server
    this.cartItems = cartItems;
  },
};
</script>

<style scoped>
/* scoped means css style will ONLY affect this file */
#page-wrap {
  margin-top: 16px;
  padding: 16px;
  max-width: 600px;
}

#img-wrap {
  text-align: center;
}

img {
  width: 400px;
}

#product-details {
  padding: 16px;
  position: relative;
}

#add-to-cart {
  width: 100%;
}

#price {
  position: absolute;
  top: 24px;
  right: 16px;
}
.green-button {
  background-color: green;
}
.grey-button {
  background-color: #888;
}
</style>