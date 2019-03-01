import React from "react";
import {
  Table,
  Checkbox,
  Input,
  Icon,
  Segment,
  Button
} from "semantic-ui-react";
import PropTypes from "prop-types";

export const BasicTable = props => {
  return (
    <Segment>
      <Table basic="very" celled size="large">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={1} />
            <Table.HeaderCell content="Key" />
            <Table.HeaderCell content="Value" />
            <Table.HeaderCell width={1} />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {props.data.map((item, idx) => (
            <Table.Row key={idx}>
              <Table.Cell>
                <Checkbox
                  toggle
                  checked={item.checked}
                  onChange={() => props.setStatus(idx)}
                />
              </Table.Cell>
              <Table.Cell>
                <Input
                  fluid
                  value={item.key}
                  onChange={e => props.setKey(idx, e.target.value)}
                />
              </Table.Cell>
              <Table.Cell>
                <Input
                  fluid
                  value={item.value}
                  onChange={e => props.setValue(idx, e.target.value)}
                />
              </Table.Cell>
              <Table.Cell>
                <Icon
                  name="trash alternate"
                  onClick={() => props.removeSelected(idx)}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Button animated color="green" onClick={props.addRow} type="button">
        <Button.Content visible content="Add" />
        <Button.Content hidden>
          <Icon name="plus circle" />
        </Button.Content>
      </Button>
      <Button animated color="red" onClick={props.removeRow} type="button">
        <Button.Content visible content="Remove" />
        <Button.Content hidden>
          <Icon name="trash alternate" />
        </Button.Content>
      </Button>
    </Segment>
  );
};

BasicTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  setStatus: PropTypes.func.isRequired,
  setKey: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  removeSelected: PropTypes.func.isRequired,
  addRow: PropTypes.func.isRequired,
  removeRow: PropTypes.func.isRequired
};

export default BasicTable;
