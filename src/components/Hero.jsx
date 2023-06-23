import React from "react";
import styled from "styled-components";
import { Container } from "react-bootstrap";
import ModalComponent from "./Modal";

const HeroComponent = styled.header`
  padding: 4rem 0;
  // height: 90vh;
  background-image: url("https://images.unsplash.com/photo-1499209974431-9dddcece7f88?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2500&q=80");
  background-size: cover;
  background-position: center;
`;

const HeaderContainer = styled.div`
  background-color: rgba(5, 148, 112, 0.4);
  border-radius: 5%;
  padding: 1rem;
  color: white;
  width: 35rem;
`;

const Heading = styled.h1`
  font-size: 5rem;
`;

const SubHeading = styled.h3`
  margin: 12.5px 0;
  font-weight: 600;
  color: black;
`;

const Hero = () => {
  return (
    <HeroComponent>
      <Container>
        <HeaderContainer>
          <Heading>
            Feed your mind with the best{" "}
            <ModalComponent
              text="Signup"
              variant="primary"
              isSignupFlow={true}
            />
            <ModalComponent
              text="Login"
              variant="danger"
              isSignupFlow={false}
            />
          </Heading>

          <code>
            <SubHeading>
              Grow, learn, and become more successful by reading some of the top
              article by highly reputable individuals
            </SubHeading>
          </code>
        </HeaderContainer>
      </Container>
    </HeroComponent>
  );
};

export default Hero;
