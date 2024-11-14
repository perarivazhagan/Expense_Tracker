import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FaGoogle, FaMicrosoft, FaGithub } from 'react-icons/fa'; // Import Font Awesome icons
import backgroundGif from '../../img/b2b-Emburse.jpg';
import gl from '../../img/gl.png';
import ms from '../../img/ms.png';
const AuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  background-image: url(${backgroundGif});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
`;

const LogoText = styled.h1`
  font-size: 3.5em;
  margin-bottom: 20px;
  letter-spacing: 2px;
  font-weight: bold;
  color: #f95d9b; /* Soft pink color */
  text-shadow: 4px 4px 15px rgba(0, 0, 0, 0.8), -2px -2px 8px rgba(255, 255, 255, 0.3);
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.05);
  }
`;



const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.9); /* Increased opacity */
  padding: 30px;
  width: 350px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin-bottom: 15px;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  &:focus {
    border-color: #4caf50;
    outline: none;
  }
`;

const Button = styled.button`
  padding: 12px;
  font-size: 16px;
  color: #000;
  background-color: #d88695;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #fcf6f9;
  }
`;

const SocialButtons = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 15px;
`;

const SocialButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #555;
  font-size: 1.5em;
  transition: color 0.3s;
  &:hover {
    color: #4caf50;
  }

  img {
    transition: transform 0.3s;
    &:hover {
      transform: scale(1.1);
    }
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9em;
  margin-bottom: 10px;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 1.5em;
  color: #333;
  margin-bottom: 20px;
`;

const Login = ({ setData }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    if (loggedIn) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSignIn = async (e) => {
    e.preventDefault();
    navigate('/expense');
  };

  const handleSignOut = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
    setError('');
  };

  return (
    <AuthContainer>
      <LogoText>Expense Tracker</LogoText>
      {isLoggedIn ? (
        <FormContainer>
          <Title>Welcome Back!</Title>
          <Button onClick={handleSignOut}>Sign Out</Button>
        </FormContainer>
      ) : (
        <FormContainer>
          <Form onSubmit={handleSignIn}>
            <Title>Sign In</Title>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit">Sign In</Button>
          </Form>
          <SocialButtons>
            <SocialButton aria-label="Sign in with Google">
              <img src={gl} alt='google' width='50px' height='50px'/>
            </SocialButton>
            <SocialButton aria-label="Sign in with Microsoft">
            <img src={ms} alt='google' width='50px' height='50px'/>
            </SocialButton>
          </SocialButtons>
        </FormContainer>
      )}
    </AuthContainer>
  );
};

export default Login;
