import React, { useState, useContext } from "react";
import axios from "axios";
import UserContext from "../context/UserContext";
import {
  StyledForm,
  StyledInput,
  StyledButton,
  FormWrapper,
} from "../components/formComponents";

function Reset() {
  const [email, setEmail] = useState();
  const { setUserData } = useContext(UserContext);

  const emailEntered = (e) => {
    setEmail(e.target.value);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/auth/reset", {
        email,
      });
      setUserData({
        token: res.data.token,
        user: res.data.user,
      });

      localStorage.setItem("auth-token", res.data.user.tokens.access.token);
      //   history.push("/");
      console.log("go to change password");
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <FormWrapper>
      <StyledForm onSubmit={handleSubmit}>
        <StyledInput
          type="email"
          value={email}
          onChange={(e) => emailEntered(e)}
        />
        <StyledButton type="submit" disabled={!email}>
          Reset
        </StyledButton>
      </StyledForm>
    </FormWrapper>
  );
}

export default Reset;
