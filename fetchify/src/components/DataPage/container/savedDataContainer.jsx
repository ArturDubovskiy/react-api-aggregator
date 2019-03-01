import React, { Component } from "react";
import { connect } from "react-redux";
import { Segment, Button } from "semantic-ui-react";

import * as actions from "../../../actions/DataPage/savedDataActions";
import { clearJSON } from "../../../actions/BuilderPage/builderActions";
import SendBar from "../presentational/SendBar";
import SavedData from "../presentational/SavedData";
import BodyMessage from "../presentational/BodyMessage";
import BuildButton from "../presentational/BuildButon";

class savedDataContainer extends Component {
  render() {
    let showButton = Boolean(this.props.mainPage.history.length || this.props.savedData.data.length)
      ? "block"
      : "none";
    return (
      <Segment className="no_margin">
        <SendBar
          actions={this.props.actions}
          request={this.props.savedData.sendRequest}
          data={this.props.savedData.data}
          togglers={this.props.savedData.toggles}
          customData={this.props.customBody.preview}
        />

        <Segment color="blue" raised style={{ display: showButton }}>
          <h2 className="home-head-title">Build your own request body</h2>
          <BuildButton />
          <BodyMessage
            customData={this.props.customBody.preview}
            actions={this.props.actions}
            showJSON={this.props.savedData.toggles.custom}
          />
        </Segment>
        <h2 className="home-head-title">Saved data</h2>
        <SavedData
          data={this.props.savedData.data}
          actions={this.props.actions}
        />
      </Segment>
    );
  }
}

const mapStateToProps = store => {
  return {
    mainPage: store.MainPage,
    savedData: store.SavedData,
    customBody: store.BuilderPage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      removeData: idx => dispatch(actions.removeSelectedData(idx)),
      clearData: () => dispatch(actions.clearSavedData()),
      toggleHeadersButton: () => dispatch(actions.headersButtonToggle()),
      toggleShowButton: () => dispatch(actions.toggleShowCustomJSON()),
      setSendURL: val => dispatch(actions.setSendDataURL(val)),
      validateURL: val => dispatch(actions.setSendURLValidation(val)),
      sendData: (url, data, method, headers) =>
        dispatch(actions.sendSavedData(url, data, method, headers)),
      changeMethod: method => dispatch(actions.setSendMethod(method)),
      clearJSON: () => dispatch(clearJSON()),
      setSendBody: body => dispatch(actions.setSendBody(body)),
      headers: {
        addHeader: () => dispatch(actions.addSendHeader()),
        setKey: (id, val) => dispatch(actions.changeSendHeaderKey(id, val)),
        setValue: (id, val) => dispatch(actions.changeSendHeaderValue(id, val)),
        setStatus: id => dispatch(actions.changeSendHeaderStatus(id)),
        removeHeader: id => dispatch(actions.removeSelectedSendHeader(id)),
        removeLastHeader: () => dispatch(actions.removeLastSendHeader())
      }
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(savedDataContainer);
