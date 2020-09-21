<template>
  <main class="product-page">
    <div class="container">
      <ul class="product-list">
        <product-details
          v-for="item in items"
          :key="item.uuid"
          :title="item.title"
          :description="item.description"
          :price-value="item.original_retail_price.value"
          :pretty-price="item.original_retail_price.formatted_value"
          :cover-image="item.cover_image_url"
          :uuid="item.uuid"
        />
      </ul>
      <app-pagination />
    </div>
  </main>
</template>
<script>
import ProductDetails from "./ProductDetails";
import AppPagination from "./AppPagination";

export default {
  name: 'AppContainer',
  components: {
    'product-details': ProductDetails,
    'app-pagination': AppPagination,
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
