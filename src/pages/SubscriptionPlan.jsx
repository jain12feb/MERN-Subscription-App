import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import styled from "styled-components";
import { Card, Button } from "react-bootstrap";

const NoArticlesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-direction: column;

  & a {
    font-size: 2rem;
    text-decoration: none;
  }
`;

const ErrorHeader = styled.h2`
  font-size: 3rem;
`;

const CardsContainer = styled.div`
  display: flex;
  height: 75vh;
  align-items: center;
  justify-content: center;
`;

const CardHeader = styled.div`
  height: 30rem;
  padding: 1rem;
  background-color: blue;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PriceCircle = styled.div`
  border: 0.5rem solid white;
  width: 15rem;
  height: 15rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0.1rem 0.1rem 1rem rgba(19, 20, 19, 0.342);
`;

const PriceText = styled.p`
  font-size: 3rem;
  color: white;
  text-shadow: 0.1rem 0.1rem 1rem rgba(19, 20, 19, 0.342);
`;

const SubscriptionPlan = () => {
  const [prices, setPrices] = useState([]);
  const [plan, setPlan] = useState("");
  const [planMsg, setPlanMsg] = useState("");

  useEffect(() => {
    fetchPrices();
  }, []);

  const fetchPrices = async () => {
    const { data } = await axios.get("/api/v1/subscriptions");
    console.log(data);
    if (data.success) {
      setPrices(data?.prices?.data.reverse());
    } else {
      console.log(data.error);
    }
  };

  const fetchPlan = async () => {
    const { data } = await axios.get("/api/v1/articles");
    if (data?.plan) {
      setPlan(data?.plan);
    }
    setPlanMsg(data?.message);
  };

  const createSession = async (priceId) => {
    const { data } = await axios.post("/api/v1/stripe-session", {
      priceId,
    });

    window.location.href = data?.session?.url;
  };

  const backgroundColors = {
    Basic: "rgb(104, 219, 104)",
    Standard: "rgb(185, 42, 23, 0.835)",
    Premium: "#b75fdd",
  };

  useEffect(() => {
    fetchPlan();
  }, []);

  return (
    <Container>
      <NoArticlesContainer>
        <ErrorHeader>{planMsg}</ErrorHeader>
        {/* <Link to="/subscription-plans">Renew</Link> */}
      </NoArticlesContainer>
      <CardsContainer>
        {prices // .filter((p) => {
          //   return p.nickname !== plan;
          // })
          .map((price) => {
            return (
              <Card
                key={price.id}
                style={{
                  width: "18rem",
                  height: "25rem",
                  marginRight: "2.5rem",
                }}
              >
                {price.nickname === "Standard" && (
                  <span
                    className="badge position-absolute top-0 start-50 translate-middle p-1"
                    style={{
                      backgroundColor: "black",
                    }}
                  >
                    Top Selling
                  </span>
                )}
                <CardHeader
                  style={{ backgroundColor: backgroundColors[price.nickname] }}
                >
                  <PriceCircle>
                    {/* <PriceText>${price.unit_amount / 100}</PriceText> */}
                    <PriceText>{price.nickname}</PriceText>
                  </PriceCircle>
                </CardHeader>
                <Card.Body>
                  <Card.Title
                    style={{ fontSize: "2rem", textDecoration: "underlined" }}
                  >
                    ₹{price.unit_amount / 100}
                    <del style={{ fontSize: "1.5rem", marginLeft: ".5em" }}>
                      ₹{price.unit_amount / 100 + 20}
                    </del>{" "}
                  </Card.Title>
                  <Button
                    variant="primary"
                    className="mt-2"
                    onClick={() => createSession(price.id)}
                    disabled={price.nickname === plan ? true : false}
                  >
                    {plan && price.nickname !== plan ? "Upgrade" : "Buy now"}
                  </Button>
                  {price.nickname === plan ? (
                    <span
                      className="badge"
                      style={{
                        backgroundColor: "#7a75d5",
                        marginLeft: "5rem",
                        verticalAlign: "sub",
                        height: "1.5rem",
                        paddingTop: "5px",
                      }}
                    >
                      Current Plan
                    </span>
                  ) : (
                    ""
                  )}
                </Card.Body>
              </Card>
            );
          })}
      </CardsContainer>
    </Container>
  );
};

export default SubscriptionPlan;
