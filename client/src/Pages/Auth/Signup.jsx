import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validator from "validatorjs";
import Validation from "../../Hooks/useValidation";
import { register } from "../../Services/Auth";
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import routes from "../../routes/routes";

export default function Signup() {
  const navigate = useNavigate();
  const [validation, setValidation] = useState({});
  let form = useRef({
    email: null,
    password: null,
    password_confirmation: null,
    name: null,
    phone_no: null,
    user_image: null,
    cnic_image_front: null,
    cnic_image_back: null,
  });
  // form validation 

  const submit = useCallback(async (e) => {
    e.preventDefault();
    const validator = new Validator(form.current, {
      email: 'required',
      password: 'required|confirmed',
      password_confirmation: 'required',
      name: 'required',
      phone_no: 'required',
      user_image: "required",
      cnic_image_front: "required",
      cnic_image_back: "required",
    });

    setValidation(validator);
    if (validator.fails()) return;
    console.log(40, form.current);
    let data = await register({ ...form.current });
    console.log(42, data);
    if (data.status) {
      navigate('/login');
    }
  });
  return (
    <section className="signup">
      <div className="container">
        <div className="row py-5  align-items-center justify-content-center">
          <div className="col-lg-6 col-md-7 col-sm-8 col-8 mx-auto text-start">
            <h1 className="heading-lvl-one">Sign Up</h1>
            <p className="font-weight-light">Fill This Form To Create An Account!</p>
            <form onSubmit={submit} id="cut-form" className="my-md-5 my-3">
              <div className="row justify-content-between align-items-start">
                <div className="col-lg-6">
                  {/* Full Name */}
                  <div className="form-group mb-4">
                    <label className="ps-md-4" htmlFor="signupName">Full Name <span className="red">*</span></label>
                    <input type="text" name="name" value={form.name} onChange={(e) => form.current.name = e.target.value} className="form-control mt-2 form-field" id="signupName" placeholder="Enter Full Name" />
                    <span>{validation.errors?.first('name')}</span>
                  </div>
                </div>
                <div className="col-lg-6">
                  {/* Email Address */}
                  <div className="form-group mb-4">
                    <label className="ps-md-4" htmlFor="signupEmail">Email Address <span className="red">*</span></label>
                    <input type="email" name="email" value={form.email} onChange={(e) => form.current.email = e.target.value} className="form-control mt-2 form-field" id="signupEmail" placeholder="Enter Email Address" />
                    <span>{validation.errors?.first('email')}</span>
                  </div>
                </div>
              </div>
              {/* Phone Number*/}
              <div className="form-group mb-4">
                <label className="ps-md-4" htmlFor="signupNumber">Phone Number <span className="red">*</span></label>
                {/* <input type="tel" name="phone" value={form.phone} onChange={(e)=> form.current.phone = e.target.value} pattern="[+]{1}[0-9]{11,14}" className="form-control mt-2 form-field" id="signupNumber" placeholder="Enter Phone Number" /> */}
                <PhoneInput
                  className="form-control mt-2 form-field"
                  id="signupNumber"
                  placeholder="Enter Phone Number"
                  value={form.phone_no}
                  country={"US"}
                  onChange={(e) => form.current.phone_no = e}
                />
                <span>{validation?.errors?.first('phone_no')}</span>
              </div>
              <div className="row justify-content-between align-items-center">
                <div className="col-lg-6">
                  {/* Password */}
                  <div className="form-group mb-4">
                    <label className="ps-md-4" htmlFor="signupPassword">Password<span className="red">*</span></label>
                    <div className="position-relative">
                      <input name="password" type="password" value={form.password} onChange={(e) => form.current.password = e.target.value} className="form-control mt-2 form-field signupPassword" id="signupPassword" placeholder="Enter Password" />
                      <i className="fa fa-eye-slash signupPass" />
                    </div>
                    <span>{validation?.errors?.first('password')}</span>
                  </div>
                </div>
                <div className="col-lg-6">
                  {/* Confirm Password */}
                  <div className="form-group mb-4">
                    <label className="ps-md-4" htmlFor="signupPasswordConfirm">Confirm Password <span className="red">*</span></label>
                    <div className="position-relative">
                      <input type="password" value={form.password_confirmation} onChange={(e) => form.current.password_confirmation = e.target.value} className="form-control mt-2 form-field signupPasswordConfirm" id="signupPasswordConfirm" placeholder="Confirm Password" />
                      <i className="fa fa-eye-slash signupPassConfirm" />
                    </div>
                    <span>{validation?.errors?.first('password_confirmation')}</span>
                  </div>
                </div>
              </div>
              <div className="row justify-content-between align-items-center">
                <div className="col-lg-12">
                  {/* user image */}
                  <div className="form-group mb-4">
                    <label className="ps-md-4" htmlFor="userImage">User Image <span className="red">*</span></label>
                    <div className="position-relative">
                      <input
                        className="form-control mt-2 form-field singupUserImage" id="userImage"
                        name="userImage"
                        type="file"
                        accept="image/png, image/jpeg, image/svg"
                        value={form.user_image}
                        onChange={(e) => form.current.user_image = e.target.files[0]}
                      />
                    </div>
                    <span>{validation?.errors?.first('user_image')}</span>
                  </div>
                </div>
              </div>
              <div className="row justify-content-between align-items-center">
                <div className="col-lg-12">
                  {/* user cnic image front */}
                  <div className="form-group mb-4">
                    <label className="ps-md-4" htmlFor="userCnicFrontImage">CNIC Front Image<span className="red">*</span></label>
                    <div className="position-relative">
                      <input
                        className="form-control mt-2 form-field singupUserCnicFrontImage"
                        id="userCnicFrontImage"
                        name="userCnicFrontImage"
                        type="file"
                        value={form.cnic_image_front}
                        onChange={(e) => form.current.cnic_image_front = e.target.files[0]}
                      />
                    </div>
                    <span>{validation?.errors?.first('cnic_image_front')}</span>
                  </div>
                </div>
              </div>
              <div className="row justify-content-between align-items-center">
                <div className="col-lg-12">
                  {/* user cnic image back */}
                  <div className="form-group mb-4">
                    <label className="ps-md-4" htmlFor="userCnicBackImage">CNIC Back Image<span className="red">*</span></label>
                    <div className="position-relative">
                      <input
                        className="form-control mt-2 form-field singupUserCnicBackImage"
                        id="userCnicBackImage"
                        type="file" value={form.cnic_image_back}
                        name="userCnicBackImage"
                        onChange={(e) => form.current.cnic_image_back = e.target.files[0]}
                      />
                    </div>
                    <span>{validation?.errors?.first('cnic_image_back')}</span>
                  </div>
                </div>
              </div>
              <button type="submit" className="gold-btn-solid d-inline-block mt-4 eq-width-btn">Signup</button>
              <Link to={routes.login} className="silver-link d-block mt-4">Already have an account? Login</Link>
            </form>
          </div>
        </div>
      </div>
    </section>

  );
}
