export const getOrders = () => {
  return fetch("https://dummyjson.com/cart/1")
    .then((response) => response.json())
    .then((data) => data);
};

export const getRevenue = () => {
  return fetch("https://dummyjson.com/carts").then((response) => response.json());
};

export const getInventory = () => {
  return fetch("https://dummyjson.com/products")
    .then((response) => response.json())
    .then((data) => data);
};
