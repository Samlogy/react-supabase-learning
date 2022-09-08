import { Heading, VStack, Input, Box, Button, Flex } from '@chakra-ui/react';
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
        bgGradient="linear(to-t, teal.300, blue.500)"
        bgClip="text"
      >
        Login
      </Heading>

      <form onSubmit={handleSubmit}>
        <Flex flexDir="column" w="50vw">
          <Input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            name="email"
            placeholder="Email address"
            required
            mb="1rem"
          />

          <Box as="span" mb="1rem">
            Enter your email to get your magic link
          </Box>

          <Button colorScheme="blue" disabled={loading} type="submit">
            {loading ? 'Loading...' : 'Submit'}
          </Button>
        </Flex>
      </form>
    </VStack>
  );
}
