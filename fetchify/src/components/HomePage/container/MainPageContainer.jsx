import React, { Component } from "react";
import { connect } from "react-redux";
import { Segment } from "semantic-ui-react";

import SearchBar from "../presentational/SearchBar";
import RequestHistory from "../presentational/History";
import DataPlaceholder from "../presentational/DataPlaceholder";
import * as constants from "../../../utils/constants";
import * as actions from "../../../actions/HomePage/mainPageActions";
import { saveData } from "../../../actions/DataPage/savedDataActions";

class MainPageContainer extends Component {
  onFormSubmit = url => {
    if (!url.length) {
      this.props.actions.setURLError(constants.BLANK_URL_ERROR_MSG);
    }
    if (constants.RE.test(url)) {
      if (this.props.mainPage.request.method === "GET") {
        this.props.actions.getData(
          url,
          this.props.mainPage.request.method,
          this.props.mainPage.request.headers
        );
      } else if (!this.props.mainPage.validation_error.body) {
        this.props.actions.getData(
          url,
          this.props.mainPage.request.method,
          this.props.mainPage.request.headers,
          this.props.mainPage.request.body
        );
      }
    }
  };

  render() {
    return (
      <Segment color="blue" className="no_margin">
        <h2 className="home-head-title">
          Start your journey from making URL request
        </h2>
        <SearchBar
          request={this.props.mainPage.request}
          onSubmit={this.onFormSubmit}
          errors={this.props.mainPage.validation_errors}
          toggles={this.props.mainPage.toggles}
          actions={this.props.actions}
          tables={this.props.mainPage.tables}
        />
        <Segment secondary color="blue" raised>
          <h2 className="home-head-title">History</h2>
          <RequestHistory history={this.props.mainPage.history} />
        </Segment>
        <Segment secondary color="blue" raised>
          <h2 className="home-head-title">Response data</h2>
          <DataPlaceholder
            result={this.props.mainPage}
            actions={this.props.actions}
          />
          <br />
        </Segment>
      </Segment>
    );
  }
}

const mapStateToProps = store => {
  return {
    mainPage: store.MainPage,
    savedData: store.SavedData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      getData: (url, method, headers, body) =>
        dispatch(actions.fetchData(url, method, headers, body)),
      setURLError: error => dispatch(actions.urlValidationError(error)),
      setBodyError: error => dispatch(actions.bodyValidationError(error)),
      setRequestMethod: val => dispatch(actions.setSendMethod(val)),
      setURL: url => dispatch(actions.setURL(url)),
      setParams: params => dispatch(actions.setParams(params)),
      setHeaders: headers => dispatch(actions.setHeaders(headers)),
      setBody: body => dispatch(actions.setBody(body)),
      toggleParams: () => dispatch(actions.toggleShowParams()),
      toggleHeaders: () => dispatch(actions.toggleShowHeaders()),
      saveClick: () => dispatch(actions.saveClick()),
      saveData: data => dispatch(saveData(data)),
      params: {
        addParamRow: () => dispatch(actions.addParamRow()),
        removeLastRow: () => dispatch(actions.removeLastRow()),
        changeParamKey: (id, val) => dispatch(actions.changeParamKey(id, val)),
        changeParamValue: (id, val) =>
          dispatch(actions.changeParamValue(id, val)),
        toggleParamStatus: id => dispatch(actions.changeParamStatus(id)),
        removeParam: id => dispatch(actions.removeSelectedParam(id))
      },
      headers: {
        addHeaderRow: () => dispatch(actions.addHeaderRow()),
        removeLastHeaderRow: () => dispatch(actions.removeLastHeader()),
        changeHeaderKey: (id, val) =>
          dispatch(actions.changeHeaderKey(id, val)),
        changeHeaderValue: (id, val) =>
          dispatch(actions.changeHeaderValue(id, val)),
        toggleHeaderStatus: id => dispatch(actions.changeHeaderStatus(id)),
        removeHeader: id => dispatch(actions.removeSelectedHeader(id))
      }
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPageContainer);
