import React, { Component } from "react";
import { connect } from "react-redux";
import { Segment } from "semantic-ui-react";

import BodyTable from "../presentational/BodyTable";
import DataList from "../presentational/DataList";
import Preview from "../presentational/Preview";
import * as actions from "../../../actions/BuilderPage/builderActions";

class BodyBuilderContainer extends Component {
  
  componentDidUpdate = prevProps => {
    if (this.props.reqBody.schema !== prevProps.reqBody.schema) {
         // schema.map((el, idx) => {
      //   if (el.key.startsWith("key")) {
      //     el.key = `key${idx + 1}`;
      //   }
      // });
      const result = {};
      const data = this.props.reqBody.schema;
      const active_data = data.filter(el => el.checked === true);
      active_data.map(el => (result[el.key] = el.value));
      this.props.actions.setPreview(result);
    }
  };

  render() {
    return (
      <Segment color="blue" className="no_margin">
        <DataList
          data={this.props.reqBody.dataSection}
          actions={this.props.actions}
          urls={this.props.fetchedData.history}
          saved={this.props.savedData.data}
        />
        <BodyTable data={this.props.reqBody} actions={this.props.actions} />
        <Preview data={this.props.reqBody.preview} />
      </Segment>
    );
  }
}



const mapStateToPoprs = store => {
  return {
    reqBody: store.BuilderPage,
    savedData: store.SavedData,
    fetchedData: store.MainPage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      addKeyRow: () => dispatch(actions.addKeyRow()),
      removeLastKey: () => dispatch(actions.removeLastKey()),
      changeKeyValue: (id, val) => dispatch(actions.changeKeyValue(id, val)),
      changeValue: (id, val) => dispatch(actions.changeValue(id, val)),
      changeKeyStatus: id => dispatch(actions.changeKeyStatus(id)),
      removeSelectedKey: id => dispatch(actions.removeSelectedKey(id)),
      setDragStatus: val => dispatch(actions.setDragStatus(val)),
      setPreview: val => dispatch(actions.setPreview(val)),
      clearJSON: () => dispatch(actions.clearJSONBody()),
      clearValue: (idx) => dispatch(actions.clearValue(idx))
    }
  };
};

export default connect(
  mapStateToPoprs,
  mapDispatchToProps
)(BodyBuilderContainer);
