<template>
  <li class="product-list__item">
    <article class="product" itemscope itemtype="http://schema.org/Product">
      <figure class="product__image-wrapper">
        <img class="product__image" :src="coverImage" alt="Product" itemprop="image"/>
        <button
          v-on:click="toggleIsWishlisted"
          class="product__wishlist-button button button--round button--wishlist"
          :class="{ 'selected' : productIsWishlisted}"
        >
          <wishlist-icon></wishlist-icon>
        </button>
      </figure>
      <div class="product__details">
        <h1 class="product__title" itemprop="brand">{{ title }}</h1>
        <p class="product__subtitle" itemprop="description">{{ description }}</p>
        <div class="product__price" itemscope itemtype="http://schema.org/Offer">
          <span class="product__price" itemprop="price">{{ prettyPrice }}</span>
        </div>
        <button
          v-if="productIsCarted"
          v-on:click="toggleIsInCart"
          class="product__add-to-cart button button--primary button--in-cart"
        >In Cart</button>
        <button
          v-else
          v-on:click="toggleIsInCart"
          class="product__add-to-cart button button--primary"
        >Add to cart</button>
      </div>
    </article>
  </li>
</template>
<script>
import WishlistIcon from '../../static/svg/wishlist.svg';
import ProductCollectionItem from "../data/ProductCollectionItem";

export default {
  name: 'ProductDetails',
  components: {
    'wishlist-icon': WishlistIcon,
  },
  props: {
    title: String,
    description: String,
    prettyPrice: String,
    priceValue: Number,
    uuid: String,
    coverImage: String,
  },
  computed: {
    productIsWishlisted() {
      return this.productIsInCollection(this.$store.state.wishlistedCollection);
    },
    productIsCarted() {
      return this.productIsInCollection(this.$store.state.cartCollection);
    },
  },
  methods: {
    productIsInCollection(collection) {
      return this.$store.getters.productIsInCollection(this.$props.uuid, collection);
    },
    toggleIsWishlisted() {
      this.toggleIsInCollection(this.$store.state.wishlistedCollection)
    },
    toggleIsInCart() {
      this.toggleIsInCollection(this.$store.state.cartCollection)
    },
    toggleIsInCollection(collection) {
      if (this.productIsInCollection(collection)) {
        return this.$store.commit('removeCollectionItem', {collection: collection, uuid: this.$props.uuid});
      }

      let collectionItem = new ProductCollectionItem(
        this.$props.uuid, this.$props.title, this.$props.priceValue, this.$props.prettyPrice
      );

      return this.$store.commit('addCollectionItem', {
        collection: collection,
        uuid: this.$props.uuid,
        collectionItem: collectionItem
      });
    }
  },
  data () {
    return {
      products: []
    }
  },
}
</script>
