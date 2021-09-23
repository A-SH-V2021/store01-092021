import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    let maxPrice = action.payload.map((p) => p.price);
    maxPrice = Math.max(...maxPrice);

    return {
      ...state,
      filtered_products: [...action.payload],
      all_products: [...action.payload],
      filters: {
        ...state.filters,
        max_price: maxPrice,
      },
    };
  }

  if (action.type === SET_LISTVIEW) {
    return { ...state, grid_view: true };
  }
  if (action.type === SET_GRIDVIEW) {
    return { ...state, grid_view: false };
  }

  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload };
  }

  if (action.type === SORT_PRODUCTS) {
    const { sort, filtered_products } = state;
    let tempProducts = [...filtered_products];

    switch (sort) {
      case "sort-lowest":
        tempProducts = tempProducts.sort((a, b) => a.price - b.price);
        break;
      case "sort-highest":
        tempProducts = tempProducts.sort((a, b) => b.price - a.price);
        break;
      case "name-a":
        tempProducts = tempProducts.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
        break;
      case "name-z":
        tempProducts = tempProducts.sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
        break;
    }
    return { ...state, filtered_products: tempProducts };
  }
  if (action.type === UPDATE_FILTERS) {
    let { name, value } = action.payload;

    return { ...state, filters: { ...state.filters, [name]: value } };
  }

  if (action.type === FILTER_PRODUCTS) {
    const { all_products } = state;
    let tempProduct = [...all_products];

    const { text, category, company, color, price, shipping } = state.filters;
    // btn search
    if (text) {
      tempProduct = tempProduct.filter((product) => {
        return product.name.toLowerCase().startsWith(text);
      });
    }
    // category
    if (category !== "all") {
      tempProduct = tempProduct.filter(
        (product) => product.category === category
      );
    }
    // company
    if (company !== "all") {
      tempProduct = tempProduct.filter(
        (product) => product.company === company
      );
    }
    // colors
    if (color !== "all") {
      tempProduct = tempProduct.filter((item) => {
        return item.colors.find((c) => c === color);
      });
    }
    // price
    if (price) {
      tempProduct = tempProduct.filter((p) => p.price <= price);
    }
    // shipping
    if (shipping) {
     
      tempProduct = tempProduct.filter((item) => item.shipping);
    }
    return { ...state, filtered_products: tempProduct };
  }

  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        text: "",
        category: "all",
        company: "all",
        color: "all",
        price: state.filters.min_price,
        shipping: false,
      },
    };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
