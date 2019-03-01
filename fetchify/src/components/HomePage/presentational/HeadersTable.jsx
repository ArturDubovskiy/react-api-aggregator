import React, { Component } from "react";
import { Segment } from "semantic-ui-react";
import PropTypes from "prop-types";

import Table from "../../Table";

class HeadersTable extends Component {
  render() {
    return (
      <Segment color="green" raised>
        <h2 className="home-head-title">Headers</h2>
        <Table
          data={this.props.data}
          setStatus={this.props.actions.toggleHeaderStatus}
          setKey={this.props.actions.changeHeaderKey}
          setValue={this.props.actions.changeHeaderValue}
          removeSelected={this.props.actions.removeHeader}
          addRow={this.props.actions.addHeaderRow}
          removeRow={this.props.actions.removeLastHeaderRow}
        />
      </Segment>
    );
  }
}

HeadersTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  actions: PropTypes.object.isRequired
}

export default HeadersTable;
