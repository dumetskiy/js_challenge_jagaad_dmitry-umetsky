<template>
  <nav class="pagination">
    <ul class="pagination__list">
      <li v-for="paginationElement in paginationConfig" class="pagination__item">
        <p v-if="isPreviousPagePaginationElement(paginationElement)" class="pagination__link">
          <ArrowLeft></ArrowLeft>
        </p>
        <p v-else-if="isNextPagePaginationElement(paginationElement)" class="pagination__link">
          <ArrowRight></ArrowRight>
        </p>
        <p v-else-if="isBreakPaginationElement(paginationElement)" class="pagination__link break">
          ...
        </p>
        <p
          v-else-if="isPagePaginationElement(paginationElement)"
          v-on:click="switchPage(paginationElement.page)"
          class="pagination__link"
          :class="{ 'current' : paginationElement.isCurrentPage}"
        >
          {{ paginationElement.page }}
        </p>
      </li>
    </ul>
  </nav>
</template>
<script>
import PaginationConfigGenerator from "../services/Helper/PaginationConfigGenerator";
import ArrowLeft from '../../static/svg/arrow-left.svg';
import ArrowRight from '../../static/svg/arrow-right.svg';
import MusementVenuesApiClient from "../services/API/MusementVenuesApiClient";
import {BreakElement, NextPageElement, PageElement, PreviousPageElement} from "../services/Helper/PaginatorElement";

export default {
  name: 'Pagination',
  components: {
    ArrowLeft,
    ArrowRight
  },
  computed: {
    paginationConfig () {
      return (new PaginationConfigGenerator(6, 5, true))
        .getPaginatorConfiguration(
        this.$store.state.page,
        this.$store.state.resultsCount
      )
    }
  },
  methods: {
    fetchPaginatedProducts() {
      new MusementVenuesApiClient().getDetailsForPage(this.$store.state.page);
    },
    switchPage(page) {
      if (page === this.$store.state.page) {
        return;
      }

      this.$store.state.page = page;
      this.fetchPaginatedProducts();
    },
    isPreviousPagePaginationElement(element) {
      return element instanceof PreviousPageElement;
    },
    isNextPagePaginationElement(element) {
      return element instanceof NextPageElement;
    },
    isBreakPaginationElement(element) {
      return element instanceof BreakElement;
    },
    isPagePaginationElement(element) {
      return element instanceof PageElement;
    },
  },
  mounted() {
    this.fetchPaginatedProducts();
  },
  data () {
    return {}
  }
}
</script>
