<template>
  <div v-if="products.length > 0">
    <ProductsListItem
      v-for="product in products"
      v-on:remove-from-cart="$emit('remove-from-cart', $event)"
      v-bind:key="product.id"
      v-bind:product="product"
    />
  </div>
  <p v-else>You haven't added anything to your cart yet :(</p>
</template>

<script>
import ProductsListItem from "./ProductsListItem.vue";
export default {
  name: "ProductsList",
  //   props allows for views to share data with each other
  props: ["products"],
  // Register ProductsListItem
  components: {
    ProductsListItem,
  },
};
</script>

<style scoped>
/* scoped means css style will ONLY affect this file */
</style>