import React from 'react'
import { Link } from 'react-router-dom'

const ThankYou = () => {
    return (
        <div style={{textAlign:"center",margin: "100px"}} >
            <header >
                <h1>THANK YOU!</h1>
            </header>

            <div className="main-content">
                <i className="fa fa-check main-content__checkmark" id="checkmark"></i>
                <h2 >Your Order is Successfull!!</h2>
                <Link to='/my-orders'>View Your Order</Link>
            </div>

        </div>
    )
}

export default ThankYou