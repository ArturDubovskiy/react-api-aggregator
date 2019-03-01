import React, { Component } from "react";
import JSONPretty from "react-json-pretty";
import PropTypes from "prop-types";
import { Message, Icon, Segment, Button, Header } from "semantic-ui-react";

class DataPlaceholder extends Component {
  showSuccessNotification = () => {
    if (this.props.result.toggles.saveClicked) {
      return (
        <Message icon color="green">
          <Icon name="check circle outline" />
          <Message.Content>
            <Message.Header content="Successfully saved!" />
          </Message.Content>
        </Message>
      );
    }
  };

  showResult() {
    if (this.props.result.data) {
      return (
        <div>
          {this.showSuccessNotification()}
          <Segment>
            <div className="data-placeholder">
              <JSONPretty
                id="json-pretty"
                data={this.props.result.data.result}
                theme={{
                  main:
                    "line-height:1.3;color:black;background:inherit;overflow-x: hidden;",
                  key: "color:#b24bfc;",
                  string: "color:#379926;",
                  value: "color:#59a3e0;",
                  boolean: "color:#e07b28;"
                }}
              />
            </div>
          </Segment>
        </div>
      );
    }
  }
  
  handleSaveData = () => {
    this.props.actions.saveClick();
    this.props.actions.saveData(this.props.result.data);
  };
  handleShowData = () => {
    if (this.props.result.data) {
      return (
        <Segment.Group>
          <Segment>
            <Button
              color="green"
              onClick={this.handleSaveData}
              content="Save"
            />
          </Segment>
          <Segment tertiary content={this.showResult()} />
        </Segment.Group>
      );
    } else if (this.props.result.request.isLoading) {
      return (
        <Segment color="blue" loading>
          <Header content="Loading..." />
        </Segment>
      );
    } else {
      return (
        <Segment placeholder color="red">
          <Header icon>
            <Icon name="server" />
            No data resived yet
          </Header>
        </Segment>
      );
    }
  };

  render() {
    return <div>{this.handleShowData()}</div>;
  }
}

DataPlaceholder.propTypes = {
  result: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

export default DataPlaceholder;
