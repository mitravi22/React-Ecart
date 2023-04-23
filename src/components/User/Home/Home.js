import React, { Fragment, useEffect } from 'react'
import Banner from './Banner';
import FeaturedProduct from './FeaturedProduct';
import Latestproducts from './Latestproducts';
import TrendingProducts from './TrendingProducts';
import Loader from "../layout/Loader"
import { useAlert } from "react-alert";
import { getBanners, clearErrors, getFeaturedProducts, getTrendingProducts, getLatestProducts} from "../../../action/HomeAction"
import { useSelector, useDispatch } from "react-redux";
import { LOGIN_SUCCESS } from '../../../constant/AuthConstant';

const Home = () => {

    const alert = useAlert()

    const dispatch = useDispatch()

    const { banners, error, loading } = useSelector((state) => state.banners)
    const {featured} = useSelector((state) => state.featured)
    const {latest} = useSelector((state) => state.latest)
    const { trending } = useSelector((state) => state.trending)

    useEffect(() => {
        // validateUser()
        
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        dispatch(getBanners());
        dispatch(getFeaturedProducts());
        dispatch(getTrendingProducts());
        dispatch(getLatestProducts("newArrival"));
    
    }, [dispatch, error, alert])

//    function validateUser(){
//         let userDetails = localStorage.getItem('userDetails');
//         if(userDetails){
//         userDetails = JSON.parse(userDetails);
//         dispatch({
//             type:LOGIN_SUCCESS,
//             payload:userDetails
//         })
//         }
//     }; 
    return (
        <Fragment>
            {loading ? <Loader /> : <Fragment>
                <Banner banner={banners}/>
                <FeaturedProduct featureProduct={featured} />
                <Latestproducts latest={latest}/>
                <TrendingProducts trending={trending} />
            </Fragment>}

        </Fragment>
    )
}

export default Home