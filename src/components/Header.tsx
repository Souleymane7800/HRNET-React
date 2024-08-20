import React from 'react';
import styled from 'styled-components';
import logo from '../assets/logo.jpg'; // Adjust the path according to your directory structure

// Define a styled header container
const HeaderContainer = styled.header`
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 2rem;
      background-color: #005c12; /* Change to your preferred color */
      color: white;
`;

// Define a styled logo
const Logo = styled.img`
      height: 60px; /* Adjust the height as needed */
      border-radius: 50%;
`;

// Define a styled title
const Title = styled.h1`
      font-size: 1.5rem;
      margin: 0;
`;

const Header: React.FC = () => {
      return (
            <HeaderContainer>
                  <Logo src={logo} alt='Logo' /> {/* Use the imported logo */}
                  <Title>HRNet</Title>
            </HeaderContainer>
      );
};

export default Header;
