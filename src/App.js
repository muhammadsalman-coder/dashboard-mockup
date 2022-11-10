import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Dashboard from "./screens/Dashboard";
import { Route, Switch } from "react-router-dom";
import Home from "./screens/Home";
import Customer from "./screens/Customer";
import UserPage from "./screens/UserPage";

const App = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/user" component={UserPage} />
      <Route path="/customer" component={Customer} />
    </Switch>
  );
};
export default App;
