import {
  Heading,
  Box,
  Center,
  Text,
  Stack,
  Button,
  Badge,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingIndicator from "../components/LoadingIndictor";
import ErrorIndictor from "../components/ErrorIndictor";

export default function Tickets() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [ticket, setTicket] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  async function TicketView() {
    setLoading(true);
    try {
      let response = await axios({
        method: "GET",
        url: `http://localhost:3000/tickets/${id}`,
      });
      let data = response.data;
      setLoading(false);
      setTicket(data);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  }

  useEffect(() => {
    TicketView(id);
  }, [id]);

  if (loading) {
    return <LoadingIndicator />;
  }
  if (error) {
    return <ErrorIndictor />;
  }
  async function handleDelete() {
    try {
      let response = await axios({
        method: "DELETE",
        url: `http://localhost:3000/tickets/${id}`,
      });
      if (response.status === 200) {
        navigate("/tickets");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const { title, description, status, assignee, priority } = ticket;
  return (
    <Center py={6}>
      <Box
        maxW={"380px"}
        h={"auto"}
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"xl"}
        rounded={"lg"}
        my={12}
        p={6}
        textAlign={"center"}
      >
        <Heading fontSize={"2xl"} fontFamily={"body"} my={12}>
          {title}
        </Heading>
        <Text fontWeight={600} color={"gray.500"} mb={4}>
          {assignee}
        </Text>
        <Text
          textAlign={"center"}
          color={useColorModeValue("gray.700", "gray.400")}
          px={3}
        >
          {description}
        </Text>

        <Stack align={"center"} justify={"center"} direction={"row"} mt={6}>
          <Badge
            px={2}
            py={1}
            bg={useColorModeValue("gray.50", "gray.800")}
            fontWeight={"400"}
          >
            Status: {status}
          </Badge>
          <Badge
            px={2}
            py={1}
            bg={useColorModeValue("gray.50", "gray.800")}
            fontWeight={"400"}
          >
            Prority: {priority}
          </Badge>
        </Stack>
        <Stack mt={8} direction={"row"} spacing={4}>
          <Button
            onClick={() => {
              navigate(`/ticket/edit/${id}`);
            }}
            flex={1}
            fontSize={"sm"}
            rounded={"full"}
            _focus={{
              bg: "gray.200",
            }}
          >
            Edit
          </Button>
          <Button
            onClick={handleDelete}
            flex={1}
            fontSize={"sm"}
            rounded={"full"}
            bg={"blue.400"}
            color={"white"}
            boxShadow={
              "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
            }
            _hover={{
              bg: "blue.500",
            }}
            _focus={{
              bg: "blue.500",
            }}
          >
            Delete
          </Button>
        </Stack>
      </Box>
    </Center>
  );
}
