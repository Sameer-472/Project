import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useURL from "../../Hooks/useURL";
import routes from "../../routes/routes";
import { getUser, login } from '../../Services/Auth';
import { getAccessToken } from "../../Util/helpers";

export default function Login() {
  const navigate = useNavigate();
  let { params } = useURL();
  let form = useRef({
    email: null,
    password: null,
  });
  // on submit call login service
  const submit = useCallback(async (e) => {
    e.preventDefault();

    let data = await login(form.current);
    if (data?.token) {
      if (params?.return) {
        window.location.href = params?.return;
        return;
      }
      window.location.reload();
    }
  });

  return (
    <>
      <section className="login">
        <div className="container">
          <div className="row py-5 align-items-center justify-content-center">
            <div className="col-lg-6 col-md-7 col-sm-8 col-11 mx-auto text-start">
              <h1 className="heading-lvl-one">Login</h1>
              <p>Login To Your Account</p>
              <form onSubmit={(e) => submit(e)} id="cut-form" className="my-md-5 my-3">
                {/* email */}
                <div className="form-group mb-5">
                  <label className="ps-sm-4 ps-2" htmlFor="loginEmail">Email Address <span className="red">*</span></label>
                  <input type="email" value={form.email} onChange={(e) => form.current.email = e.target.value} className="form-control mt-2 form-field" id="loginEmail" placeholder="Enter Email Address" />
                </div>
                {/* password */}
                <div className="form-group mb-3">
                  <label className="ps-sm-4 ps-2" htmlFor="inputPassword">Password <span className="red">*</span></label>
                  <div className="position-relative">
                    <input type="password" value={form.password} onChange={(e) => form.current.password = e.target.value} className="form-control mt-2 form-field pass-input" id="inputPassword" placeholder="Enter Password" />
                    <i className="fa fa-eye-slash toggle-icon" aria-hidden="true" />
                  </div>
                </div>
                {/* remember me and reset password */}
                <div className="row justify-content-between">
                  <div className="col-6">
                    <div className="form-group form-check">
                      <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                      <label className="form-check-label" htmlFor="exampleCheck1">Remember me</label>
                    </div>
                  </div>
                  <div className="col-6 text-end">
                    <Link to='/password-recovery/verify' className="green-link">Reset Your Password?</Link>
                  </div>
                </div>
                <button type="submit" className="gold-btn-solid d-inline-block mt-4 eq-width-btn text-center">Login</button>
                <Link to={routes.signup} className="silver-link d-block mt-4">Not a User? Sign Up Now</Link>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};