import React, { Fragment } from 'react'

const Footer = () => {
    return (
        <Fragment>
            <footer>
                <div className="footer-area footer-2">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4 col-md-4 col-sm-5 col-xs-12">
                                <div className="single-footer">
                                    <h3 className="footer-title  title-border">Contact Us</h3>
                                    <ul className="footer-contact">
                                        <li><span>Address :</span>28 Green Tower, Street Name,<br />New York City, USA</li>
                                        <li><span>Cell-Phone :</span>012345 - 123456789</li>
                                        <li><span>Email :</span>your-email@gmail.com</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                <div className="single-footer">
                                    <h3 className="footer-title  title-border">Email Newsletters</h3>
                                    <div className="footer-subscribe">
                                        <form action="#">
                                            <input type="text" name="email" placeholder="Email Address..." />
                                            <button className="button-one submit-btn-4" type="submit"
                                                data-text="Subscribe">Subscribe</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="copyright-area copyright-2">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-6 col-xs-12">
                                <div className="copyright">
                                    <p className="mb-0">&copy; <a href="#" target="_blank">MangoIT E-cart </a> 2022. All Rights
                                        Reserved.</p>
                                </div>
                            </div>
                            <div className="col-sm-6 col-xs-12">
                                <div className="payment  text-right">
                                    <a href="#"><img src="img/payment/1.png" alt="" /></a>
                                    <a href="#"><img src="img/payment/2.png" alt="" /></a>
                                    <a href="#"><img src="img/payment/3.png" alt="" /></a>
                                    <a href="#"><img src="img/payment/4.png" alt="" /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </footer>

        </Fragment>
    )
}

export default Footer