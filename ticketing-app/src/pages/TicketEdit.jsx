import {
  Container,
  Input,
  Textarea,
  VStack,
  Select,
  FormControl,
  FormLabel,
  RadioGroup,
  HStack,
  Radio,
  Heading,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingIndicator from "../components/LoadingIndictor";
import ErrorIndicator from "../components/ErrorIndictor";


export default function TicketEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [ticket, setTicket] = useState({});
  const [err, setErr] = useState(false);

  async function fetchAndUpdateData(id) {
    setLoading(true);
    try {
      let res = await axios({
        method: "get",
        url: `http://localhost:3000/tickets/${id}`,
      });

      let data = res?.data;
      setLoading(false);
      setTicket(data);
    } catch (error) {
      setLoading(false);
      setErr(true);
    }
  }

  useEffect(() => {
    fetchAndUpdateData(id);
  }, [id]);

  async function editTicket() {
    try {
      let updatedTicket = {
        title: ticket.title,
        description: ticket.description,
        assignee: ticket.assignee,
        status: ticket.status,
        priority: ticket.priority,
      };

      let res = await axios({
        method: "put",
        url: `http://localhost:3000/tickets/${id}`,
        data: updatedTicket,
      });

      if (res.status === 200) {
        navigate(`/tickets`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (loading) {
    return <LoadingIndicator />;
  }

  if (err) {
    return <ErrorIndicator />;
  }

  const { title, description, assignee, status, priority } = ticket;
  return (
    <Container
      my={4}
      maxW={"500px"}
      w={"full"}
      bg={useColorModeValue("white", "gray.900")}
      boxShadow={"md"}
      rounded={"lg"}
      p={4}
      textAlign={"center"}
    >
      <Heading fontSize={"2xl"}>Edit Ticket</Heading>
      <VStack spacing={8} my={4}>
        <Input
          placeholder="Enter Title"
          size="lg"
          value={title}
          onChange={(e) => {
            setTicket({ ...ticket, title: e.target.value });
          }}
        />
        <Textarea
          placeholder="Enter Description"
          size="md"
          value={description}
          onChange={(e) => {
            setTicket({ ...ticket, description: e.target.value });
          }}
        />
        <Select
          placeholder="Select Assignee"
          size="lg"
          value={assignee}
          onChange={(e) => {
            setTicket({ ...ticket, assignee: e.target.value });
          }}
        >
           <option value="james">James</option>
          <option value="emma">Emma</option>
          <option value="oliver">Oliver</option>
          <option value="sophia">Sophia</option>
          <option value="liam">Liam</option>
        </Select>
        <FormControl as="fieldset">
          <FormLabel as="legend">Select Status</FormLabel>
          <RadioGroup
          value={status}
            onChange={(e) => {
              setTicket({ ...ticket, status: e });
            }}
          >
            <HStack spacing="20px">
              <Radio value="pending">Pending</Radio>
              <Radio value="progress">Progress</Radio>
              <Radio value="completed">Completed</Radio>
            </HStack>
          </RadioGroup>
        </FormControl>
        <Select
        value={priority}
          onChange={(e) => {
            setTicket({ ...ticket, priority: Number(e.target.value) });
          }}
          placeholder="Select Priority"
          size="lg"
        >
          <option value={0}>0</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
          <option value={7}>7</option>
          <option value={8}>8</option>
          <option value={9}>9</option>
        </Select>
        <Button
          onClick={editTicket}
          fontSize={"s"}
          rounded={"full"}
          w={"full"}
          bg={"blue.400"}
          color={"white"}
          _hover={{
            bg: "blue.500",
          }}
          _focus={{
            bg: "blue.500",
          }}
        >
          Update
        </Button>
      </VStack>
    </Container>
  );
}
