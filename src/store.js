import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import { bannerReducer, featuredProducts, trendingProducts, latestProducts } from "./reducer/HomeReducer"
import {
     loginUserReducer, 
    registrationUserRducer, 
    forgetPasswordReducer, 
    resetPasswordReducer,
    loadUserReducer   
} from "./reducer/AuthReducer"
import {contactUsReducer} from "./reducer/ContactUsReducer"
import { updateProfileReducer} from "./reducer/ProfileReducer"
import {productDetailReducer, filtersReducer, getAllProductReducer} from "./reducer/ProductsRecucer"
import {cartReducer} from "./reducer/CartReducer"

const reducer = combineReducers({
    banners: bannerReducer,
    featured: featuredProducts,
    latest: latestProducts,
    trending: trendingProducts,
    userLogin: loginUserReducer,
    userRegistration: registrationUserRducer,
    loadUser: loadUserReducer,
    forgetPassword: forgetPasswordReducer,
    resetPassword: resetPasswordReducer,
    contactUs: contactUsReducer,
    profileUpdate: updateProfileReducer,
    product: productDetailReducer,
    filters: filtersReducer,
    allProduct: getAllProductReducer,
    cart: cartReducer
})

const initialState = {
    cart: {
        cartItems: localStorage.getItem("cartItems")
          ? JSON.parse(localStorage.getItem("cartItems"))
          : [],
        shippingInfo: localStorage.getItem("shippingInfo")
          ? JSON.parse(localStorage.getItem("shippingInfo"))
          : {},
      },
};

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;