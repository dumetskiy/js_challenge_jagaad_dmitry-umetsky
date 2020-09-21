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
        ></product-details>
      </ul>
      <nav class="pagination">
        <ul class="pagination__list">
          <li class="pagination__item">
            <a href="#" class="pagination__link">
              <svg class="icon" width="8px" height="10px" viewBox="18 18 8 10" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <title>Arrow Left</title>
                <polygon id="Left-Icon" stroke="none" fill-rule="evenodd" transform="translate(22.027061, 23.000000) scale(-1, 1) translate(-22.027061, -23.000000) " points="22.9427745 22.9999999 19 26.9458774 20.0541226 28 25.0541226 23 20.0541226 18 19 19.0541226"></polygon>
              </svg>
            </a>
          </li>
          <li class="pagination__item" v-on:click="switchPage(2)">
            <a href="#" class="pagination__link">
              1
            </a>
          </li>
          <li class="pagination__item">
            <a href="#" class="pagination__link">
              2
            </a>
          </li>
          <li class="pagination__item">
            <a href="#" class="pagination__link">
              3
            </a>
          </li>
          <li class="pagination__item">
            <a href="#" class="pagination__link">
              ...
            </a>
          </li>
          <li class="pagination__item">
            <a href="#" class="pagination__link">
              10
            </a>
          </li>
          <li class="pagination__item">
            <a href="#" class="pagination__link">
              <svg class="icon" width="8px" height="10px" viewBox="18 18 8 10" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <title>Arrow Right</title>
                <polygon id="Left-Iocn" stroke="none" fill-rule="evenodd" points="22.9427745 22.9999999 19 26.9458774 20.0541226 28 25.0541226 23 20.0541226 18 19 19.0541226"></polygon>
              </svg>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </main>
</template>
<script>
import MusementVenuesApiClient from "../services/API/MusementVenuesApiClient";
import ProductDetails from "./ProductDetails";

export default {
  name: 'AppContainer',
  components: {
    'product-details': ProductDetails,
  },
  data () {
    return {
      products: []
    }
  },
  mounted() {
    this.fetchPaginatedProducts();
  },
  computed: {
    items () {
      return this.$store.state.listingItems;
    },
    page () {
      return this.$store.state.page;
    },
  },
  methods: {
    fetchPaginatedProducts() {
      new MusementVenuesApiClient().getDetailsForPage(this.$store.state.page);
    },
    switchPage(page) {
      if (page === this.$store.state.page) {
        return;
      }

      this.$store.state.page = page;
      this.fetchPaginatedProducts();
    },
  }
}
</script>
