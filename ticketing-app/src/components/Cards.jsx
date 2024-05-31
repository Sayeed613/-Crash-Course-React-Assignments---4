import {
    Box,
    Center,
    Heading,
    Text,
    Stack,
    Avatar,
    useColorModeValue,
    SimpleGrid
  } from '@chakra-ui/react';

  // Sample data for the tasks
  const tasksData = [
    {
      title: 'Authentication',
      description: 'Set up user authentication using JWT and integrate with the front-end.',
      dueDate: 'June 5, 2024',
      assignee: {
        name: 'Bob Smith',
        avatar: 'https://avatars0.githubusercontent.com/u/1164545?v=4'
      }
    },
    {
      title: 'Create Tickets',
      description: 'Implement the functionality to create new support tickets in the system.',
      dueDate: 'June 10, 2024',
      assignee: {
        name: 'Charlie Brown',
        avatar: 'https://avatars0.githubusercontent.com/u/1164546?v=4'
      }
    },
    {
      title: 'Edit Tickets',
      description: 'Enable the functionality to edit existing support tickets.',
      dueDate: 'June 15, 2024',
      assignee: {
        name: 'Dana White',
        avatar: 'https://avatars0.githubusercontent.com/u/1164547?v=4'
      }
    },
    {
      title: 'Fetch and Render Cards',
      description: 'Implement the functionality to fetch and render cards dynamically.',
      dueDate: 'June 20, 2024',
      assignee: {
        name: 'Alice Johnson',
        avatar: 'https://avatars0.githubusercontent.com/u/1164544?v=4'
      }
    }
  ];

  function TaskCard({ title, description, dueDate, assignee }) {
    return (
      <Center py={6}>
        <Box
          maxW={'445px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.900')}
          boxShadow={'2xl'}
          rounded={'md'}
          p={6}
          overflow={'hidden'}>
          <Stack>
            <Heading
              color={useColorModeValue('gray.700', 'white')}
              fontSize={'2xl'}
              fontFamily={'body'}>
              {title}
            </Heading>
            <Text color={'gray.500'}>
              {description}
            </Text>
            <Text color={'gray.500'}>
              Due Date: {dueDate}
            </Text>
          </Stack>
          <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
            <Avatar
              src={assignee.avatar}
              alt={assignee.name}
            />
            <Stack direction={'column'} spacing={0} fontSize={'sm'}>
              <Text fontWeight={600}>{assignee.name}</Text>
            </Stack>
          </Stack>
        </Box>
      </Center>
    );
  }

  export default function TaskManagement() {
    return (
          <SimpleGrid columns={[1, 2, 4]} spacing="20px" w={"90%"} m={"auto"}>
        {tasksData.map((task, index) => (
          <TaskCard key={index} {...task} />
        ))}
      </SimpleGrid>
    );
  }



