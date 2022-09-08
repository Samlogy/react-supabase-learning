import { IconButton } from '@chakra-ui/react';
import { useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';

import supabase from '../supabase';

export default function DeleteTask({ id }) {
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);
    const { data, error } = await supabase.from('task').delete().eq('id', id);
    setLoading(false);
  }

  return (
    <IconButton
      isRound="true"
      icon={<FiTrash2 />}
      onClick={handleDelete}
      isLoading={loading}
    />
  );
}
