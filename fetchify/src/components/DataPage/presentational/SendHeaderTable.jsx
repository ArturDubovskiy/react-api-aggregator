import React, { Component } from 'react';
import { Segment } from "semantic-ui-react";
import PropTypes from "prop-types";

import Table from "../../Table";

class SendHeaderTable extends Component {
  render() {
    return (
      <Segment color="blue" raised>
        <h2 className="home-head-title">Headers</h2>
        <Table
          data={this.props.headers}
          setStatus={this.props.actions.setStatus}
          setKey={this.props.actions.setKey}
          setValue={this.props.actions.setValue}
          removeSelected={this.props.actions.removeHeader}
          addRow={this.props.actions.addHeader}
          removeRow={this.props.actions.removeLastHeader}
        />
      </Segment>
    );
  }
}

SendHeaderTable.propTypes = {
  actions: PropTypes.object.isRequired,
  headers: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default SendHeaderTable;