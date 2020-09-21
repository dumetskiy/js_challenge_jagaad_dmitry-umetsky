import Vue from 'vue';
import Vuex from 'vuex';
import ProductCollectionItem from '../../data-class/ProductCollectionItem';

Vue.use(Vuex);

const appStore = new Vuex.Store({
  state: {
    listingItems: [],
    resultsCount: 0,
    page: 1,
    wishlistedCollection: { items: {} },
    cartCollection: { items: {} },
  },
  mutations: {
    addCollectionItem(state, payload) {
      if (!payload.item instanceof ProductCollectionItem) {
        return;
      }

      const collection = state[payload.collectionName];

      collection.items = { ...collection.items, [payload.uuid]: payload.collectionItem };
    },
    removeCollectionItem(state, payload) {
      Vue.delete(state[payload.collectionName].items, payload.uuid);
    },
    nextPage(state) {
      state.page++;
    },
    previousPage(state) {
      state.page--;
    },
  },
  getters: {
    collectionTotalPrice: (state) => (collectionName) => {
      let totalPrice = 0;

      for (const [uuid, item] of Object.entries(state[collectionName].items)) {
        totalPrice += item.price;
      }

      return totalPrice;
    },
    collectionItemsCount: (state) => (collectionName) => Object.keys(state[collectionName].items).length,
    productIsInCollection: (state) => (uuid, collectionName) => state[collectionName].items[uuid] instanceof ProductCollectionItem,
  },
});

export default appStore;
