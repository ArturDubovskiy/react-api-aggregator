import React from "react";
import JSONPretty from "react-json-pretty";
import PropTypes from "prop-types";
import { Segment, Header, Icon, Label, Button } from "semantic-ui-react";

const SavedData = props => {
  if (!props.data.length) {
    return (
      <Segment placeholder color="blue">
        <Header icon>
          <Icon name="server" />
          You dont save any data
        </Header>
      </Segment>
    );
  } else {
    return (
      <Segment color="blue" raised>
        <Button
              floated="right"
              negative
              onClick={props.actions.clearData}
              content="Clear"
            />
            <br/>
            <br/>
        {props.data.map((el, idx) => (
          <Segment color="green" key={idx} raised>
            <Label
              onClick={props.actions.removeData}
              ribbon="right"
              color="red"
            >
              <Icon name="trash alternate" />
            </Label>
            <Segment secondary as="pre" className="data-segment">
              <JSONPretty
                id="json-pretty"
                data={{ url: el.url, data: el.result }}
                theme={{
                  main:
                    "line-height:1.3;color:black;background:inherit;overflow-x: hidden;",
                  key: "color:#b24bfc;",
                  string: "color:#379926;",
                  value: "color:#59a3e0;",
                  boolean: "color:#e07b28;"
                }}
              />
            </Segment>
          </Segment>
        ))}
      </Segment>
    );
  }
};

SavedData.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  actions: PropTypes.object.isRequired
};

export default SavedData;
