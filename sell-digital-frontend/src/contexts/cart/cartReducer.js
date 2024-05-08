const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cartItems: action.payload.item,
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.id !== action.payload.itemId
        ),
      };
    case "EMPTY_CART":
      return {
        ...state,
        cartItems: [],
      };
    case "CART_LENGTH":
      return {
        ...state,
        cartLength: action.payload.item,
      };
    case "INCREMENT_ITEM":
      return {
        ...state,
        cartItems: state.cartItems.map((item) => {
          if (item.id === action.payload.itemId) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }
          return item;
        }),
      };
    case "DECREMENT_ITEM":
      return {
        ...state,
        cartItems: state.cartItems
          .map((item) => {
            if (item.id === action.payload.itemId) {
              return {
                ...item,
                quantity: item.quantity - 1,
              };
            }
            return item;
          })
          .filter((item) => item.quantity !== 0),
      };
    default:
      return state;
  }
};

export default cartReducer;
