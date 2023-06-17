import React from "react";

import styled from "styled-components";

const C = styled.div`
  height: auto;
  width: auto;
  border-radius: 0.5em;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  margin: 2.5em auto;
`;

function Card(props) {
  return <C>{props.children}</C>;
}

export default Card;
