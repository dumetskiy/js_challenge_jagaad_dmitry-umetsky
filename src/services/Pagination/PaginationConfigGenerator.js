import {
  PreviousPageElement, NextPageElement, BreakElement, PageElement,
} from '../../data-class/PaginatorElement';

export default class PaginationConfigGenerator {
  constructor(itemsPerPage, paginatorItemsCount, addArrows) {
    this.itemsPerPage = itemsPerPage;
    this.paginatorItemsCount = paginatorItemsCount;
    this.addArrows = Boolean(addArrows);
  }

  getPagesCount(resultsCount, itemsPerPage) {
    itemsPerPage = itemsPerPage || this.itemsPerPage;

    return Math.ceil(resultsCount / itemsPerPage);
  }

  getPaginatorConfiguration(page, totalResults, perPage) {
    const paginatorConfig = this.getPaginatorPageElements(page, totalResults, perPage);

    // Checks if paginator requires previous and next arrow elements to be added and the current page allows
    // to make a use of them
    if (this.addArrows) {
      if (page > 1) {
        paginatorConfig.unshift(new PreviousPageElement());
      }

      if (page < this.getPagesCount(totalResults, perPage)) {
        paginatorConfig.push(new NextPageElement());
      }
    }

    return paginatorConfig;
  }

  // Generates the array of PaginatorElement class objects representing every element of the paginator
  // depending on the current page, items listed per page and total results count
  getPaginatorPageElements(page, totalResults, perPage) {
    perPage = perPage || this.itemsPerPage;

    const paginatorConfiguration = [];
    const pagesCount = this.getPagesCount(totalResults, perPage);
    const centralPaginatorItemOrder = Math.ceil(this.paginatorItemsCount / 2);

    // Generating paginator config for the case when total pages count fits the paginator size
    if (pagesCount <= this.paginatorItemsCount) {
      for (const pageNumber in [1.0.page]) {
        paginatorConfiguration.push(new PageElement(pageNumber), pageNumber === page);
      }

      return paginatorConfiguration;
    }

    const pageIsInBeginning = page <= centralPaginatorItemOrder;
    const pageIsInEnd = page >= pagesCount - centralPaginatorItemOrder;

    // Generating paginator config for the case when both pages before and after the current page don't fit
    // into the paginator size
    if (!pageIsInBeginning && !pageIsInEnd) {
      paginatorConfiguration.push(new PageElement(1), new BreakElement());

      for (
        let pageNumber = page - centralPaginatorItemOrder + 2;
        pageNumber <= page + centralPaginatorItemOrder - 2;
        pageNumber++
      ) {
        paginatorConfiguration.push(new PageElement(pageNumber, pageNumber === page));
      }

      paginatorConfiguration.push(new BreakElement(), new PageElement(pagesCount));

      return paginatorConfiguration;
    }

    // Generating paginator config for the case when only pages after the current page don't fit into the paginator size
    if (pageIsInBeginning) {
      for (let pageNumber = 1; pageNumber <= this.paginatorItemsCount - 1; pageNumber++) {
        paginatorConfiguration.push(new PageElement(pageNumber, pageNumber === page));
      }

      paginatorConfiguration.push(new BreakElement(), new PageElement(pagesCount));

      return paginatorConfiguration;
    }

    // Generating paginator config for the case when only pages before the current page don't
    // fit into the paginator size
    if (pageIsInEnd) {
      paginatorConfiguration.push(new PageElement(1), new BreakElement());

      for (let pageNumber = pagesCount - this.paginatorItemsCount + 2; pageNumber <= pagesCount; pageNumber++) {
        paginatorConfiguration.push(new PageElement(pageNumber, pageNumber === page));
      }

      return paginatorConfiguration;
    }
  }
}
