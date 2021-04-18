import React from 'react';
import { NavLink } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import './Header.scss';
Header.propTypes = {};

function Header(props) {
  return (
    <header className="header">
      <Container>
        <Row className="justify-content-between">
          <Col xs="auto">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="header__link header__title"
            >
              Photo App
            </a>
          </Col>

          <Col xs="auto">
            <NavLink className="header__link" to="/sign-in" activeClassName="header__link--active">
              Redux Project
            </NavLink>
          </Col>
        </Row>
      </Container>
    </header>
  );
}

export default Header;
