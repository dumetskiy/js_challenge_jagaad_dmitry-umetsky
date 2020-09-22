export default class ProductCollectionItem {
  constructor(uuid, title, price, friendlyPrice, imageUrl) {
    this.uuid = uuid;
    this.title = title;
    this.price = price;
    this.friendlyPrice = friendlyPrice;
    this.imageUrl = imageUrl;
  }
}
