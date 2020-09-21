<template>
  <header class="header container">
    <h1 class="page-title">
      {{ title }}
    </h1>
    <aside class="header-bag">
      <div class="product-collection">
        <div class="product-collection__title">
          Wishlist
          <span class="product-collection__title__subtitle">[10 items]</span>
        </div>
        <div class="product-collection__items-holder">
          <div class="product-collection__items-holder__item">
            <div class="item-section__preview">
              <img class="item-section__preview__image" src="https://images.musement.com/cover/0095/61/thumb_9460276_cover_header.jpeg?w=540">
            </div>
            <div class="item-section__details">
              <div class="item-section__details__title">
                Vista sul litorale e tour di gruppo di Monte Carlo da Nizza
              </div>
              <div class="item-section__details__price">
                $ 50.00
              </div>
              <div class="item-section__details__action-link">
                remove
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="header-bag__item header-bag__count">
        <div
          v-if="cartItemsValue > 0"
          class="header-bag__price"
        >
          {{ cartItemsFriendlyValue }}
        </div>
        <wishlist-icon />
        <span
          v-if="wishlistItemsCount > 0"
          class="bag__item-counter"
        >{{ wishlistItemsCount }}</span>
      </div>
      <div class="header-bag__item header-bag__wishlist-count">
        <bag-icon />
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

export default {
  name: 'AppHeader',
  components: {
    'wishlist-icon': WishlistIcon,
    'bag-icon': BagIcon
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
    }
  }
}
</script>
