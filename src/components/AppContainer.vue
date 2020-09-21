<template>
  <main class="product-page">
    <div class="container">
      <ul class="product-list">
        <product-details
          v-for="item in items"
          v-bind:title=item.title
          v-bind:description=item.description
          v-bind:priceValue=item.original_retail_price.value
          v-bind:prettyPrice=item.original_retail_price.formatted_value
          v-bind:coverImage=item.cover_image_url
          v-bind:uuid=item.uuid
          v-bind:key=item.uuid
        ></product-details>
      </ul>
      <app-pagination></app-pagination>
    </div>
  </main>
</template>
<script>
import MusementVenuesApiClient from "../services/API/MusementVenuesApiClient";
import ProductDetails from "./ProductDetails";
import Pagination from "./Pagination";

export default {
  name: 'AppContainer',
  components: {
    'product-details': ProductDetails,
    'app-pagination': Pagination,
  },
  data () {
    return {
      products: []
    }
  },
  computed: {
    items () {
      return this.$store.state.listingItems;
    },
    page () {
      return this.$store.state.page;
    },
  },
}
</script>
