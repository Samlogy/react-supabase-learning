import { Heading, VStack, Input, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import supabase from './supabase';

export default function Login() {
  const [email, setEmail] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  let navigate = useNavigate();

  const logInAccount = async email => {
    setLoading(true);
    try {
      // supabase method to send the magic link to the email provided
      const { error } = await supabase.auth.signIn({ email });

      if (error) throw error; //check if there was an error fetching the data and move the execution to the catch block

      alert('Check your email for your magic login link!');
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    logInAccount(email);
  };

  React.useEffect(() => {
    if (supabase.auth.user() !== null) {
      navigate('/home');
    }
  }, []);

  return (
    <VStack p={4} minH="100vh">
      <Heading
        mt="20"
        p="5"
        fontWeight="extrabold"
        size="xl"
        bgGradient="linear(to-l, teal.300, blue.500)"
        bgClip="text"
      >
        Login
      </Heading>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <Input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            name="email"
            required
          />
          <div className="form-text">
            Enter your email to get your magic link
          </div>
        </div>
        <Button
          disabled={loading}
          type="submit"
          className="btn btn-primary btn-lg w-100 "
        >
          {loading ? 'Loading...' : 'Submit'}
        </Button>
      </form>
    </VStack>
  );
}
