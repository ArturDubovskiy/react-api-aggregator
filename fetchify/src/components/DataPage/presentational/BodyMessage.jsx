import React from "react";
import JSONPretty from "react-json-pretty";
import PropTypes from "prop-types";
import { Segment, Message, Icon, Button } from "semantic-ui-react";

const BodyMessage = props => {
  const showCustomJSON = () => {
    if (props.showJSON) {
      return (
        <Segment color="green">
          <JSONPretty
            id="json-pretty"
            data={props.customData}
            theme={{
              main:
                "line-height:1.3;color:black;background:white;overflow-x: hidden;",
              key: "color:#b24bfc;",
              string: "color:#379926;",
              value: "color:#59a3e0;",
              boolean: "color:#e07b28;"
            }}
          />
        </Segment>
      );
    }
  };
  if (Object.entries(props.customData).length) {
    return (
      <Segment color="green" raised>
        <Message color="green" icon>
          <Icon name="check circle outline" color="green" />
          <Message.Content>
            <Message.Header content="Successfully created JSON" />
            <p onClick={props.actions.toggleShowButton}>Show</p>
          </Message.Content>
        </Message>
        {showCustomJSON()}
        <Button negative onClick={props.actions.clearJSON} content="Clear" />
      </Segment>
    );
  }
  return null;
};

BodyMessage.propTypes = {
    customData: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    showJSON: PropTypes.bool.isRequired
}

export default BodyMessage;
