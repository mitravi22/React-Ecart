
import {
    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_SUCCESS,
    PRODUCT_DETAIL_FAIL,
    CLEAR_ERROR

} from "../constant/ProductsConstant"

export const productDetailReducer = (state = { product: {} }, action) => {

    switch (action.type) {

        case PRODUCT_DETAIL_REQUEST:
            return {
                loading: true,
                ...state
            }

        case PRODUCT_DETAIL_SUCCESS:
            return {
                loading: false,
                product: action.payload.result.productData
            }

        case PRODUCT_DETAIL_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }

}