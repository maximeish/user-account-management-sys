import styled from "styled-components";

export const Navbar = styled.nav`
  width: 100%;
  height: 12vh;
  padding: 1em 2em;
  list-style: none;
`;

export const NavbarWrapper = styled.header`
  background-color: #7aa874;
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
`;

export const NavbarLinkWrapper = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const NavbarLink = styled.li`
  margin: 0.5em;
`;

export const Logo = styled.h2`
  font-family: "Ubuntu", sans-serif;
  font-size: large;
  margin: 0 0 0 1em;
  width: 200px;
`;
