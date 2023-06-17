import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import UserContext from "../context/UserContext";
import { useNavigate, Link } from "react-router-dom";
import {
  StyledForm,
  StyledInput,
  StyledButton,
  StyledAlert,
  StyledLabel,
  StyledTitle,
  Div,
  FormWrapper,
  FormTextWrapper,
} from "../components/formComponents";
import { toast } from "react-toastify";
import { PuffLoader } from "react-spinners";

function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordInvalid] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { userData, setUserData } = useContext(UserContext);

  useEffect(() => {
    if (localStorage.getItem("user-data")) navigate("/dashboard");
  }, []);

  const emailEntered = (e) => {
    setEmail(e.target.value);
  };

  const passwordEntered = (e) => {
    setPassword(e.target.value);
  };

  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/v1/auth/login", {
        email,
        password,
      });

      console.log("logged in", res.data);
      localStorage.setItem("auth-token", res.data.tokens.access.token);
      localStorage.setItem("user-data", JSON.stringify(res.data.user));
      localStorage.setItem("refresh-token", res.data.tokens.refresh.token);
      setUserData({
        token: res.data.tokens,
        user: res.data.user,
      });

      toast.success("Log in successful", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
      });

      navigate("/dashboard");
    } catch (err) {
      setLoading(false);
      console.log(err);
      if (err.response?.status === 401) {
        toast.error(err.response.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error(err?.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "light",
        });
      }
    }
  }
  return (
    <FormWrapper>
      <StyledForm onSubmit={handleSubmit}>
        <StyledTitle>Account Management</StyledTitle>
        <StyledLabel>Email:</StyledLabel>
        <StyledInput
          type="text"
          value={email}
          onChange={(e) => emailEntered(e)}
        />
        <StyledLabel invalid={passwordInvalid}>Password:</StyledLabel>
        <StyledInput
          type="password"
          value={password}
          onChange={(e) => passwordEntered(e)}
        />
        {passwordInvalid && <StyledAlert>Password is invalid.</StyledAlert>}
        <Div>
          <StyledButton type="submit" disabled={!password || !email}>
            Log in
          </StyledButton>
          <PuffLoader color="#36d7b7" loading={loading} />
        </Div>
      </StyledForm>
      <FormTextWrapper>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </FormTextWrapper>
    </FormWrapper>
  );
}

export default Login;
