import React, { Fragment, useState } from 'react'
import { processCheckOut } from "../../../action/CartAction"
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import CheckoutSteps from './CheckoutSteps'
import { useNavigate } from 'react-router-dom';
import Loader from "../layout/Loader"

const Checkout = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems, loading } = useSelector((state) => state.cart)
  const cartData = cartItems && cartItems.length > 0 ? cartItems[0]?.CartItems : null

  // const { shippingInfo } = useSelector((state) => state.cart);

  // console.log(checkOut, "ll");

  // For Billing

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    countryCode: "",
    country: "",
    state: "",
    city: "",
    postcode: "",
  })

  const { firstName, lastName, email, phone, address1, country, state, city, postcode } = user;

  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    countryCode: "",
    country: "",
    state: "",
    city: "",
    postcode: "",
  });

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!user.firstName?.trim()) {
      errors.firstName = "First name is required";
      isValid = false;
    } else if (!/^[A-Za-z]{3,29}$/.test(user.firstName)) {
      errors.firstName = "Only alphabet is allowed and atleast fill three letter"
      isValid = false
    }

    if (!user.lastName?.trim()) {
      errors.lastName = "Last name is required";
      isValid = false;
    } else if (!/^[A-Za-z]{3,29}$/.test(user.lastName)) {
      errors.lastName = "Only alphabet is allowed and atleast fill three letter"
      isValid = false
    }

    if (!user.email?.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      errors.email = "Invalid email address";
      isValid = false;
    }

    if (!user.phone?.trim()) {
      errors.phone = "Mobile number is required";
      isValid = false;
    } else if (!/^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/.test(user.phone)) {
      errors.phone = "Enter correct contact no.";
      isValid = false;
    }

    if (!user.address1?.trim()) {
      errors.address1 = " Address is required";
      isValid = false;
    } else if (!/^^[a-zA-Z0-9\s,'-]*$/.test(user.address1)) {
      errors.address1 = "Enter correct address";
      isValid = false;
    }

    if (!user.address1?.trim()) {
      errors.address1 = " Address is required";
      isValid = false;
    } else if (!/^^[a-zA-Z0-9\s,'-]*$/.test(user.address1)) {
      errors.address1 = "Enter correct address";
      isValid = false;
    }

    if (!user.postcode?.trim()) {
      errors.postcode = " PostCode is required";
      isValid = false;
    } else if (!/(^\d{5}$)|(^\d{5}-\d{5}$)/.test(user.postcode)) {
      errors.postcode = "Enter correct address";
      isValid = false;
    }

    if (!user.country?.trim()) {
      errors.country = "Please select a country";
      isValid = false;
    }

    if (!user.countryCode?.trim()) {
      errors.countryCode = "Please select a country code";
      isValid = false;
    }

    if (!user.state?.trim()) {
      errors.state = "Please select state";
      isValid = false;
    }

    if (!user.city?.trim()) {
      errors.city = "Please select city";
      isValid = false;
    }
    if (!showForm) {
      isValid = shipValidateForm()
    }

    setFormErrors(errors);
    return isValid;
  };
  const checkOutDataChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  // For Shipping

  const [shipUser, setShipUser] = useState({
    shipFirstName: "",
    shipLastName: "",
    shipEmail: "",
    shipPhone: "",
    shipAddress1: "",
    shipAddress2: "",
    shipCountryCode: "",
    shipCountry: "",
    shipState: "",
    shipCity: "",
    shipPostcode: "",
  })

  const { shipFirstName, shipLastName, shipEmail, shipPhone, shipAddress1, shipAddress2, shipCountryCode, shipCountry, shipState, shipCity, shipPostcode } = shipUser;

  const [shipErrors, setShipErrors] = useState({
    shipFirstName: "",
    shipLastName: "",
    shipEmail: "",
    shipPhone: "",
    shipAddress1: "",
    shipAddress2: "",
    shipCountryCode: "",
    shipCountry: "",
    shipState: "",
    shipCity: "",
    shipPostcode: "",
  });

  const shipValidateForm = () => {
    let errors = {};
    let isValid = true;

    if (!shipUser.shipFirstName?.trim()) {
      errors.shipFirstName = "First name is required";
      isValid = false;
    } else if (!/^[A-Za-z]{3,29}$/.test(shipUser.shipFirstName)) {
      errors.shipFirstName = "Only alphabet is allowed and atleast fill three letter"
      isValid = false
    }

    if (!shipUser.shipLastName?.trim()) {
      errors.shipLastName = "Last name is required";
      isValid = false;
    } else if (!/^[A-Za-z]{3,29}$/.test(shipUser.shipLastName)) {
      errors.shipLastName = "Only alphabet is allowed and atleast fill three letter"
      isValid = false
    }

    if (!shipUser.shipEmail?.trim()) {
      errors.shipEmail = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(shipUser.shipEmail)) {
      errors.shipEmail = "Invalid email address";
      isValid = false;
    }

    if (!shipUser.shipPhone?.trim()) {
      errors.shipPhone = "Mobile number is required";
      isValid = false;
    } else if (!/^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/.test(shipUser.shipPhone)) {
      errors.shipPhone = "Enter correct contact no.";
      isValid = false;
    }

    if (!shipUser.shipAddress1?.trim()) {
      errors.shipAddress1 = " Address is required";
      isValid = false;
    } else if (!/^[a-zA-Z0-9\s,'-]*$/.test(shipUser.shipAddress1)) {
      errors.shipAddress1 = "Enter correct address";
      isValid = false;
    }



    if (!shipUser.shipPostcode?.trim()) {
      errors.shipPostcode = " Postcode is required";
      isValid = false;
    } else if (!/(^\d{5}$)|(^\d{5}-\d{5}$)/.test(shipUser.shipPostcode)) {
      errors.shipPostcode = "Enter correct address";
      isValid = false;
    }

    if (!shipUser.shipCountry?.trim()) {
      errors.shipCountry = "Please select a country";
      isValid = false;
    }

    if (!shipUser.shipCountryCode?.trim()) {
      errors.shipCountryCode = "Please select a country code";
      isValid = false;
    }

    if (!shipUser.shipState?.trim()) {
      errors.shipState = "Please select state";
      isValid = false;
    }

    if (!shipUser.shipCity?.trim()) {
      errors.shipCity = "Please select city";
      isValid = false;
    }

    setShipErrors(errors);
    console.log(isValid, "sdfds", errors);
    return isValid;
  };

  const checkOutShipChange = (e) => {
    setShipUser({ ...shipUser, [e.target.name]: e.target.value })
    // console.log(e.target.name, shipUser);
  }

  // For Payment 

  const [payment, setPayment] = useState({
    paymentMethod: "",
    cardHolderName: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: ""
  })

  const { cardHolderName, paymentMethod, cardNumber, cardMonth, cardYear, cardExpiry, cardCvc } = payment

  const [paymentError, setPaymentError] = useState({
    cardHolderName: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
    paymentMethodError: ""
  })

  const paymentValidateForm = () => {
    console.log(cardExpiry, "ss");
    let errors = {};
    let isValid = true;
    if (!payment.paymentMethod) {
      errors.paymentMethodError = "Please select payment method";
      isValid = false;
    }
    if (payment && payment.paymentMethod == 'stripe') {
      if (!payment.cardHolderName?.trim()) {
        errors.cardHolderName = "Name is required";
        isValid = false;
      } else if (!/^([A-Z][a-z]+([\s-][A-Z][a-z]+)*){1,2}$/.test(payment.cardHolderName)) {
        errors.cardHolderName = "Only alphabet is allowed and atleast fill three letter"
        isValid = false
      }

      if (!payment.cardNumber?.trim()) {
        errors.cardNumber = "Card no. is required";
        isValid = false;
      } else if (!/^4[0-9]{12}(?:[0-9]{3})?$/.test(payment.cardNumber)) {
        errors.cardNumber = "Only number is allowed and 16 digit required"
        isValid = false
      }

      if (!payment.cardExpiry?.trim()) {
        errors.cardExpiry = "Card Expiry is required";
        isValid = false;
      } else if (!/^(0[1-9]|1[0-2])\/[0-9]{4}$/.test(payment.cardExpiry)) {
        errors.cardExpiry = "Invalid month and year";
        isValid = false;
      }


      if (!payment.cardCvc?.trim()) {
        errors.cardCvc = " CVV is required";
        isValid = false;
      } else if (!/^[0-9]{3}$/.test(payment.cardCvc)) {
        errors.cardCvc = "Enter correct CVV";
        isValid = false;
      }

    }

    setPaymentError(errors);
    return isValid;
  };

  const checkOutPaymentChange = (e) => {
    setPayment({ ...payment, [e.target.name]: e.target.value })
  }

  // Handle Checkout Submit

  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem("userDetails");
  const dataToken = JSON.parse(token)

  const handleCheckOut = async (e) => {
    e.preventDefault();

    if (validateForm() && paymentValidateForm()) {
      setIsLoading(true);
      // console.log(createObj(), 'obj');
      await dispatch(processCheckOut(dataToken.token, createObj()))
      navigate('/thank-you');
    }
  }


  const createObj = () => {
    console.log(cardExpiry, "dkdkkdasdsaasdasdsaddkdk");
    let dataToSend = {
      "customerId": dataToken.user.id,
      "shippingMethod": "online",
      "shippingTitle": "online",
      "shippingDescription": "online",
      "addressType": "home",
      "paymentMethod": paymentMethod,
      "methodTitle": paymentMethod,
      "firstName": firstName,
      "lastName": lastName,
      "companyName": "MIt",
      "address1": address1,
      "postcode": postcode,
      "city": city,
      "state": state,
      "country": country,
      "email": email,
      "phone": phone,
      "isShippingSame": showForm.toString(),
    }
    if (!showForm) {
      dataToSend["shipFirstName"] = shipFirstName;
      dataToSend["shipLastName"] = shipLastName;
      dataToSend["shipCompanyName"] = "ship";
      dataToSend["shipAddress1"] = shipAddress1;
      dataToSend["shipPostcode"] = shipPostcode;
      dataToSend["shipCity"] = shipCity;
      dataToSend["shipState"] = shipState;
      dataToSend["shipCountry"] = shipCountry;
      dataToSend["shipEmail"] = shipEmail;
      dataToSend["shipPhone"] = shipPhone;
    }
    if (paymentMethod === 'stripe') {
      let splitMonthAndYear = cardExpiry.split('/')
      console.log(cardExpiry, "ss");
      dataToSend["cardNumber"] = cardNumber;
      dataToSend["cardMonth"] = splitMonthAndYear[0];
      dataToSend["cardYear"] = splitMonthAndYear[1];
      dataToSend["cardCvc"] = cardCvc;
    }

    return dataToSend
  }

  const [showForm, setShowForm] = useState(false);
  const [showPaymentForm, setPaymentForm] = useState(false);

  const handleCheckbox = (e) => {
    setShowForm(e.target.checked);
  };

  const handlePaymentCheckbox = (e) => {
    setPaymentForm(e.target.checked);
  };


  return (
    <Fragment>
      {isLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="heading-banner-area overlay-bg">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="heading-banner">
                    <div className="heading-banner-title">
                      <h2>Checkout</h2>
                    </div>
                    <div className="breadcumbs pb-15">
                      <ul>
                        <li><Link to='/'>Home</Link></li>
                        <li>Checkout</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <CheckoutSteps activeStep={0} />
          <div className="tab-pane" id="check-out">
            <form onSubmit={handleCheckOut}>
              <div className="shop-cart-table check-out-wrap">
                <div className="row">

                  <div className="col-md-6 col-sm-6 col-xs-12">
                    <div className="billing-details pr-20">
                      <h4 className="title-1 title-border text-uppercase mb-30">billing details</h4>

                      <input type="text" name="firstName" placeholder="Your first name here..."
                        value={user.firstName}
                        onChange={checkOutDataChange} />
                      {formErrors.firstName && <p style={{ color: 'red' }}>{formErrors.firstName}</p>}

                      <input type="text" name='lastName' placeholder="Your last name here..."
                        value={user.lastName}
                        onChange={checkOutDataChange} />
                      {formErrors.lastName && <p style={{ color: 'red' }}>{formErrors.lastName}</p>}

                      <input type="text" name='email' placeholder="Email address here..."
                        value={user.email}
                        onChange={checkOutDataChange} />
                      {formErrors.email && <p style={{ color: 'red' }}>{formErrors.email}</p>}

                      <input type="text" name='phone' placeholder="Phone here..."
                        value={user.phone}
                        onChange={checkOutDataChange} />
                      {formErrors.phone && <p style={{ color: 'red' }}>{formErrors.phone}</p>}

                      <input type="text" name='address1' placeholder="Address here..."
                        value={user.address1}
                        onChange={checkOutDataChange} />
                      {formErrors.address1 && <p style={{ color: 'red' }}>{formErrors.address1}</p>}

                      <select value={user.countryCode}
                        onChange={(e) => setUser({ ...user, countryCode: e.target.value })} className="custom-select mb-15">
                        <option> Select Country Code</option>
                        <option>India(+91)</option>
                        <option>USA(+1)</option>
                      </select>
                      {formErrors.countryCode && <p style={{ color: 'red' }}>{formErrors.countryCode}</p>}

                      <select value={user.country}
                        onChange={(e) => setUser({ ...user, country: e.target.value })} className="custom-select mb-15">
                        <option>Select Country</option>
                        <option>India</option>
                        <option>United States</option>
                        <option>united Kingdom</option>
                        <option>Australia</option>
                        <option>Canada</option>
                      </select>
                      {formErrors.country && <p style={{ color: 'red' }}>{formErrors.country}</p>}

                      <select value={user.state}
                        onChange={(e) => setUser({ ...user, state: e.target.value })} className="custom-select mb-15">
                        <option>Select State</option>
                        <option>MP</option>
                        <option>New York</option>
                        <option>London</option>
                        <option>Melbourne</option>
                        <option>Ottawa</option>
                      </select>
                      {formErrors.state && <p style={{ color: 'red' }}>{formErrors.state}</p>}

                      <select value={user.city}
                        onChange={(e) => setUser({ ...user, city: e.target.value })} className="custom-select mb-15">
                        <option> Select City</option>
                        <option>Indore</option>
                        <option>Dewas</option>
                        <option>London</option>
                        <option>Melbourne</option>
                        <option>Ottawa</option>
                      </select>
                      {formErrors.city && <p style={{ color: 'red' }}>{formErrors.city}</p>}

                      <input type="text" name='postcode' placeholder="Post Code" value={user.postcode}
                        onChange={checkOutDataChange} />
                      {formErrors.postcode && <div style={{ color: 'red' }}>{formErrors.postcode}</div>}

                    </div>
                    <label>
                      <input type="checkbox" onChange={handleCheckbox} />
                      Shipping address same as Billing address
                    </label>
                  </div>

                  {!showForm && (

                    <div className="col-md-6 col-sm-6 col-xs-12 mt-xs-30">
                      <div className="billing-details pl-20">
                        <h4 className="title-1 title-border text-uppercase mb-30">ship to different address</h4>

                        <input type="text" name="shipFirstName" placeholder="Your first name here..."
                          value={shipUser.shipFirstName}
                          onChange={checkOutShipChange} />
                        {shipErrors.shipFirstName && <p style={{ color: 'red' }}>{shipErrors.shipFirstName}</p>}

                        <input type="text" name='shipLastName' placeholder="Your last name here..."
                          value={shipUser.shipLastName}
                          onChange={checkOutShipChange} />
                        {shipErrors.shipLastName && <p style={{ color: 'red' }}>{shipErrors.shipLastName}</p>}

                        <input type="text" name='shipEmail' placeholder="Email address here..."
                          value={shipUser.shipEmail}
                          onChange={checkOutShipChange} />
                        {shipErrors.shipEmail && <p style={{ color: 'red' }}>{shipErrors.shipEmail}</p>}

                        <input type="text" name='shipPhone' placeholder="Phone here..."
                          value={shipUser.shipPhone}
                          onChange={checkOutShipChange} />
                        {shipErrors.shipPhone && <p style={{ color: 'red' }}>{shipErrors.shipPhone}</p>}

                        <input type="text" name='shipAddress1' placeholder="Address here..."
                          value={shipUser.shipAddress1}
                          onChange={checkOutShipChange} />
                        {shipErrors.shipAddress1 && <p style={{ color: 'red' }}>{shipErrors.shipAddress1}</p>}

                        <select value={shipUser.shipCountryCode}
                          onChange={(e) => setShipUser({ ...shipUser, shipCountryCode: e.target.value })} className="custom-select mb-15">
                          <option> Select Country Code</option>
                          <option>India(+91)</option>
                          <option>USA(+1)</option>
                        </select>
                        {shipErrors.shipCountryCode && <p style={{ color: 'red' }}>{shipErrors.shipCountryCode}</p>}

                        <select value={shipUser.shipCountry}
                          onChange={(e) => setShipUser({ ...shipUser, shipCountry: e.target.value })} className="custom-select mb-15">
                          <option>Select Country</option>
                          <option>India</option>
                          <option>United States</option>
                          <option>united Kingdom</option>
                          <option>Australia</option>
                          <option>Canada</option>
                        </select>
                        {shipErrors.shipCountry && <p style={{ color: 'red' }}>{shipErrors.shipCountry}</p>}

                        <select value={shipUser.shipState}
                          onChange={(e) => setShipUser({ ...shipUser, shipState: e.target.value })} className="custom-select mb-15">
                          <option>Select shipState</option>
                          <option>MP</option>
                          <option>New York</option>
                          <option>London</option>
                          <option>Melbourne</option>
                          <option>Ottawa</option>
                        </select>
                        {shipErrors.shipState && <p style={{ color: 'red' }}>{shipErrors.shipState}</p>}

                        <select value={user.shipCity}
                          onChange={(e) => setShipUser({ ...shipUser, shipCity: e.target.value })} className="custom-select mb-15">
                          <option> Select City</option>
                          <option>Indore</option>
                          <option>Dewas</option>
                          <option>London</option>
                          <option>Melbourne</option>
                          <option>Ottawa</option>
                        </select>
                        {shipErrors.shipCity && <p style={{ color: 'red' }}>{shipErrors.shipCity}</p>}

                        <input type="text" name='shipPostcode' placeholder="Post Code" value={shipUser.shipPostcode}
                          onChange={checkOutShipChange} />
                        {shipErrors.shipPostcode && <p style={{ color: 'red' }}>{shipErrors.shipPostcode}</p>}

                      </div>
                    </div>

                  )}
                </div>
              </div>

              <div className="col-md-6 col-sm-6 col-xs-12">
                <div className="our-order payment-details mt-60 pr-20">
                  <h4 className="title-1 title-border text-uppercase mb-30">Your Order</h4>
                  <table>
                    <thead>
                      <tr>
                        <th><strong>Product</strong></th>
                        <th className="text-right"><strong>Total</strong></th>
                      </tr>
                    </thead>

                    <tbody >
                      {cartData &&
                        cartData && cartData.map((items) => (
                          <tr key={items.id}>
                            <td>{items.name}  x {items.quantity}</td>
                            <td className="text-right">₹ {items.price}</td>
                          </tr>
                        ))}
                      <tr>
                        <td>Cart Subtotal</td>
                        <td className="text-right">₹ {cartItems[0]?.grandTotal}</td>
                      </tr>
                      <tr>
                        <td>Shipping and Handing</td>
                        <td className="text-right">₹ 20.00</td>
                      </tr>
                      <tr>
                        <td>Order Total</td>
                        <td className="text-right">₹ {cartItems[0]?.grandTotal + 20}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="col-md-6 col-sm-6 col-xs-12">
                <div className="payment-method mt-60  pl-20">
                  <h4 className="title-1 title-border text-uppercase mb-30">payment method</h4>

                  <div className="w-96 mx-auto border border-gray-400 rounded-lg">
                    <div className="w-full h-auto p-4 flex items-center border-b border-gray-400">
                      <span>
                        Cash On Delivery   <input value="cod" onChange={(e) => setPayment({ ...payment, paymentMethod: e.target.value })} name="paymentMethod" type="radio" />
                      </span>
                    </div>
                    <br />
                    <div className="w-full h-auto p-4 flex items-center border-b border-gray-400">
                      <span>
                        Card Payment
                        <input name='paymentMethod' value="stripe" type="radio" onChange={(e) => setPayment({ ...payment, paymentMethod: e.target.value })} />
                      </span>
                    </div>
                    {paymentError.paymentMethodError && <p style={{ color: 'red' }}>{paymentError.paymentMethodError}</p>}

                    {(paymentMethod == 'stripe') && (
                      <div>
                        <div className="w-full h-auto p-4">

                          <div className="mb-4 px-3 py-1 bg-white rounded-sm border border-gray-300 focus-within:text-gray-900 focus-within:border-gray-500">
                            <label htmlFor="cc-name" className="text-xs tracking-wide uppercase font-semibold">Name on card</label>
                            <input id="cc-name" type="text" name="cardHolderName" className="w-full h-8 focus:outline-none" placeholder="e.g. John E Cash"
                              value={payment.cardHolderName}
                              onChange={checkOutPaymentChange} />
                            {paymentError.cardHolderName && <p style={{ color: 'red' }}>{paymentError.cardHolderName}</p>}
                          </div>

                          <div className="mb-4 px-3 py-1 bg-white rounded-sm border border-gray-300 focus-within:text-gray-900 focus-within:border-gray-500" />
                          <label htmlFor="cc-number" className="text-xs tracking-wide uppercase font-semibold">Card number</label>
                          <input id="cc-number" type="number" name="cardNumber" className="w-full h-8 focus:outline-none" placeholder="16-digit card number"
                            value={payment.cardNumber}
                            onChange={checkOutPaymentChange} />
                          {paymentError.cardNumber && <p style={{ color: 'red' }}>{paymentError.cardNumber}</p>}
                        </div>

                        <div className="flex mb-4 px-3 py-1 bg-white rounded-sm border border-gray-300 focus-within:border-gray-500" />
                        <div className="w-full focus-within:text-gray-900">
                          <label htmlFor="" className="text-xs tracking-wide uppercase font-semibold">Card expiry</label>
                          <input id="cc-expiry" type="text" name='cardExpiry' className="w-full h-8 focus:outline-none" placeholder="MM / YYYY"
                            value={payment.cardExpiry}
                            onChange={checkOutPaymentChange} />
                          {paymentError.cardExpiry && <p style={{ color: 'red' }}>{paymentError.cardExpiry}</p>}
                        </div>

                        <div className="w-auto focus-within:text-gray-900">
                          <label htmlFor="" className="text-xs tracking-wide uppercase font-semibold">CVV</label>
                          <input id="cc-cvv" type="text" name='cardCvc' className="w-full h-8 focus:outline-none"
                            value={payment.cardCvc}
                            onChange={checkOutPaymentChange} />
                          {paymentError.cardCvc && <p style={{ color: 'red' }}>{paymentError.cardCvc}</p>}
                        </div>
                      </div>

                    )}

                  </div>
                </div>
              </div>

              <div className="form-group">
                <button
                  type='submit'
                >Confirm Payment</button>
              </div>

            </form>
          </div>
        </Fragment>
      )}
    </Fragment >
  )
}

export default Checkout