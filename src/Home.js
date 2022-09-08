import { Button, Heading, VStack } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import AddTask from './components/AddTask';
import TaskList from './components/TaskList';
import supabase from './supabase';

export default function Home() {
  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();

  const logOutAccount = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  const onLogout = () => {
    logOutAccount();
    navigate('/');
  };

  React.useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      if (session !== null) {
        navigate('/');
      } else {
        navigate('/home');
      }
    });
  }, []);
  return (
    <VStack p={4} minH="100vh">
      <Button
        colorScheme="blue"
        variant="outline"
        ml="auto"
        onClick={() => onLogout()}
      >
        Logout
      </Button>
      <Heading
        mt="20"
        p="5"
        fontWeight="extrabold"
        size="xl"
        bgGradient="linear(to-l, teal.300, blue.500)"
        bgClip="text"
      >
        Todo List
      </Heading>
      <AddTask />
      <TaskList />
    </VStack>
  );
}
