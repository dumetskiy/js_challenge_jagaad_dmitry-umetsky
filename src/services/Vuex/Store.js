import Vue from 'vue';
import Vuex from 'vuex';
import ProductCollectionItem from '../../data-class/ProductCollectionItem';

Vue.use(Vuex);

const appStore = new Vuex.Store({
  state: {
    listingItems: [],
    resultsCount: 0,
    page: 1,
    wishlistedCollection: { items: {}, title: 'Wishlist' },
    cartCollection: { items: {}, title: 'Cart' },
    collectionList: {
      active: false,
      selectedCollection: null
    }
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

      for (const [uuid, item] of Object.entries(state[collectionName].items)) {
        totalPrice += item.price;
      }

      return totalPrice;
    },
    collectionItemsCount: (state) => (collectionName) => Object.keys(state[collectionName].items).length,
    productIsInCollection: (state) => (uuid, collectionName) => state[collectionName].items[uuid] instanceof ProductCollectionItem,
    selectedListViewCollection: (state) => state[state.collectionList.selectedCollection],
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
