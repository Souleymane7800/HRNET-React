import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import logo from '../assets/logo.jpg'; // Adjust the path according to your directory structure

// Define a styled header container
const HeaderContainer = styled.header`
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 2rem;
      background-color: #29712c;
      color: white;
`;

// Define a styled container for the logo and subtitle
const LogoContainer = styled.div`
      display: flex;
      flex-direction: column;
      align-items: center;
`;

// Define a styled logo
const Logo = styled.img`
      height: 70px;
      border-radius: 50%;
`;

// Define a styled subtitle
const Subtitle = styled.h2`
      font-size: 1.5rem;
      margin-top: 0.5rem;
`;

// Define a styled title
const Title = styled.h1`
      font-size: 2.5rem;
      margin: 0;
`;

// Define a styled link
const StyledLink = styled(Link)`
      color: white;
      text-decoration: none;
      font-size: 1.2rem;
      margin-left: 0rem;

      &:hover {
            text-decoration: underline;
      }
`;

const Header: React.FC = () => {
      return (
            <HeaderContainer>
                  <LogoContainer>
                        <Logo src={logo} alt='Logo' />{' '}
                        <Subtitle>Wealth Health</Subtitle>{' '}
                  </LogoContainer>
                  <div>
                        <Title>HRNet</Title>
                        <StyledLink to='/employee-list'>
                              View employee list
                        </StyledLink>{' '}
                  </div>
            </HeaderContainer>
      );
};

export default Header;
