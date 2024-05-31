import {
    Heading,
    Box,
    Stack,
    Button,
    Badge,
    useColorModeValue,
  } from '@chakra-ui/react';
  import { useNavigate } from 'react-router-dom';

  export default function TicketsCard({ id, title, status, priority }) {
    const navigate = useNavigate();
    return (
      <Box
        maxW={'320px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'md'}
        rounded={'lg'}
        p={4}
        textAlign={'center'}>

        <Heading fontSize={'2xl'} fontFamily={'body'} mt={2}>
          Title: {title}
        </Heading>
        <Stack align={'center'} justify={'center'} direction={'row'} mt={4}>
          <Badge
            px={2}
            py={1}
            bg={useColorModeValue('gray.50', 'gray.800')}
            fontWeight={'400'}>
            Status: {status}
          </Badge>
          <Badge
            px={2}
            py={1}
            bg={useColorModeValue('gray.50', 'gray.800')}
            fontWeight={'400'}>
            Priority: {priority}
          </Badge>
        </Stack>
        <Stack mt={6} direction={'row'} spacing={4}>

          <Button
            flex={1}
            fontSize={'sm'}
            rounded={'full'}
            bg={'blue.400'}
            color={'white'}
            _hover={{
              bg: 'blue.500',
            }}
            _focus={{
              bg: 'blue.500',
            }}
            onClick={() => {
              navigate(`/ticket/view/${id}`);
            }}>
            View
          </Button>
        </Stack>
      </Box>
    );
  }
