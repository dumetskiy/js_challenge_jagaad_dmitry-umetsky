import {PreviousPageElement, NextPageElement, BreakElement, PageElement} from "./PaginatorElement";

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
    let paginatorConfig = this.getPaginatorPageElements(page, totalResults, perPage);

    if (this.addArrows) {
      if (page > 1) {
        paginatorConfig.unshift(new PreviousPageElement)
      }

      if (page < this.getPagesCount(totalResults, perPage)) {
        paginatorConfig.push(new NextPageElement)
      }
    }

    return paginatorConfig;
  }
  getPaginatorPageElements(page, totalResults, perPage) {
    perPage = perPage || this.itemsPerPage;

    const paginatorConfiguration = [],
      pagesCount = this.getPagesCount(totalResults, perPage),
      centralPaginatorItemOrder = Math.ceil(this.paginatorItemsCount / 2);

    if (pagesCount <= this.paginatorItemsCount) {
      for (const pageNumber in [1..page]) {
        paginatorConfiguration.push(new PageElement(pageNumber), pageNumber === page);
      }

      return paginatorConfiguration;
    }

    const pageIsInBeginning = page <= centralPaginatorItemOrder,
      pageIsInEnd = page >= pagesCount - centralPaginatorItemOrder;

    if (!pageIsInBeginning && !pageIsInEnd) {
      paginatorConfiguration.push(new PageElement(1), new BreakElement);

      for (let pageNumber = page - centralPaginatorItemOrder + 2; pageNumber <= page + centralPaginatorItemOrder - 2; pageNumber++) {
        paginatorConfiguration.push(new PageElement(pageNumber, pageNumber === page));
      }

      paginatorConfiguration.push(new BreakElement, new PageElement(pagesCount));

      return paginatorConfiguration;
    }

    if (pageIsInBeginning) {
      for (let pageNumber = 1;  pageNumber <= this.paginatorItemsCount - 1; pageNumber++) {
        paginatorConfiguration.push(new PageElement(pageNumber, pageNumber === page));
      }

      paginatorConfiguration.push(new BreakElement, new PageElement(pagesCount));

      return paginatorConfiguration;
    }

    if (pageIsInEnd) {
      paginatorConfiguration.push(new PageElement(1), new BreakElement);

      for (let pageNumber = pagesCount - this.paginatorItemsCount + 2;  pageNumber <= pagesCount; pageNumber++) {
        paginatorConfiguration.push(new PageElement(pageNumber, pageNumber === page));
      }

      return paginatorConfiguration;
    }
  }
}
