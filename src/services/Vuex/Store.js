import Vue from 'vue';
import Vuex from 'vuex';
import ProductCollectionItem from '../../data-class/ProductCollectionItem';
import ProductCollection from "../../data-class/ProductCollection";

Vue.use(Vuex);

const appStore = new Vuex.Store({
  state: {
    listingItems: [], // Currently listed on the page products data
    resultsCount: 0, // Total results count
    page: 1, // Current page
    productCollections: {
      wishlistCollection: new ProductCollection('Wishlist'), // ProductCollection storing wishlist products data
      cartCollection: new ProductCollection('Cart'), // ProductCollection storing cart products data
    },
    collectionList: {
      active: false, // Flag indicating if the collection list view should be displayed
      selectedCollection: null // The name of collection currently listed in collection list view
    }
  },
  mutations: {
    addCollectionItem(state, payload) {
      if (!payload.item instanceof ProductCollectionItem) {
        return;
      }

      const collection = state.productCollections[payload.collectionName];

      collection.items = { ...collection.items, [payload.uuid]: payload.collectionItem };
    },
    removeCollectionItem(state, payload) {
      Vue.delete(state.productCollections[payload.collectionName].items, payload.uuid);
    },
    nextPage(state) {
      state.page++;
    },
    previousPage(state) {
      state.page--;
    },
    closeListViewCollection(state) {
      return Vue.set(state.collectionList, 'active', false);
    },
    toggleListViewCollection(state, collectionName) {
      if (state.collectionList.selectedCollection === collectionName) {
        return Vue.set(state.collectionList, 'active', !state.collectionList.active);
      }

      Vue.set(state.collectionList, 'selectedCollection', collectionName);
      Vue.set(state.collectionList, 'active', true);
    }
  },
  getters: {
    collectionTotalPrice: (state) => (collectionName) => {
      let totalPrice = 0;

      for (const [uuid, item] of Object.entries(state.productCollections[collectionName].items)) {
        totalPrice += item.price;
      }

      return totalPrice;
    },
    collectionItemsCount: (state) => (collectionName) => Object.keys(state.productCollections[collectionName].items).length,
    productIsInCollection: (state) => (uuid, collectionName) => state.productCollections[collectionName].items[uuid] instanceof ProductCollectionItem,
    selectedListViewCollection: (state) => state.productCollections[state.collectionList.selectedCollection],
    selectedListViewCollectionName: (state) => state.collectionList.selectedCollection,
    isListViewCollectionActive: (state) => state.collectionList.active,
  },
  actions: {
    removeCollectionItem(context, payload) {
      context.commit('removeCollectionItem', payload);

      if (0 === context.getters.collectionItemsCount(payload.collectionName)) {
        context.state.collectionList.active = false;
      }
    },
  }
});

export default appStore;
