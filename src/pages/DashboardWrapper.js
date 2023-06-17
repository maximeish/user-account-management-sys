import React, { useContext, useEffect } from "react";
import Card from "../components/Card";
import Profile from "../components/dashboardComponents";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function DashboardWrapper() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    if (!token) navigate("/");
  }, [navigate]);

  return (
    <Wrapper>
      <Card>
        <Profile />
      </Card>
    </Wrapper>
  );
}

export default DashboardWrapper;
