import "./AuthPage.css";
import logo from "../../assets/images/logo.png";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import useSignup from "../../Hooks/useSignup";
import useLogin from "../../Hooks/useLogin";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useAuthContext from "../../Hooks/useAuthContext";

const AuthPage = () => {
  const [isLogin,setIsLogin] = useState(true);
  
  const [pass,setPass] = useState();
  const [email,setEmail] = useState();
  const [uname,setUname] = useState();

  const {signup,loading:su_loading,error:su_error} = useSignup();
  const {login,loading:lo_loading,error:lo_error} = useLogin();
  const {user} = useAuthContext();

  const navigate = useNavigate();

  useEffect(()=>{
    if(user) navigate("/");
  },[user])

  const handleSubmit = (e)=>{

    e.preventDefault();

    if(isLogin)
    {
      login({pass,email});
    }
    else
    {
      signup({uname,pass,email});
    }

    e.target.reset();

  }

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
            <form onSubmit={(e)=>{handleSubmit(e)}}>
              <p className="field_title">Email</p>
              <input
                className="input_field"
                type="text"
                placeholder="Enter your email"
                onChange={(e)=>{
                  e.target.value.trim() !== "" && setEmail(e.target.value.trim());
                }}
              />
              <p className="field_title">Password</p>
              <input
                className="input_field"
                type="password"
                placeholder="Your Password"
                onChange={(e)=>{
                  e.target.value.trim() !== "" && setPass(e.target.value.trim());
                }}
              />
              {
                !isLogin && <>
                  <p className="field_title">Username</p>
                  <input
                    className="input_field"
                    type="text"
                    placeholder="Enter Username"
                    onChange={(e)=>{
                      e.target.value.trim() !== "" && setUname(e.target.value.trim());
                    }}
                  />
                </>
              }
              {su_error && <p className="error_msg">{su_error.message}</p>}
              {lo_error && <p className="error_msg">{lo_error.message}</p>}
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
