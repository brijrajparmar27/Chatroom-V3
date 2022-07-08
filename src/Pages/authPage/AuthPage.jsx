import "./AuthPage.css";
import logo from "../../assets/images/logo.png";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";

const AuthPage = () => {
  const [isLogin,setIsLogin] = useState(true);
  return (
    <div className="authpage">
      <div className="branding">
        <img src={logo} alt="" />
        <h1>Chatroom</h1>
      </div>

      <div className="authcontain">
        <div className="auth_form_contain">
          <div className="auth_form">
            <h3 className="form_title">Welcome {isLogin?`Back`:``}</h3>
            <h4 className="form_subtitle">
              {isLogin?`Welcome Back! Please enter your details`:`Let's get you all set up.`}
            </h4>
            <form>
              <p className="field_title">Email</p>
              <input
                className="input_field"
                type="text"
                placeholder="Enter your email"
              />
              <p className="field_title">Password</p>
              <input
                className="input_field"
                type="password"
                placeholder="Your Password"
              />
              {
                !isLogin && <>
                  <p className="field_title">Username</p>
                  <input
                    className="input_field"
                    type="text"
                    placeholder="Enter Username"
                  />
                </>
              }
              <input
                type="submit"
                value="Sign in"
                className="form_button submit"
              />
              <button className="form_button google_submit">
                <FcGoogle style={{ fontSize: "20px" }}></FcGoogle>Sign {isLogin?`in`:`up`} with
                Google
              </button>
              <div className="form_toogle">
                <p>{isLogin?`Don't have an account?`:`Already have an account?`}</p>
                <p className="link" onClick={()=>{setIsLogin(!isLogin)}}>{isLogin?`Sign up`:`Sign in`}</p>
              </div>
            </form>
          </div>
        </div>

        <div className="illustration_contain">
          <div className="circle"></div>
          <div className="normal"></div>
          <div className="blur"></div>
        </div>
        
      </div>
    </div>
  );
};

export default AuthPage;
