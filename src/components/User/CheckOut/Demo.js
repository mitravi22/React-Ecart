import React, { Fragment, useState } from 'react'
import { getCartItems } from "../../../action/CartAction"
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';

const Demo = () => {

  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart)
  const cartData = cartItems && cartItems.length > 0 ? cartItems[0]?.CartItems : null

  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep(step + 1);
  };


  const prevStep = () => {
    setStep(step - 1);
  };

  return (
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

      <div>
        {step === 1 && (
          <Step1 />
        )}

        {step === 2 && (
          <Step2 />
        )}

        {step === 2 ? (
          <div> <button>Submit</button>
            <button>Submit</button></div>

        ) : (
          <button onClick={nextStep}>Next</button>
        )}
      </div>
    </Fragment>
  )
}

const Step1 = ({ step, setStep, nextStep }) => {

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

  const { firstName, lastName, email, phone, address1, address2, countryCode, country, state, city, postcode } = user;

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

    setFormErrors(errors);
    return isValid;
  };

  const handleCheckout = (e) => {
    e.preventDefault();

    const myForm = new FormData()

    myForm.set("firstName", firstName)
    myForm.set("lastName", lastName)
    myForm.set("email", email)
    myForm.set("phone", phone)
    myForm.set("address1", address1)
    myForm.set("countryCode", countryCode)
    myForm.set("country", country)
    myForm.set("state", state)
    myForm.set("city", city)
    myForm.set("postcode", postcode)

    validateForm()
  }

  const [showForm, setShowForm] = useState(false);

  const handleCheckbox = (e) => {
    setShowForm(e.target.checked);
  };

  const checkOutDataChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  return (
    <div>
      <div className="tab-pane" id="check-out">
        <form onSubmit={handleCheckout}>
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
                    {formErrors.postcode && <p style={{ color: 'red' }}>{formErrors.postcode}</p>}

                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="form-group">
            <button >Next</button>
          </div>
        </form>
      </div>
    </div>

  );
};

const Step2 = (handleCheckout) => {
  return (
    <div>
      <form onSubmit={handleCheckout}>
        <div className="col-md-6 col-sm-6 col-xs-12">
          <div className="payment-method mt-60  pl-20">
            <h4 className="title-1 title-border text-uppercase mb-30">payment method</h4>

            <div className="w-96 mx-auto border border-gray-400 rounded-lg">
              <div className="w-full h-auto p-4 flex items-center border-b border-gray-400">
                <h1 className="w-full">Card Payment</h1>
              </div>
              <div className="w-full h-auto p-4">

                <div className="mb-4 px-3 py-1 bg-white rounded-sm border border-gray-300 focus-within:text-gray-900 focus-within:border-gray-500">
                  <label htmlFor="cc-name" className="text-xs tracking-wide uppercase font-semibold">Name on card</label>
                  <input id="cc-name" type="text" name="cc-name" className="w-full h-8 focus:outline-none" placeholder="e.g. John E Cash" />
                </div>

                <div className="mb-4 px-3 py-1 bg-white rounded-sm border border-gray-300 focus-within:text-gray-900 focus-within:border-gray-500" />
                <label htmlFor="cc-number" className="text-xs tracking-wide uppercase font-semibold">Credit card number</label>
                <input id="cc-number" type="text" name="cc-number" className="w-full h-8 focus:outline-none" placeholder="16-digit card number" />
              </div>

              <div className="flex mb-4 px-3 py-1 bg-white rounded-sm border border-gray-300 focus-within:border-gray-500" />
              <div className="w-full focus-within:text-gray-900">
                <label htmlFor="" className="text-xs tracking-wide uppercase font-semibold">Card expiry</label>
                <input id="cc-expiry" type="text" className="w-full h-8 focus:outline-none" placeholder="MM / YYYY" />
              </div>

              <div className="w-auto focus-within:text-gray-900">
                <label htmlFor="" className="text-xs tracking-wide uppercase font-semibold">CVV</label>
                <input id="cc-cvv" type="text" className="w-full h-8 focus:outline-none" maxLength={10} />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>

  );
};

export default Demo