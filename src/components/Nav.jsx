import { Navbar, NavItem, NavLink } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import styled from "styled-components";

const LeftNavContainer = styled.div`
  margin-left: auto;
  display: flex;
`;

const Nav = () => {
  const [state, setState] = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    setState({ data: null, loading: false, error: null });
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <Navbar>
      <NavItem>
        <Link to="/" className="nav-link">
          Home
        </Link>
      </NavItem>

      {state.data && (
        <>
          <NavItem>
            <Link to="/articles" className="nav-link">
              Article
            </Link>
          </NavItem>
          {state?.data && state?.data?.email === "jain00prince@gmail.com" ? (
            <NavItem>
              <Link to="/add-article" className="nav-link">
                Add Article
              </Link>
            </NavItem>
          ) : (
            ""
          )}
          <NavItem>
            <Link to="/subscription-plans" className="nav-link">
              Plans
            </Link>
          </NavItem>

          <LeftNavContainer>
            <NavItem>
              <NavLink>{state?.data && state?.data?.name}</NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={handleLogout}>Logout</NavLink>
            </NavItem>
          </LeftNavContainer>
        </>
      )}
    </Navbar>
  );
};

export default Nav;
