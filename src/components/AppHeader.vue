<template>
  <header class="header container">
    <product-collection-list />
    <h1 class="page-title">
      {{ title }}
    </h1>
    <aside class="header-bag">
      <div
        class="header-bag__item header-bag__count"
        :class="{ 'has-products' : wishlistItemsCount > 0 }"
      >
        <div
          v-if="cartItemsValue > 0"
          class="header-bag__price"
        >
          {{ cartItemsFriendlyValue }}
        </div>
        <wishlist-icon @click="wishlistItemsCount > 0 ? toggleCollectionListView('wishlistedCollection') : null" />
        <span
          v-if="wishlistItemsCount > 0"
          class="bag__item-counter"
        >{{ wishlistItemsCount }}</span>
      </div>
      <div
        class="header-bag__item header-bag__wishlist-count"
        :class="{ 'has-products' : cartItemsCount > 0 }"
      >
        <bag-icon @click="cartItemsCount > 0 ? toggleCollectionListView('cartCollection') : null" />
        <span
          v-if="cartItemsCount > 0"
          class="bag__item-counter"
        >{{ cartItemsCount }}</span>
      </div>
    </aside>
  </header>
</template>
<script>
import WishlistIcon from '../../static/svg/wishlist.svg';
import BagIcon from '../../static/svg/bag.svg';
import currencyFormatter from "../services/Formatter/CurrencyFormatter";
import ProductCollectionList from "./ProductCollectionList";

export default {
  name: 'AppHeader',
  components: {
    'wishlist-icon': WishlistIcon,
    'bag-icon': BagIcon,
    'product-collection-list': ProductCollectionList
  },
  data () {
    return {
      title: 'Wishlist catalog'
    }
  },
  computed: {
    cartItemsValue () {
      return this.getCollectionItemsValue('cartCollection');
    },
    cartItemsFriendlyValue () {
      return this.formatMoneyValue(this.getCollectionItemsValue('cartCollection'));
    },
    cartItemsCount () {
      return this.$store.getters.collectionItemsCount('cartCollection');
    },
    wishlistItemsCount () {
      return this.$store.getters.collectionItemsCount('wishlistedCollection');
    },
  },
  methods: {
    getCollectionItemsValue (collectionName) {
      return this.$store.getters.collectionTotalPrice(collectionName);
    },
    formatMoneyValue(value) {
      return currencyFormatter.formatCurrency(value);
    },
    toggleCollectionListView(collectionName) {
      return this.$store.commit('toggleListViewCollection', collectionName);
    }
  }
}
</script>
