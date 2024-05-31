import { Button, Container, Flex, SimpleGrid, Select } from "@chakra-ui/react";
import TicketsCard from "../components/TicketsCard";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingIndicator from "../components/LoadingIndictor";
import ErrorIndictor from "../components/ErrorIndictor";

export default function Tickets() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [sortOrderValue, setSortOrderValue] = useState("");
  const [filterValue, setFilterValue] = useState("")

  async function fetchAndUpdateData(sortOrderValue, filterValue) {
    setLoading(true);
    try {
      let queryParams = {}
      if(filterValue) {
        queryParams.status = filterValue
      }

      if(sortOrderValue) {
        queryParams._sort = "priority";
        queryParams._order = sortOrderValue;
      }
      let response = await axios({
        method: "GET",
        url: `http://localhost:3000/tickets`,
        params: queryParams
      });
      let data = response.data;
      setLoading(false);
      setTickets(data);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  }

  useEffect(() => {
    fetchAndUpdateData(sortOrderValue, filterValue);
  }, [sortOrderValue, filterValue]);

  if (loading) {
    return <LoadingIndicator />;
  }
  if (error) {
    return <ErrorIndictor />;
  }

  return (
    <Container maxW="5xl">
        <Flex direction={{ base: "column", md: "row" }} my={8} justifyContent="space-between">
        <Select placeholder='Sort by Priority' width={{ base: "100%", md: "40%" }} mb={{ base: 4, md: 0 }}
        value={sortOrderValue} onChange={(e) =>{
          setSortOrderValue(e.target.value);
        }}
        >
          <option value='asc'>Low to High</option>
          <option value='desc'>High to Low</option>
        </Select>
        <Select placeholder='Select option' width={{ base: "100%", md: "40%" }} mb={{ base: 4, md: 0 }}
        value={filterValue} onChange={(e) => {
          setFilterValue(e.target.value)
        }}
        >
          <option value='progress'>Progress</option>
          <option value='pending'>Pending</option>
          <option value='completed'>Completed</option>
        </Select>
        <Button
          variant="solid"
          colorScheme="blue"
          onClick={() => {
            navigate(`/ticket/create`);
          }}
          width={{ base: "100%", md: "auto" }}
        >
          Create Tickets
        </Button>
      </Flex>
     <Flex>

     <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
        {tickets.map((ticket) => (
          <TicketsCard {...ticket} key={ticket.id} />
        ))}
      </SimpleGrid>
     </Flex>
    </Container>
  );
}
