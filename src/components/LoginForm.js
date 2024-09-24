import React, { useState } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    onLogin(email, password);
  };

  return (
    <Form onSubmit={handleSubmit} error={!!error}>
      <Form.Input
        fluid
        icon='user'
        iconPosition='left'
        label='Email'
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Form.Input
        fluid
        icon='lock'
        iconPosition='left'
        label='Password'
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button color='teal' fluid size='large' type='submit'>
        Login
      </Button>
      {error && <Message error content={error} />}
    </Form>
  );
};

export default LoginForm;