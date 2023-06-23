import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { format } from "date-fns";

const CardsContainer = styled.div`
  // padding: 4rem 0;
  display: flex;
  flex-direction: column;
`;

const Card = styled.div`
  height: auto;
  width: 100%;
  box-shadow: 0.1rem 0.1rem 1rem rgba(0, 0, 0, 0.5);
  padding: 1rem 2rem;
  border-radius: 1rem;
  margin: 2rem;
`;

const Image = styled.img`
  object-fit: cover;
  border: 1px solid black;
  width: 100%;
  height: 30.5rem;
  border-radius: 2rem;
  margin-bottom: 1.5rem;
`;

const Header = styled.div`
  font-size: 2.5rem;
  text-align: center;
`;

const Tags = styled.div`
  text-align: center;
`;

const NoArticlesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20rem 0;
  flex-direction: column;

  & a {
    font-size: 2rem;
    text-decoration: none;
  }
`;

const ErrorHeader = styled.h2`
  font-size: 3rem;
`;

const Content = styled.p`
 font-size: 16px;
  line-height: 26px;
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
  
  @media screen and (min-width: 600px){ 
    font-size: 18px;
    line-height: 30px;

  // -moz-osx-font-smoothing: grayscale;
  // -webkit-font-smoothing: antialiased !important;
  // -moz-font-smoothing: antialiased !important;
  // text-rendering: optimizelegibility !important;
  // letter-spacing: 0.03em;
`;

const Articles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    const { data } = await axios.get("/api/v1/articles");
    console.log("articles data from api", data);
    setArticles(data.articles);
  };

  // const backgroundColors = {
  //   Free: "#007bff",
  //   Basic: "#dc3545",
  //   Standard: "#ffc107",
  //   Premium: "#28a745",
  // };

  const backgroundColors = {
    Free: "bg-primary",
    Basic: "bg-danger",
    Standard: "bg-warning text-dark",
    Premium: "bg-success",
  };

  return (
    <Container>
      {articles.length > 0 ? (
        <CardsContainer>
          {articles.map((article, i) => (
            <div key={i}>
              <Card className="position-relative">
                <span
                  className={
                    backgroundColors[article.access] +
                    " badge position-absolute p-2 start-50 top-0 translate-middle"
                  }
                  style={{ fontSize: "1rem" }}
                >
                  {article.access}
                </span>
                <Header>{article.title} </Header>

                <Tags className="position-relative">
                  <span
                    className="badge"
                    style={{
                      backgroundColor: "black",
                      margin: "1rem",
                    }}
                  >
                    {format(
                      new Date(article.createdAt.split("T")[0]),
                      " eeee dd MMMM, yyyy"
                    )}
                    {/* Created At : {article.createdAt.split("T")[0]} */}
                  </span>
                </Tags>
                <Image src={article.imageUrl} />
                <Content>{article.content}</Content>
              </Card>
            </div>
          ))}
        </CardsContainer>
      ) : (
        <NoArticlesContainer>
          <ErrorHeader>You don't have access yet</ErrorHeader>
          <Link to="/subscription-plans">Buy a plan</Link>
        </NoArticlesContainer>
      )}
    </Container>
  );
};

export default Articles;
