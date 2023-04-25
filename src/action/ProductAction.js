
import axios from "axios"
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
import { colors } from "@material-ui/core"
import { getAllProductReducer } from '../reducer/ProductsRecucer';

// Single product details

export const productDetails = (id) => async (dispatch) => {

    try {

        dispatch({
            type: PRODUCT_DETAIL_REQUEST
        })

        const { data } = await axios.get(`/api/user-product/product-details/${id}`)

        // console.log(data,"hh")

        dispatch({
            type: PRODUCT_DETAIL_SUCCESS,
            payload: data
        })

    } catch (error) {

        dispatch({
            type: PRODUCT_DETAIL_FAIL,
            payload: error.response.data.message,
        })

    }
}

// Get all Categories

export const getCategories = () => async (dispatch) => {

    try {

        dispatch({
            type: CATEGORY_REQUEST,
        })

        const { data } = await axios.get('/api/user-product/get-categories')
        // console.log(data, "cat");

        dispatch({
            type: CATEGORY_SUCCESS,
            payload: data
        })

    } catch (error) {

        dispatch({
            type: CATEGORY_FAIL,
            payload: error.response.data.message,
        })

    }
}

// Get Colors

export const getColors = () => async (dispatch) => {

    try {

        dispatch({
            type: COLOR_REQUEST,
        })

        const { data } = await axios.get('/api/user-product/get-color')
        // console.log(data, "color");

        dispatch({
            type: COLOR_SUCCESS,
            payload: data
        })

    } catch (error) {

        dispatch({
            type: COLOR_FAIL,
            payload: error.response.data.message,
        })

    }
}

// Get Size 

export const getSize = () => async (dispatch) => {

    try {

        dispatch({
            type: SIZE_REQUEST,
        })

        const { data } = await axios.get('/api/user-product/get-size')
        // console.log(data, "size");

        dispatch({
            type: SIZE_SUCCESS,
            payload: data
        })

    } catch (error) {

        dispatch({
            type: SIZE_FAIL,
            payload: error.response.data.message,
        })

    }
}

// Get all Products

export const getAllProduct = (config) => async (dispatch) => {

    try {
        // console.log(config,"fig");
        dispatch({
            type: ALL_PRODUCTS_REQUEST
        })
        let queryStr = `page=${config.page}&pageSize=${config.pageSize}`;

        if(config.filter && config.filter!=""){
            queryStr = queryStr +`&`+ `filter=${config.filter}`
        }

        if(config.search && config.search!=""){
            queryStr = queryStr +`&`+ `search=${config.search}`
        }

        if(config.catId && config.catId!=""){
            queryStr = queryStr +`&`+ `catId=${config.catId}`
        }

        if(config.color && config.color!=""){
            queryStr = queryStr +`&`+ `color=${config.color}`
        }

        if(config.size && config.size!=""){
            queryStr = queryStr +`&`+ `size=${config.size}`
        }

        if(config.price && config.price!=""){
            queryStr = queryStr +`&`+ `price=${config.price}`
        }

        let link = `/api/user-product/get-all-products?${queryStr}`;

        const { data } = await axios.get(link);

        dispatch({
            type: ALL_PRODUCTS_SUCCESS,
            payload: data
        })
    } catch (error) {

        dispatch({
            type: ALL_PRODUCTS_FAIL,
            payload: error.response.data.message,
        })

    }

}

//Clear Error

export const clearErrors = (dispatch) => {

    dispatch({
        type: CLEAR_ERROR
    })
}