
import {
    ADD_TO_CART,
    REMOVE_CART_ITEM,
    GET_TO_CART_ITEMS,
    SAVE_SHIPPING_INFO
} from "../constant/CartConstant"

export const cartReducer = (state = { cartItems: [], shippingInfo: {} }, action) => {

    switch (action.type) {

        case ADD_TO_CART:
            return {
                ...state,
                loading: false,
                success: action.payload
            }

        case GET_TO_CART_ITEMS:

            const item = action.payload

            const isItemExist = state.cartItems.find((i) => i.product === item.product);
            if (isItemExist) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((i) =>
                        i.product === isItemExist.product ? item : i
                    )
                };
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                };
            }


        case REMOVE_CART_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter((i) => i.product !== action.payload),
            };

        case SAVE_SHIPPING_INFO:
            return {
                ...state,
                shippingInfo: action.payload,
            };

        default:
            return state;

    }
}