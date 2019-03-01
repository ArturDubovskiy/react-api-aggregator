import React, { Component } from "react";
import PropTypes from "prop-types";
import { CANT_PARSE_JSON } from "../../../utils/constants";
import {
  Segment,
  Table,
  Checkbox,
  Input,
  Icon,
  Button
} from "semantic-ui-react";

class BodyTable extends Component {

  onDragOver = e => {
    e.preventDefault();
  };

  onDrop = (e, idx) => {
    let el = e.dataTransfer.getData("el");
    const value = this.props.data.schema[idx].value;
    try {
      el = JSON.parse(el);
      if(Array.isArray(value)) {
        value.push(el);
        this.props.actions.changeValue(idx, value);
      } else {
        let data;
        if (value) {
          data = [value, el];
        } else {
          data = el;
        }
        this.props.actions.changeValue(idx, data);
      }
      
    } catch {
      this.props.actions.changeValue(idx, CANT_PARSE_JSON);
    }
    
  };

  render() {
    const drag = this.props.data.dataSection.drag
      ? "tertiary inverted green"
      : "";
    if (!this.props.actions) {
      return null;
    }
    return (
      <div>
        <h2 className="home-head-title">Create your custom JSON</h2>
        <Segment color="green">
          <Table basic="very" celled size="large">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell width={1} />
                <Table.HeaderCell width={4} content="Key" />
                <Table.HeaderCell content="Value" />
                <Table.HeaderCell width={1} />
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.props.data.schema.map((item, idx) => (
                <Table.Row key={idx}>
                  <Table.Cell width={1}>
                    <Checkbox
                      toggle
                      checked={item.checked}
                      onChange={() => this.props.actions.changeKeyStatus(idx)}
                    />
                  </Table.Cell>
                  <Table.Cell width={4}>
                    <Input
                      fluid
                      icon="edit"
                      value={item.key}
                      onChange={e =>
                        this.props.actions.changeKeyValue(idx, e.target.value)
                      }
                    />
                  </Table.Cell>
                  <Table.Cell width={10}>
                    <Segment
                      className={`builder-value ${drag}`}
                      secondary={!Boolean(item.value)}
                      onDragOver={e => this.onDragOver(e)}
                      onDrop={e => this.onDrop(e, idx)}
                    >
                      {item.value
                        ? JSON.stringify(item.value)
                        : "Place your data here...."}
                    </Segment>
                  </Table.Cell>
                  <Table.Cell width={1}>
                    <Icon
                      name="close"
                      onClick={() => this.props.actions.clearValue(idx)}
                    />
                    <Icon
                      name="trash alternate"
                      onClick={() => this.props.actions.removeSelectedKey(idx)}
                    />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          <Button
            animated
            color="green"
            onClick={this.props.actions.addKeyRow}
            type="button"
          >
            <Button.Content visible content="Add" />
            <Button.Content hidden>
              <Icon name="plus circle" />
            </Button.Content>
          </Button>
          <Button
            animated
            color="red"
            onClick={this.props.actions.removeLastKey}
            type="button"
          >
            <Button.Content visible content="Remove" />
            <Button.Content hidden>
              <Icon name="trash alternate" />
            </Button.Content>
          </Button>
          <Button
            animated
            color="red"
            onClick={this.props.actions.clearJSON}
            type="button"
          >
            <Button.Content visible content="Clear table" />
            <Button.Content hidden>
              <Icon name="trash alternate" />
            </Button.Content>
          </Button>
        </Segment>
      </div>
    );
  }
}

BodyTable.propTypes = {
  data: PropTypes.object.isRequired,
  actions: PropTypes.objectOf(PropTypes.func).isRequired
};
export default BodyTable;
