import {
  ADD_TO_CART,
  REMOVE_ITEM,
  DEC_CART,
  INC_CART,
  FETCH_ITEMS,
  FETCH_CART,
  FETCH_TOTAL,
} from "../actions/cart-action-types";

const initState = {
  items: [],
  cart: [],
  total: 0,
};

const cartReducer = (state = initState, action) => {
  //INSIDE HOME COMPONENT
  if (action.type === ADD_TO_CART) {
    let fooditem = state.items.find((item) => item.DishID === action.payload);
    //check if the action.payload exists in the cart
    let existed_item = state.cart.find(
      (item) => action.payload === item.DishID
    );
    if (existed_item) {
      // console.log(fooditem)
      fooditem.quantity += 1;
      existed_item.quantity = fooditem.quantity;
      localStorage.setItem("cart", JSON.stringify(state.cart));
      console.log(state.items);
      localStorage.setItem("menu", JSON.stringify(state.items));
      let newTotal = state.total + existed_item.SalePrice;
      localStorage.setItem("total",newTotal);
      console.log(state.cart)
      return {
        ...state,
        total: newTotal,
      };
    } else {
      fooditem.quantity = 1;
      //calculating the total
      let newTotal = state.total + fooditem.SalePrice;
      const cartitems = [...state.cart, fooditem];
      localStorage.setItem("cart", JSON.stringify(cartitems));
      console.log(state.items);
      localStorage.setItem("menu", JSON.stringify(state.items));
      localStorage.setItem("total",newTotal);
      return {
        ...state,
        cart: cartitems,
        total: newTotal,
      };
    }
  }
  if (action.type === REMOVE_ITEM) {
    let itemToRemove = state.cart.find(
      (item) => action.payload === item.DishID
    );
    let new_items = state.cart.filter((item) => action.payload !== item.DishID);

    //calculating the total
    let newTotal = state.total - itemToRemove.SalePrice * itemToRemove.quantity;
    localStorage.setItem("cart", JSON.stringify(new_items));
    console.log(state.items);
    localStorage.setItem("menu", JSON.stringify(state.items));
    localStorage.setItem("total",newTotal);
    return {
      ...state,
      cart: new_items,
      total: newTotal,
    };
  }
  //INSIDE CART COMPONENT
  if (action.type === INC_CART) {
    // let fooditem = state.items.find((item) => item.DishID === action.payload);
    // fooditem.quantity += 1;
    // let newTotal = state.total + fooditem.SalePrice;
    
    console.log(state.items);
    localStorage.setItem("menu", JSON.stringify(state.items));
    let existed_item = state.cart.find(
      (item) => action.payload === item.DishID
    );
    existed_item.quantity += 1
    let newTotal = state.total + existed_item.SalePrice;
    localStorage.setItem("cart", JSON.stringify(state.cart));
    localStorage.setItem("total",newTotal);
    return {
      ...state,
      cart: state.cart,
      total: newTotal,
    };
  }
  if (action.type === DEC_CART) {
    let fooditem = state.cart.find((item) => item.DishID === action.payload);
    //if the qt == 0 then it should be removed
    if (fooditem.quantity === 1) {
      let new_items = state.cart.filter(
        (item) => item.DishID !== action.payload
      );
      let newTotal = state.total - fooditem.SalePrice;
      localStorage.setItem("menu", JSON.stringify(state.items));
      localStorage.setItem("cart", JSON.stringify(new_items));
      console.log(state.items);
      localStorage.setItem("total",newTotal);
      return {
        ...state,
        cart: new_items,
        total: newTotal,
      };
    } else {
      fooditem.quantity -= 1;
      let newTotal = state.total - fooditem.SalePrice;
      localStorage.setItem("cart", JSON.stringify(state.cart));
      console.log(state.items);
      localStorage.setItem("menu", JSON.stringify(state.items));
      localStorage.setItem("total",newTotal);
      return {
        ...state,
        total: newTotal,
      };
    }
  }
  if (action.type === FETCH_ITEMS) {
    return {
      ...state,
      items: action.payload,
    };
  }
  if (action.type === FETCH_CART) {
    return {
      ...state,
      cart: action.payload,
    };
  }  
  if (action.type === FETCH_TOTAL) {
    return {
      ...state,
      total: action.payload,
    };
  } 
  else {
    return state;
  }
};

export default cartReducer;
