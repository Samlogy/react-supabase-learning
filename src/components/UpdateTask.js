import { Button, HStack, Input } from '@chakra-ui/react';
import { useState } from 'react';

import supabase from '../supabase';

export default function UpdateTask({ data, id }) {
  const [text, setText] = useState(data.item);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase
      .from('task')
      .update({ ...data })
      .match({ id: id });

    setLoading(false);
    setText('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <HStack my="4" h="45">
        <Input
          h="100%"
          variant="filled"
          placeholder="Enter your task ..."
          value={text}
          onChange={e => setText(e.target.value)}
          disabled={loading}
        />
        <Button
          colorScheme="blue"
          px="10"
          h="100%"
          type="submit"
          isLoading={loading}
          loadingText="Adding"
        >
          Edit
        </Button>
      </HStack>
    </form>
  );
}
