import { ArrowDropDown, Notifications, Search } from "@material-ui/icons";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

import "../layouts/scss/NavbarMenu.scss"
const NavbarMenu = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  const {
		authState: {
			user: { username, Avatar },
      
		},
		logoutUser
	} = useContext(AuthContext)

 

	const logout = () => logoutUser()

  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
      <div className="container1">
        <div className="left">
          <img
            src="https://www.freelogoservices.com/api/main/images/1j+ojVNGOMkX9W2+J1iwiGKshvKEpRZJnQiIiWcqL2VE9AlvlyQvhPFj...Q=="
            alt=""
          />
          <Link to="/" className="link">
            <span>Homepage</span>
          </Link>
         
          <Link to="/movies" className="link">
            <span className="navbarmainLinks">category</span>
          </Link>
          <span>New and Popular</span>
        </div>
        <div className="right">
          <Search className="icon" />
          <span>{username}</span>
          <Notifications className="icon" />
          <img
            src={Avatar}
            alt=""
          />
          <div className="profile">
            <ArrowDropDown className="icon" />
            <div className="options">
            <Link to="/setting" >
            <span >Setting</span>
            </Link>
              <span onClick={logout}>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarMenu;