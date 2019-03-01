import React from "react";
import PropTypes from "prop-types";
import { Segment, Table, Label, Header, Icon } from "semantic-ui-react";

const RequestHistory = props => {
  if (props.history.length) {
    return (
      <Segment color="blue" raised>
        <Table basic="very" celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell content="URL" />
              <Table.HeaderCell width={2} content="Status" />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {props.history.map((el, idx) => (
              <Table.Row
                key={idx}
                className={el.status === "Passed" ? "positive" : "negative"}
              >
                <Table.Cell content={el.url} className="trunkchars" />
                <Table.Cell>
                  <Label color={el.status === "Passed" ? "green" : "red"} content={el.status}></Label>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Segment>
    );
  } else {
    return (
      <Segment placeholder raised>
        <Header icon>
          <Icon name="history"></Icon>
          No requests yet
        </Header>
      </Segment>
    );
  }
};

RequestHistory.propTypes = {
  history: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default RequestHistory;
