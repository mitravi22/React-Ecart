
import axios from "axios";
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

// Get All Banners

export const getBanners = () => async (dispatch) => {

    try {

        dispatch({
            type: ALL_BANNER_REQUEST
        })

        const { data } = await axios.get("/api/admin-banner/get-banners")

        dispatch({
            type: ALL_BANNER_SUCCESS,
            payload: data
        })

    } catch (error) {

        dispatch({
            type: ALL_BANNER_FAIL,
            payload: error.response.data.message,
        })
    }
}

// Get featured products

export const getFeaturedProducts = () => async (dispatch) => {

    try {

        dispatch({
            type: ALL_FEATURED_PRODUCTS_REQUEST
        })

        const { data } = await axios.get("/api/user-product/feature-product")

        dispatch({
            type: ALL_FEATURED_PRODUCTS_SUCCESS,
            payload: data
        })

    } catch (error) {

        dispatch({
            type: ALL_FEATURED_PRODUCTS_FAIL,
            payload: error.response.data.message,
        })
    }
}

// Get Latest Products

export const getLatestProducts = (option) => async (dispatch) => {

    try {

        dispatch({
            type: ALL_LATEST_PRODUCTS_REQUEST
        })

        const { data } = await axios.get(`/api/user-product/latest-product?option=${option}`)
           if(data){
            dispatch({
            type: ALL_LATEST_PRODUCTS_SUCCESS,
            payload: data
        })
           }
        

    } catch (error) {

        dispatch({
            type: ALL_LATEST_PRODUCTS_FAIL,
            payload: error.response.data.message,
        })
    }
}

// Get trending products

export const getTrendingProducts = () => async (dispatch) => {

    try {

        dispatch({
            type: ALL_TRENDING_PRODUCTS_REQUEST
        })

        const { data } = await axios.get("/api/user-product/latest-product?option=mostView")

        dispatch({
            type: ALL_TRENDING_PRODUCTS_SUCCESS,
            payload: data
        })

    } catch (error) {

        dispatch({
            type: ALL_TRENDING_PRODUCTS_FAIL,
            payload: error.response.data.message,
        })
    }
}

// Clear All Error

export const clearErrors = (dispatch) => {

    dispatch({
        type: CLEAR_ERROR
    })
}