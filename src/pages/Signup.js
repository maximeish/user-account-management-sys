import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";
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
import PasswordStrengthBar from "react-password-strength-bar";

function Signup() {
  const [fn, setFn] = React.useState("");
  const [ln, setLn] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [cpassword, setCpassword] = React.useState("");
  const [loading, setLoading] = useState(false);
  const [pwdScore, setPwdScore] = useState(0);
  const [pwdFeedback, setPwdFeedback] = useState("");

  const { userData, setUserData } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user-data")) navigate("/dashboard");
  }, []);

  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    if (password !== cpassword) {
      setLoading(false);
      return toast.error("Passwords should match", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    console.log({
      fn,
      ln,
      email,
      password,
    });

    try {
      const res = await axios.post("http://localhost:3000/v1/auth/register", {
        fn,
        ln,
        email,
        password,
      });

      toast.success("Sign up successful", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/login");
    } catch (err) {
      setLoading(false);
      console.log(err);
      if (err.response?.data?.message) {
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
        toast.error(err.message, {
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
        <StyledLabel>First name:</StyledLabel>
        <StyledInput
          type="text"
          onChange={(e) => setFn(e.target.value)}
          value={fn}
          required
        />

        <StyledLabel>Last name:</StyledLabel>
        <StyledInput
          type="text"
          onChange={(e) => setLn(e.target.value)}
          value={ln}
          required
        />

        <StyledLabel>Email:</StyledLabel>
        <StyledInput
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
        <StyledLabel>Password:</StyledLabel>
        <small>{pwdFeedback.warning}</small>
        <StyledInput
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        {/* <small style={{ marginTop: "-1.5em" }}>
          {pwdFeedback.suggestions !== undefined &&
            pwdFeedback.suggestions[0]}
        </small> */}
        <PasswordStrengthBar
          style={{ marginTop: "-1em" }}
          password={password}
          minLength={8}
          scoreWords={["weak", "better", "okay", "good", "strong"]}
          onChangeScore={(s, f) => {
            console.log(f);
            setPwdScore(s);
            setPwdFeedback(f);
          }}
        />

        <StyledLabel>Confirm Password:</StyledLabel>
        <StyledInput
          type="password"
          onChange={(e) => setCpassword(e.target.value)}
          value={cpassword}
          required
        />
        <PasswordStrengthBar
          style={{ marginTop: "-1em" }}
          password={cpassword}
          minLength={8}
        />

        <Div>
          <StyledButton
            type="submit"
            disabled={
              !fn || !ln || !cpassword || !password || !email || pwdScore <= 0
            }
          >
            Sign up
          </StyledButton>
          <PuffLoader color="#36d7b7" loading={loading} />
        </Div>
      </StyledForm>
      <FormTextWrapper>
        Already have an account? <Link to="/login">Log in</Link>
      </FormTextWrapper>
    </FormWrapper>
  );
}

export default Signup;
