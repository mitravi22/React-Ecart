import { React, useState, useEffect, Fragment, useRef } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import Loader from "../layout/Loader"
import { useDispatch, useSelector } from 'react-redux';
import { contactUsAction } from '../../../action/ContactUsAction';
import { useAlert } from 'react-alert';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactUs = () => {

  const alert = useAlert()
  const dispatch = useDispatch()
  const { error, loading, contactUs } = useSelector((state) => state.contactUs)

  const captchaRef = useRef(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [messaged, setMessage] = useState('');
  const [subject, setSubject] = useState('');

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    messaged: "",
    subject: "",
  });

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!name?.trim()) {
      errors.name = "Name is required";
      isValid = false;
    } else if (!/^[A-Za-z]{3,29}$/.test(name)) {
      errors.name = "Only alphabet is allowed and atleast fill three letter"
      isValid = false
    }

    if (!email?.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Invalid email address";
      isValid = false;
    }

    if (!subject?.trim()) {
      errors.subject = "Subject is required";
      isValid = false;
    } else if (!/^[^\s][a-zA-Z0-9\s]+$/.test(subject)) {
      isValid = false
    }

    if (!messaged?.trim()) {
      errors.messaged = "Message is required";
      isValid = false;
    } else if (!/^[^\s][a-zA-Z0-9\s]+$/.test(messaged)) {
      isValid = false
    }
    setFormErrors(errors);
    return isValid;
  };

  const handleContactUs = (e) => {
    e.preventDefault();

    if (validateForm()) {
      dispatch(contactUsAction(email, name, messaged));
      toast.success('Contact Us created successfully!', {
        position: "top-right",
        autoClose: 3000, // time in milliseconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,

      });     
    }

  }

  useEffect(() => {
    if (error) {
      alert.error(error)
    }
  }, [dispatch, error, alert])
  return (
    <div>
      {loading ? <Loader /> : <Fragment>
        <section id="contact" className="contact">
          <div className="container" data-aos="fade-up">

            <div className="section-title text-center">
              <h2>Contact</h2>
              <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.</p>
            </div>

            <div className="row">

              <div className="col-lg-5 d-flex align-items-stretch">
                <div className="info">
                  <div className="address">
                    <i className="bi bi-geo-alt"></i>
                    <h4>Location:</h4>
                    <p>A108 Adam Street, New York, NY 535022</p>
                  </div>

                  <div className="email">
                    <i className="bi bi-envelope"></i>
                    <h4>Email:</h4>
                    <p>info@example.com</p>
                  </div>

                  <div className="phone">
                    <i className="bi bi-phone"></i>
                    <h4>Call:</h4>
                    <p>+1 5589 55488 55s</p>
                  </div>

                  <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12097.433213460943!2d-74.0062269!3d40.7101282!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb89d1fe6bc499443!2sDowntown+Conference+Center!5e0!3m2!1smk!2sbg!4v1539943755621"

                    style={{ border: 0 }}
                    width="100%"
                    height="290px"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade">
                  </iframe>
                </div>

              </div>

              <div className="col-lg-7 mt-5 mt-lg-0 d-flex align-items-stretch">
                <form onSubmit={handleContactUs} className="php-email-form">
                  <div className="row">
                    <div className="form-group col-md-6">
                      <label htmlFor="name">Your Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)} />
                      {formErrors.name && <div style={{ color: 'red' }}>{formErrors.name}</div>}
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="email">Your Email</label>
                      <input
                        type="text"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                      {formErrors.email && <div style={{ color: 'red' }}>{formErrors.email}</div>}
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="name">Subject</label>
                    <input type="text"
                      className="form-control"
                      name="subject"
                      id="subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)} />
                    {formErrors.subject && <div style={{ color: 'red' }}>{formErrors.subject}</div>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="name">Message</label>
                    <textarea
                      className="form-control"
                      name="message"
                      rows="10"
                      value={messaged}
                      onChange={(e) => setMessage(e.target.value)}></textarea>
                    {formErrors.messaged && <div style={{ color: 'red' }}>{formErrors.messaged}</div>}
                  </div>
                  <div>
                  <ReCAPTCHA sitekey="6Ldy-JQlAAAAAENYCJjXD_7u74_A38Gj6acFf1yS" ref={captchaRef}  />
                  {/* <ReCAPTCHA
                    sitekey="6Ldy-JQlAAAAAENYCJjXD_7u74_A38Gj6acFf1yS"
                    onChange={handleCaptchaChange}
                  /> */}
                </div>
                  <div className="text-center"><button
                    type="submit"
                    value="Submit"
                  >Send Message</button></div>
                </form>
              </div>

            </div>

          </div>
        </section>
      </Fragment>
      }
    </div>
  )
}

export default ContactUs