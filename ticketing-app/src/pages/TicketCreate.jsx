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
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function TicketCreate() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignee, setAssignee] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  async function handleCreateTicket() {
    if (!title || !description || !assignee || !status || priority === "") {
      toast({
        title: "Error",
        description: "Please fill all the fields.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    try {
      const newTicket = {
        title: title,
        description: description,
        assignee: assignee,
        status: status,
        priority: priority,
      };
      let response = await axios({
        method: "post",
        url: "http://localhost:3000/tickets",
        data: newTicket,
      });
      if (response.status === 200) {
        navigate(`/tickets`);
      }
    } catch (error) {
      console.log(error);
    }
  }

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
      <Heading fontSize={"2xl"}>Create Ticket</Heading>
      <VStack spacing={8} my={4}>
        <Input
          placeholder="Enter Title"
          size="lg"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <Textarea
          placeholder="Enter Description"
          size="md"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <Select
          placeholder="Select Assignee"
          size="lg"
          value={assignee}
          onChange={(e) => {
            setAssignee(e.target.value);
          }}
        >
          <option value="james">James</option>
          <option value="emma">Emma</option>
          <option value="oliver">Oliver</option>
          <option value="sophia">Sophia</option>
          <option value="liam">Liam</option>
        </Select>
        <FormControl
          as="fieldset"
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
          }}
        >
          <FormLabel as="legend">Select Status </FormLabel>
          <RadioGroup defaultValue="completed">
            <HStack spacing="20px">
              <Radio value="pending">Pending</Radio>
              <Radio value="progress">Progress</Radio>
              <Radio value="completed">Completed</Radio>
            </HStack>
          </RadioGroup>
        </FormControl>
        <Select
          value={priority}
          onChange={(e) => setPriority(Number(e.target.value))}
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
          onClick={handleCreateTicket}
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
          Create
        </Button>
      </VStack>
    </Container>
  );
}
