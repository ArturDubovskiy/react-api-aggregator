import React, { Component } from "react";
import { Segment, List, Label, Header, Icon, Tab } from "semantic-ui-react";
import PropTypes from "prop-types";

class DataList extends Component {

  urlDragStart = (e, el) => {
    this.props.actions.setDragStatus(true);
    e.dataTransfer.setData("el", JSON.stringify(el));
  };

  dragEnd = e => {
    this.props.actions.setDragStatus(false);
  };

  dataDragStart = (e, el) => {
    this.props.actions.setDragStatus(true);
    e.dataTransfer.setData("el", JSON.stringify(el));
  };

  showURLList = () => {
    if (this.props.urls.length) {
      return (
        
          <List>
            {this.props.urls.map((el, idx) => (
              <List.Item
                key={idx}
                draggable
                onDragStart={e => this.urlDragStart(e, el.url)}
                onDragEnd={() => this.dragEnd()}
              >
                <Segment raised color={el.status === "Failed" ? "red" : "green"}>
                  <Label
                    color={el.status === "Failed" ? "red" : "green"}
                    ribbon
                  >
                    {el.status}
                  </Label>
                  <p className="trunkchars">{el.url}</p>
                </Segment>
              </List.Item>
            ))}
          </List>
      );
    } else {
      return (
        <Segment textAlign="center" secondary>
          You dont make any request
        </Segment>
      );
    }
  };

  showDataList = () => {
    if (this.props.saved.length) {
      return (
        <List>
          {this.props.saved.map((el, idx) => (
            <List.Item
              key={idx}
              draggable
              onDragStart={e => this.dataDragStart(e, el.result)}
              onDragEnd={e => this.dragEnd()}
            >
              <Segment raised color="green">
                <Label color="green">{el.url}</Label>
                <div className="data-placeholder">
                  <pre className="data-segment-list">
                    {JSON.stringify(el.result, undefined, 2)}
                  </pre>
                </div>
              </Segment>
            </List.Item>
          ))}
        </List>
      );
    } else {
      return (
        <Segment textAlign="center" secondary>
          You dont make any request
        </Segment>
      );
    }
  };

  showUrlSection = () => {
    return (
      <div>
        <Header>
          <Icon name="linkify" />
          <Header.Content>
            URL`s reqeust and status list
            <Header.Subheader>
              Holds all requested URL`s and their satus
            </Header.Subheader>
          </Header.Content>
        </Header>
        {this.showURLList()}
      </div>
    );
  };

  showDataSection = () => {
    return (
      <div>
        <Header>
          <Icon name="hdd" />
          <Header.Content>
            Saved data list
            <Header.Subheader>Holds all saved data</Header.Subheader>
          </Header.Content>
        </Header>
        {this.showDataList()}
      </div>
    );
  };

  render() {
    const panes = [
      {
        menuItem: "URL`s",
        render: () => <Tab.Pane>{this.showUrlSection()}</Tab.Pane>
      },
      {
        menuItem: "Saved Data",
        render: () => <Tab.Pane>{this.showDataSection()}</Tab.Pane>
      }
    ];
    return (
      <Segment color="blue">
        <h2 className="home-head-title">Stored data</h2>

        <Tab panes={panes} />
      </Segment>
    );
  }
}


DataList.propTypes = {
  data: PropTypes.object.isRequired,
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  urls: PropTypes.arrayOf(PropTypes.object).isRequired,
  saved: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default DataList;
