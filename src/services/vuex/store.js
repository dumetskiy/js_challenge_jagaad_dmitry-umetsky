import Vue from 'vue'
import Vuex from "vuex";
import ProductCollectionItem from "../../data/ProductCollectionItem";

Vue.use(Vuex);

const appStore = new Vuex.Store({
  state: {
    listingItems: [],
    resultsCount: 0,
    page: 1,
    wishlistedCollection: {items:{}},
    cartCollection: {items:{}},
  },
  mutations: {
    addItem(state, payload) {
      if (!payload.item instanceof ProductCollectionItem) {
        return;
      }

      payload.collection.items = {...payload.collection.items, [payload.uuid]: payload.collectionItem};
    },
    removeItem(state, payload) {
      Vue.delete(payload.collection.items, payload.uuid);
    },
  },
  getters: {
    collectionTotalPrice: state => collection => {
      let totalPrice = 0;

      for (const [uuid, item] of Object.entries(collection.items)) {
        totalPrice += item.price;
      }

      return totalPrice;
    },
    collectionItemsCount: state => collection => {
      return Object.keys(collection.items).length;
    },
    productIsInCollection: state => (uuid, collection) => {
      return typeof collection.items[uuid] !== "undefined";
    }
  },
});

export default appStore;
