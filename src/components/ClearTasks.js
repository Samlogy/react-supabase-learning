import { Button, Flex } from '@chakra-ui/react';
import { useState } from 'react';
import supabase from '../supabase';

export default function ClearTasks() {
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!window.confirm('Are you sure you want to clear all tasks?')) return;

    setLoading(true);
    const { data, error } = await supabase
      .from('task')
      .delete()
      .not('item', 'eq', 'Do not delete me');
    setLoading(false);
  }

  return (
    <Flex>
      <Button
        colorScheme="blue"
        variant="outline"
        px="8"
        h="45"
        mt="10"
        onClick={handleDelete}
        isLoading={loading}
        loadingText="Clearing ..."
      >
        Clear Tasks
      </Button>
    </Flex>
  );
}
