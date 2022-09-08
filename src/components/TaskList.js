import {
  Box,
  Image,
  Skeleton,
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
import { useRealtime } from 'react-supabase';

import img from '../images/empty.svg';
import ClearTasks from './ClearTasks';
import DeleteTask from './DeleteTask';

export default function TaskList() {
  const [result, reexecute] = useRealtime('task');
  const { data, error, fetching } = result;

  if (fetching) {
    return (
      <Skeleton
        width={{ base: '90vw', sm: '80vw', lg: '50vw', xl: '30vw' }}
        height="300px"
        rounded="md"
      />
    );
  }

  if (!data || !data.length) {
    return (
      <Box align="center">
        <Image src={img} mt="30px" maxW="95%" />
      </Box>
    );
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
              {data.map((task, idx) => (
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
