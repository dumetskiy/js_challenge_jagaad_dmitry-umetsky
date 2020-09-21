class PaginatorElement {
  constructor(page, isCurrentPage) {
    this.page = page;
    this.isCurrentPage = isCurrentPage;
  }
}

class PreviousPageElement extends PaginatorElement {}

class NextPageElement extends PaginatorElement {}

class BreakElement extends PaginatorElement {}

class PageElement extends PaginatorElement {}

export {PreviousPageElement, NextPageElement, BreakElement, PageElement};
