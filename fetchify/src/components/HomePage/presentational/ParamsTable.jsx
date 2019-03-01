import React, { Component } from "react";
import { Segment } from "semantic-ui-react";
import PropTypes from "prop-types";


import Table from "../../Table";

class ParamsTable extends Component {
  render() {
    return (
      <Segment color="green" raised>
        <h2 className="home-head-title">Params</h2>
        <Table
          data={this.props.data}
          setStatus={this.props.actions.toggleParamStatus}
          setKey={this.props.actions.changeParamKey}
          setValue={this.props.actions.changeParamValue}
          removeSelected={this.props.actions.removeParam}
          addRow={this.props.actions.addParamRow}
          removeRow={this.props.actions.removeLastRow}
        />
      </Segment>
    );
  }
}

ParamsTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  actions: PropTypes.object.isRequired
}

export default ParamsTable;
