# Vue Cart

The application fetches products from the external API and allows users to wishlist products or add them to cart.
Key features:
1) Responsive design
2) Pagination
3) List view and management of all items added to cart or favourites

##Note
The API endpoint mentioned in the spec doesn't seem to provide total results count,
 so it was decided to use general activities API instead https://api.musement.com/api/v3/activities

The application state is not persistent (resets on reload) because of the local storage limitations
which can impact the application usability.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```
