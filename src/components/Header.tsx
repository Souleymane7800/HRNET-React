import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faList } from '@fortawesome/free-solid-svg-icons';

const Header: React.FC = () => {
      return (
            <HeaderContainer>
                  <LogoContainer>
                        <Logo src={logo} alt='Logo' />
                        <Subtitle>Wealth Health</Subtitle>
                  </LogoContainer>
                  <Title>HRNet</Title>
                  <LinkContainer>
                        <StyledLink to='/'>
                              <FontAwesomeIcon icon={faPlus} />
                              {''} Create a new employee
                        </StyledLink>
                        <StyledLink to='/employee-list'>
                              <FontAwesomeIcon icon={faList} />
                              {''} View employee list
                        </StyledLink>
                  </LinkContainer>
            </HeaderContainer>
      );
};

export default Header;

// Define a styled header container
const HeaderContainer = styled.header`
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 2rem;
      background-color: #29712c;
      color: white;

      @media (max-width: 768px) {
            flex-direction: column;
            align-items: center;
            padding: 1rem;
            gap: 0.5rem;

            h1 {
                  font-size: 3rem;
            }
      }
`;

// Define a styled container for the logo and subtitle
const LogoContainer = styled.div`
      display: flex;
      flex-direction: column;
      align-items: center;
`;

// Define a styled logo
const Logo = styled.img`
      height: 80px;
      border-radius: 50%;
`;

// Define a styled subtitle
const Subtitle = styled.h2`
      font-size: 1.5rem;
      margin-top: 0.5rem;
`;

// Define a styled title
const Title = styled.h1`
      font-size: 4rem;
      margin: 0;
`;

// Define a styled link
const StyledLink = styled(Link)`
      color: white;
      text-decoration: none;
      font-size: 1.2rem;

      &:hover {
            text-decoration: underline;
      }

      @media (max-width: 768px) {
            justify-content: center;
            display: flex;
            
            gap:0.3rem;
            width:100%;
      }
`;

const LinkContainer = styled.div`
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
`;
