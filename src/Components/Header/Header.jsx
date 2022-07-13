import useLogout from "../../Hooks/useLogout";
import logo from "../../assets/images/logo.png";
import avatar from "../../assets/images/avatar.svg";
import { useRef, useState } from "react";
import "./Header.css";
import { useEffect } from "react";
import useDP from "../../Hooks/useDP";
import { storage } from "../../Firebase/config";

const Header = ({ user }) => {
  const { logout } = useLogout();
  const [showPopup, setShowPopup] = useState(false);
  const [image, setImage] = useState(null);
  const { updateProfilePic, progress } = useDP();
  const [url, setUrl] = useState(
    user && user.photoURL ? user.photoURL : avatar
  );

  const inputFile = useRef(null);

  const onButtonClick = () => {
    inputFile.current.click();
  };

  const onUploadComplete = (url) => {
    setUrl(url);
  };

  const handleImageChange = async (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      updateProfilePic(e.target.files[0], user, {
        onComplete: onUploadComplete,
      });
    }
  };

  return (
    <div className="header">
      <div className="branding">
        <img src={logo} alt="" />
        <h1>Chatroom</h1>
      </div>

      <div className="user_profile_contain">
        {progress && (
          <div className="progress_bar">
            <div
              className="progress_completed"
              style={{ flex: `${progress}` }}
            ></div>
          </div>
        )}
        <div className="dp_container">
          <img
            src={url}
            className="user_avatar"
            onClick={() => {
              setShowPopup((prev) => !prev);
            }}
          />
        </div>
        {/* {user && user.photoURL && console.log(user.photoURL)} */}
        <h2
          className="user_name"
          onClick={() => {
            setShowPopup((prev) => !prev);
          }}
        >
          {user && user.displayName}
        </h2>
        {showPopup && (
          <div
            className="backdrop"
            onClick={() => {
              setShowPopup((prev) => !prev);
            }}
          ></div>
        )}
        {showPopup && (
          <div className="popup">
            <p className="popup_option" onClick={onButtonClick}>
              Change Photo
            </p>
            <input
              type="file"
              id="file"
              ref={inputFile}
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
            <a
              href="mailto:brijrajparmaromegab32@gmail.com"
              className="popup_option"
            >
              Report bug
            </a>
            <button className="logout_btn" onClick={logout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default Header;
