import {
  StackDivider,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import supabase from '../supabase';
import ClearTasks from './ClearTasks';
import DeleteTask from './DeleteTask';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    const { data, error } = await supabase.from('task').select();
    setTasks(data);
  }

  return (
    <>
      <VStack
        divider={<StackDivider />}
        borderColor="gray.100"
        borderWidth="2px"
        p="5"
        borderRadius="lg"
        w="90%"
        alignItems="stretch"
      >
        <TableContainer>
          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Item</Th>
                <Th>Done</Th>
                <Th>Created At</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>

            <Tbody>
              {tasks.length > 0 &&
                tasks.map((task, idx) => (
                  <Tr key={idx}>
                    <Td>{task.id}</Td>
                    <Td>{task.item}</Td>
                    <Td>{task.done}</Td>
                    <Td>{task.created_at}</Td>
                    <Td>
                      <DeleteTask id={task.id} />
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      </VStack>

      <ClearTasks />
    </>
  );
}
