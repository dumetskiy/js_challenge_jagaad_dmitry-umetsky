<template>
  <div
    v-if="isActive"
    class="product-collection"
  >
    <div class="product-collection__title">
      {{ selectedCollection.title }}
    </div>
    <div class="product-collection__items-holder">
      <div
        v-for="(product, uuid) in selectedCollection.items"
        :key="uuid"
        class="product-collection__items-holder__item"
      >
        <div class="item-section__preview">
          <img
            class="item-section__preview__image"
            :src="product.imageUrl"
          >
        </div>
        <div class="item-section__details">
          <div class="item-section__details__title">
            {{ product.title }}
          </div>
          <div class="item-section__details__price">
            {{ product.friendlyPrice }}
          </div>
          <div
            class="item-section__details__action-link"
            @click="removeCollectionListItem(product.uuid, selectedCollectionName)"
          >
            remove
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'ProductCollectionList',
  computed: {
    selectedCollection () {
      return this.$store.getters.selectedListViewCollection;
    },
    selectedCollectionName () {
      return this.$store.getters.selectedListViewCollectionName;
    },
    isActive () {
      return this.$store.getters.isListViewCollectionActive;
    },
  },
  methods: {
    removeCollectionListItem(uuid, collectionName) {
      this.$store.dispatch('removeCollectionItem', {
        uuid: uuid,
        collectionName: collectionName
      });
    }
  }
}
</script>
