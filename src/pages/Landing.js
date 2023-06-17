import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Div } from "../components/formComponents";

const NotLoggedIn = styled.div`
  width: 100%;
  height: 80px;
  padding: 1em 2em;
  list-style: none;
`;

const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user-data")) navigate("/dashboard");
  }, []);

  return (
    <Div>
      <NotLoggedIn>
        Welcome to Account Management.
        <br />
        <br />
        Where App provides you with essential online services.
        <br />
        <br />
        Create an account by <Link to="/signup">signing up.</Link>
      </NotLoggedIn>
    </Div>
  );
};

export default Landing;
