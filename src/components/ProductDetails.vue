<template>
  <li class="product-list__item">
    <article class="product">
      <figure class="product__image-wrapper">
        <img
          class="product__image"
          :src="coverImage"
          alt="Product"
          itemprop="image"
        >
        <button
          class="product__wishlist-button button button--round button--wishlist"
          :class="{ 'selected' : productIsWishlisted}"
          @click="toggleIsWishlisted"
        >
          <wishlist-icon />
        </button>
      </figure>
      <div class="product__details">
        <h1
          class="product__title"
          itemprop="brand"
        >
          {{ title }}
        </h1>
        <p
          class="product__subtitle"
          itemprop="description"
        >
          {{ description }}
        </p>
        <div class="product__price">
          <span
            class="product__price"
            itemprop="price"
          >{{ prettyPrice }}</span>
        </div>
        <button
          v-if="productIsInCart"
          class="product__add-to-cart button button--primary button--in-cart"
          @click="toggleIsInCart"
        >
          In Cart
        </button>
        <button
          v-else
          class="product__add-to-cart button button--primary"
          @click="toggleIsInCart"
        >
          Add to cart
        </button>
      </div>
    </article>
  </li>
</template>
<script>
import WishlistIcon from '../../static/svg/wishlist.svg';
import ProductCollectionItem from "../data-class/ProductCollectionItem";

export default {
  name: 'ProductDetails',
  components: {
    'wishlist-icon': WishlistIcon,
  },
  props: {
    title: {
      type: String,
      default: '',
      required: true,
    },
    description: {
      type: String,
      default: '',
      required: false,
    },
    prettyPrice: {
      type: String,
      default: '',
      required: true,
    },
    uuid: {
      type: String,
      default: '',
      required: true,
    },
    coverImage: {
      type: String,
      default: '',
      required: true,
    },
    priceValue: {
      type: Number,
      default: 0,
      required: true,
    }
  },
  computed: {
    productIsWishlisted() {
      return this.productIsInCollection('wishlistCollection');
    },
    productIsInCart() {
      return this.productIsInCollection('cartCollection');
    },
  },
  methods: {
    productIsInCollection(collectionName) {
      return this.$store.getters.productIsInCollection(this.$props.uuid, collectionName);
    },
    toggleIsWishlisted() {
      this.toggleIsInCollection('wishlistCollection')
    },
    toggleIsInCart() {
      this.toggleIsInCollection('cartCollection')
    },
    toggleIsInCollection(collectionName) {
      if (this.productIsInCollection(collectionName)) {
        return this.$store.commit('removeCollectionItem', {collectionName: collectionName, uuid: this.$props.uuid});
      }

      let collectionItem = new ProductCollectionItem(
        this.$props.uuid, this.$props.title, this.$props.priceValue, this.$props.prettyPrice, this.$props.coverImage
      );

      return this.$store.commit('addCollectionItem', {
        collectionName: collectionName,
        uuid: this.$props.uuid,
        collectionItem: collectionItem
      });
    }
  },
}
</script>
