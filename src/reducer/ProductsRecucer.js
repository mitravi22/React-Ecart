
import {
    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_SUCCESS,
    PRODUCT_DETAIL_FAIL,

    CATEGORY_REQUEST,
    CATEGORY_SUCCESS,
    CATEGORY_FAIL,

    COLOR_REQUEST,
    COLOR_SUCCESS,
    COLOR_FAIL,

    SIZE_REQUEST,
    SIZE_SUCCESS,
    SIZE_FAIL,

    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,

    CLEAR_ERROR

} from "../constant/ProductsConstant"

//Single Product Reducer

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

// Categories, Size, Colors 

export const filtersReducer = (state = {}, action) => {

    switch (action.type) {

        case CATEGORY_REQUEST:
        case COLOR_REQUEST:
        case SIZE_REQUEST:
            return {
                loading: true,
                ...state
            }

        case CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                category: action.payload.result.data.rows
            }

        case COLOR_SUCCESS:
            return {
                ...state,
                loading: false,
                colors: action.payload.result.colors
            }

        case SIZE_SUCCESS:
            return {
                ...state,
                loading: false,
                size: action.payload.result.size
            }

        case CATEGORY_FAIL:
        case COLOR_FAIL:
        case SIZE_FAIL:
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

// Get All Products

export const getAllProductReducer = (state = { allproduct: [] }, action) => {

    switch (action.type) {

        case ALL_PRODUCTS_REQUEST:
            return {
                loading: true,
                allProduct: []
            }

        case ALL_PRODUCTS_SUCCESS:
            return {

                loading: false,
                 allproduct: action.payload.result.data.rows,
                 pageCount: action.payload.result.data.count
            }

        case ALL_PRODUCTS_FAIL:
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