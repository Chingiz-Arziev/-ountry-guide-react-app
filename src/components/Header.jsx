import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { IoMoon, IoSunnyOutline } from "react-icons/io5";

import { Container } from "./Container";

const HeaderElement = styled.div`
  box-shadow: var(--shadow);
  background-color: var(--colors-ui-base);
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 0;
`;

const Title = styled.a.attrs({
  href: "/",
})`
  color: var(--colors-text);
  font-size: var(--fs-sm);
  text-decoration: none;
  font-weight: var(--fw-bold);
`;

const ModeSwitcher = styled.div`
  color: var(--colors-text);
  font-size: var(--fs-sm);
  font-weight: var(--fw-bold);
  cursor: pointer;
  text-transform: capitalize;
`;

export const Header = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <HeaderElement>
      <Container>
        <Wrapper>
          <Title>Hello World</Title>
          <ModeSwitcher onClick={toggleTheme}>
            {theme === "light" ? (
              <IoMoon size="1rem" />
            ) : (
              <IoSunnyOutline size="1rem" />
            )}
            <span style={{ marginLeft: "1rem" }}>Light Theme</span>
          </ModeSwitcher>
        </Wrapper>
      </Container>
    </HeaderElement>
  );
};
