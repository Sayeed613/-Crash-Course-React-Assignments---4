import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import PrivateRouter from "./PrivateRouter";
import TicketCreate from "../pages/TicketCreate";
import Tickets from "../pages/Tickets";
import TicketView from "../pages/TicketView";
import TicketEdit from "../pages/TicketEdit";

export default function AllRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <PrivateRouter>
            <Home />
          </PrivateRouter>
        }
      />
      <Route
        path="/about"
        element={
          <PrivateRouter>
            <About />
          </PrivateRouter>
        }
      />
      <Route
        path="/contact"
        element={
          <PrivateRouter>
            <Contact />
          </PrivateRouter>
        }
      />
      <Route
        path="/tickets"
        element={
          <PrivateRouter>
            <Tickets />
          </PrivateRouter>
        }
      />
      <Route
        path="/ticket/create"
        element={
          <PrivateRouter>
            <TicketCreate />
          </PrivateRouter>
        }
      />
     <Route
        path="/ticket/view/:id"
        element={
            <PrivateRouter>
            <TicketView />
            </PrivateRouter>
        }
        />
      <Route
        path="/ticket/edit/:id"
        element={
          <PrivateRouter>
            <TicketEdit />
          </PrivateRouter>
        }
      />
    </Routes>
  );
}