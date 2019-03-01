import React from "react";
import { Link } from "react-router-dom";

import { Button } from "semantic-ui-react";

const BuildButton = props => (
  <Button fluid color="green" as={Link} to="/builder" content="Build JSON" />
);

export default BuildButton;
