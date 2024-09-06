import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/logo.webp';

const NotFound: React.FC = () => {
      return (
            <CenteredContainer>
                  <ContentWrapper>
                        <LogoContainer>
                              <Logo src={logo} alt='Logo' />
                              <Subtitle>Wealth Health</Subtitle>
                        </LogoContainer>
                        <Title>404 - Page Not Found</Title>
                        <Message>
                              The page you are looking for doesn't exist.
                        </Message>
                        <StyledLink to='/'>Go back to homepage</StyledLink>
                  </ContentWrapper>
            </CenteredContainer>
      );
};

export default NotFound;

const CenteredContainer = styled.div`
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      width: 100vw;
      background-color: #fff;
`;

const ContentWrapper = styled.div`
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
`;

const LogoContainer = styled.div`
      display: flex;
      flex-direction: column;
      align-items: center;
`;

const Logo = styled.img`
      height: 200px;
      width: 200px;
      border-radius: 50%;
`;

const Subtitle = styled.h2`
      font-size: 2.5rem;
      margin-top: 0.5rem;
      color: #93ad18;
`;

const Title = styled.h1`
      margin-top: 1rem;
      font-size: 60px;
      color: red;
`;

const Message = styled.p`
      margin: 1rem 0;
      font-weight: bold;
      color: red;
`;

const StyledLink = styled(Link)`
      color: #93ad18;
      text-decoration: none;
      font-weight: bold;
      font-size: 20px;

      &:hover {
            text-decoration: underline;
      }
`;
