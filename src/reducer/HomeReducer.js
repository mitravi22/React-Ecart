
import {
    ALL_BANNER_REQUEST,
    ALL_BANNER_SUCCESS,
    ALL_BANNER_FAIL,
    ALL_FEATURED_PRODUCTS_REQUEST,
    ALL_FEATURED_PRODUCTS_SUCCESS,
    ALL_FEATURED_PRODUCTS_FAIL,
    ALL_LATEST_PRODUCTS_REQUEST,
    ALL_LATEST_PRODUCTS_SUCCESS,
    ALL_LATEST_PRODUCTS_FAIL,
    ALL_TRENDING_PRODUCTS_REQUEST,
    ALL_TRENDING_PRODUCTS_SUCCESS,
    ALL_TRENDING_PRODUCTS_FAIL,
    CLEAR_ERROR
} from "../constant/HomeConstant"

export const bannerReducer = (state = { banners: [] }, action) => {

    switch (action.type) {
        case ALL_BANNER_REQUEST:
            return {
                loading: true,
                banners: []
            }

        case ALL_BANNER_SUCCESS:
            return {
                loading: false,
                banners: action.payload.result.data,
            }

        case ALL_BANNER_FAIL:
            return {
                loading: false,
                banners: action.payload,
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

export const featuredProducts = (state = {featured: []}, action) => {

    switch (action.type) {
        case ALL_FEATURED_PRODUCTS_REQUEST:
            return {
                loading: true,
                featured: []
            }

        case ALL_FEATURED_PRODUCTS_SUCCESS:
            return {
                loading: false,
                featured: action.payload.result.productData,
            }

        case ALL_FEATURED_PRODUCTS_FAIL:
            return {
                loading: false,
                featured: action.payload,
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

export const latestProducts = (state = {latest: []}, action) => {

    switch (action.type) {
        case ALL_LATEST_PRODUCTS_REQUEST:
            return {
                loading: true,
                latest: []
            }

        case ALL_LATEST_PRODUCTS_SUCCESS:
            
            return {
                loading: false,
                latest: action.payload.result.productData,
            }

        case ALL_LATEST_PRODUCTS_FAIL:
            return {
                loading: false,
                latest: action.payload,
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

export const trendingProducts = (state = {trending: []}, action) => {

    switch (action.type) {
        case  ALL_TRENDING_PRODUCTS_REQUEST:
            return {
                loading: true,
                trending: []
            }

        case  ALL_TRENDING_PRODUCTS_SUCCESS:
            return {
                loading: false,
                trending: action.payload.result.productData,
            }

        case  ALL_TRENDING_PRODUCTS_FAIL:
            return {
                loading: false,
                trending: action.payload,
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