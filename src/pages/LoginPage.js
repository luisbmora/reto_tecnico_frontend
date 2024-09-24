import React, { useState } from 'react';
import { Grid, Header, Segment, Message } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState('');

  const handleLogin = async (email, password) => {
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Grid textAlign='center' style={{ height: '100vh', backgroundColor: '#f7f9fc' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center' style={{ marginBottom: '20px' }}>
          Inicia Sesión
        </Header>
        <Segment stacked style={{ borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
          <LoginForm onLogin={handleLogin} />
          {error && <Message negative>{error}</Message>}
        </Segment>
        <Message>
          New to us? <a href='/register'>Registrate</a>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default LoginPage;
