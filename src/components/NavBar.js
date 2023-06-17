import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import UserContext from "../context/UserContext";

import {
  NavbarWrapper,
  Logo,
  Navbar,
  NavbarLink,
  NavbarLinkWrapper,
} from "../styles/NavBar";

function NavBar() {
  const { user } = useContext(UserContext);
  const token = localStorage.getItem("auth-token");
  const navigate = useNavigate();

  const path = window.location.pathname;

  console.log("path", path);

  if (!token) {
    return (
      <>
        {path !== "/login" && path !== "/signup" && (
          <NavbarWrapper>
            <Logo>App</Logo>
            <Navbar>
              <NavbarLinkWrapper>
                <NavbarLink>
                  <Link
                    to="/login"
                    style={{
                      textDecoration: "none",
                      opacity: 0.75,
                      color: "#fff",
                    }}
                    onClick={() => {
                      navigate("/");
                    }}
                  >
                    Log In
                  </Link>
                </NavbarLink>
              </NavbarLinkWrapper>
            </Navbar>
          </NavbarWrapper>
        )}
      </>
    );
  }

  return (
    <>
      {path !== "/login" && path !== "/signup" && (
        <NavbarWrapper>
          <Logo>App</Logo>
          <Navbar>
            <NavbarLinkWrapper>
              <NavbarLink
                style={{
                  textDecoration: "none",
                  opacity: 0.9,
                  color: "#fff",
                  marginRight: "2em",
                }}
              >
                Profile
              </NavbarLink>
              <NavbarLink>
                <Link
                  to="/"
                  style={{
                    textDecoration: "none",
                    opacity: 0.75,
                    color: "#fff",
                  }}
                  onClick={() => {
                    localStorage.removeItem("auth-token");
                    localStorage.removeItem("refresh-token");
                    localStorage.removeItem("user-data");
                    window.location.reload();
                  }}
                >
                  Log Out
                </Link>
              </NavbarLink>
            </NavbarLinkWrapper>
          </Navbar>
        </NavbarWrapper>
      )}
    </>
  );
}

export default NavBar;
