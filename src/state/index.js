import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCartOpen: false,
  isMenuOpen: false,
  cart: [],
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },

    addToCart: (state, action) => {
      state.cart = [...state.cart, action.payload.item];
    },

    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
    },

    increaseCount: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload.id) {
          item.count++;
        }
        return item;
      });
    },

    decreaseCount: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload.id && item.count > 1) {
          item.count--;
        }
        return item;
      });
    },

    setIsCartOpen: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
    setIsMenuOpen: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
  },
});



const favInitialState = {
  isFavoriteOpen: false,
  fav: [],
  items: [],
};

export const FavSlice = createSlice({
  name: "fav",
  initialState: favInitialState,
  reducers: {
    setFavItems: (state, action) => {
      state.items = action.payload;
    },

    addToFav: (state, action) => {
      state.fav = [...state.fav, action.payload.item]; 
    },

    removeFromFav: (state, action) => {
      state.fav = state.fav.filter((item) => item.id !== action.payload.id);
    },

    setIsFavoriteOpen: (state) => {
      state.isFavoriteOpen = !state.isFavoriteOpen;
    },
  },
});

export const { 
  setFavItems,
  addToFav,
  removeFromFav,
  setIsFavoriteOpen } = FavSlice.actions;

  export const favReducer = FavSlice.reducer;


export const {
  setItems,
  addToCart,
  removeFromCart,
  increaseCount,
  decreaseCount,
  setIsCartOpen,
  setIsMenuOpen,
} = cartSlice.actions;

export default cartSlice.reducer;
