<template>
  <header class="header container">
    <h1 class="page-title">{{ title }}</h1>
    <aside class="header-bag">
      <div class="header-bag__item header-bag__count">
        <div v-if="cartItemsValue > 0" class="header-bag__price">
          {{ cartItemsFriendlyValue }}
        </div>
        <WishlistIcon></WishlistIcon>
        <span v-if="wishlistedItemsCount > 0" class="bag__item-counter">{{ wishlistedItemsCount }}</span>
      </div>
      <div class="header-bag__item header-bag__wishlist-count">
        <BagIcon></BagIcon>
        <span v-if="cartItemsCount > 0" class="bag__item-counter">{{ cartItemsCount }}</span>
      </div>
    </aside>
  </header>
</template>
<script>
import WishlistIcon from '../../static/svg/wishlist.svg';
import BagIcon from '../../static/svg/bag.svg';
import currencyFormatter from "../services/Formatter/CurrencyFormatter";

export default {
  name: 'AppHeader',
  data () {
    return {
      title: 'Wishlist catalog'
    }
  },
  components: {
    WishlistIcon,
    BagIcon
  },
  computed: {
    wishlistedItemsCount () {
      return this.$store.getters.collectionItemsCount(this.$store.state.wishlistedCollection);
    },
    cartItemsValue () {
      return this.getCollectionItemsValue(this.$store.state.cartCollection);
    },
    cartItemsFriendlyValue () {
      return this.formatMoneyValue(this.getCollectionItemsValue(this.$store.state.cartCollection));
    },
    cartItemsCount () {
      return this.$store.getters.collectionItemsCount(this.$store.state.cartCollection);
    },
  },
  methods: {
    getCollectionItemsValue (collection) {
      return this.$store.getters.collectionTotalPrice(collection);
    },
    formatMoneyValue(value) {
      return currencyFormatter.formatCurrency(value);
    }
  }
}
</script>
