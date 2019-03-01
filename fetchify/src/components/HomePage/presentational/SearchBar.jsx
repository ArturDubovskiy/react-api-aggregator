import React, { Component } from "react";
import {
  Label,
  Segment,
  Message,
  Form,
  Button,
  Ref,
  Transition
} from "semantic-ui-react";
import PropTypes from "prop-types";

import * as constants from "../../../utils/constants";
import ParamsTable from "./ParamsTable";
import HeadersTable from "./HeadersTable";

class SearchBar extends Component {
  inputURL = React.createRef();
  submitButton = React.createRef();
  inputBody = React.createRef();

  onFormSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.inputURL.current.value);
  };

  showButtonLabel = () => {
    const active = this.props.tables.params.filter(el => el.checked === true);
    if (active.length) {
      return (
        <Label basic pointing="left" color="blue">
          {active.length}
        </Label>
      );
    }
  };

  handleOnChange = () => {
    if (/\s/.test(this.inputURL.current.value)) {
      this.inputURL.current.value = this.inputURL.current.value
        .split(" ")
        .join("");
    }
    if (constants.RE.test(this.inputURL.current.value)) {
      this.props.actions.setURLError(null);
    } else {
      if (!this.inputURL.current.value.length) {
        this.props.actions.setURLError(constants.UCBB_ERROR);
      } else {
        this.props.actions.setURLError(constants.INVALID_URL);
      }
    }
    if (this.inputURL.current.value.includes("?")) {
      let splitedUrl = this.inputURL.current.value.split("?");
      this.props.actions.setURL(splitedUrl[0]);
      this.props.actions.setParams({});
      if (splitedUrl.length > 1) {
        let paramsList = splitedUrl[1].split("&");
        let params = [];
        paramsList.forEach(el => {
          let qparams = el.split("=");
          params.push({ [qparams[0]]: qparams[1] });

          // let diff = Object.keys(params).reduce((diff, key) => {
          //   if (this.state.tableParams[key] === params[key]) return diff
          //   return {
          //     ...diff,
          //     [key]: params[key]
          //   }
          // }, {})
          // if(diff) this.setState({notInTable: diff})
        });
        this.props.actions.setParams(params);
      }
    } else {
      this.props.actions.setURL(this.inputURL.current.value);
    }
  };

  handleBodyInput = () => {
    this.props.actions.setBodyError(null);
    try {
      JSON.parse(this.inputBody.current.value);
      this.props.actions.setBody(this.inputBody.current.value);
    } catch (error) {
      if (!this.inputBody.current.value) {
        this.props.actions.setBodyError(null);
      } else {
        this.props.actions.setBodyError(constants.INVALID_BODY);
      }
    }
  };

  showBodySection = () => {
    if (this.props.request.method === "POST") {
      return (
        <div>
          <textarea
            className="ui blue segment"
            placeholder={constants.SEND_BODY_PLACEHOLDER}
            onInput={this.handleBodyInput}
            onKeyDown={this.formSubmitHandler}
            ref={this.inputBody}
          />
          <Message error>{this.props.errors.body}</Message>
        </div>
      );
    }
  };

  showSelectMethodDropdown = () => {
    return (
      <select
        className="ui blue button"
        onInput={e => this.props.actions.setRequestMethod(e.target.value)}
      >
        <option value="GET">GET</option>
        <option value="POST">POST</option>
        <option value="PUT">PUT</option>
        <option value="PATCH">PATCH</option>
        <option value="DELETE">DELETE</option>
      </select>
    );
  };

  handleCheckParams = () => {
    const active_params = this.props.tables.params.filter(
      el => el.checked === true
    );
    if (active_params.length > 0) {
      this.inputURL.current.value =
        this.props.request.url +
        "?" +
        active_params.map(el => el.key + "=" + el.value).join("&");
    } else {
      this.inputURL.current.value = this.props.request.url;
    }
  };

  componentDidUpdate = prevProps => {
    if (this.props.tables !== prevProps.tables) {
      const active_headers = this.props.tables.headers.filter(
        el => el.checked === true
      );
      this.handleCheckParams();
      this.handleOnChange();
      if (active_headers.length > 0) {
        const headers = {};
        active_headers.forEach(el => (headers[el.key] = el.value));
        this.props.actions.setHeaders(headers);
      }
    }
  };

  componentDidMount = () => {
    this.handleCheckParams();
  };

  showErrors = () => {
    if (this.props.errors.url !== constants.UCBB_ERROR) {
      return this.props.errors.url;
    }
  };

  formSubmitHandler = e => {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.submitButton.current.click();
    }
  };

  render() {
    const url_error =
      this.props.errors.url && this.props.errors.url !== constants.UCBB_ERROR
        ? "error"
        : "";
    const visisble = Boolean(this.props.request.error);
    const disableInput = this.props.request.isLoading ? "disabled" : "";
    const isLoading = this.props.request.isLoading ? "loading" : "";
    const paramsShow = this.props.toggles.showParams ? "block" : "none";
    const headersShow = this.props.toggles.showHeaders ? "block" : "none";
    return (
      <Segment raised secondary color="blue">
        <Form error onSubmit={this.onFormSubmit} action="">
          <Form.Group>
            <Form.Field>{this.showSelectMethodDropdown()}</Form.Field>
            <Form.Field width={11} className={url_error}>
              <div className={`ui right labled ${disableInput} input`}>
                <input
                  type="text"
                  defaultValue={this.props.request.url}
                  placeholder={constants.SEND_URL_PLACEHOLDER}
                  onChange={this.handleOnChange}
                  onKeyDown={this.formSubmitHandler}
                  ref={this.inputURL}
                />
                <Button
                  onClick={this.props.actions.toggleParams}
                  type="button"
                  primary
                  content="Params"
                  label={this.showButtonLabel()}
                />
              </div>
            </Form.Field>
            <Form.Field>
              <Button
                onClick={this.props.actions.toggleHeaders}
                primary
                type="button"
                content="Headers"
              />
            </Form.Field>
            <Form.Field>
              <Ref innerRef={this.submitButton}>
                <Button
                  type="submit"
                  fluid
                  className={isLoading}
                  positive
                  content="Send"
                  icon="paper plane"
                />
              </Ref>
            </Form.Field>
          </Form.Group>
          <Message error content={this.showErrors()} />
          <Transition visible={visisble} animation="zoom" duration={500}>
            <Message error content={this.props.request.error} />
          </Transition>
          <div style={{ display: paramsShow }}>
            <ParamsTable
              data={this.props.tables.params}
              actions={this.props.actions.params}
            />
          </div>
          <div style={{ display: headersShow }}>
            <HeadersTable
              data={this.props.tables.headers}
              actions={this.props.actions.headers}
            />
          </div>
          {this.showBodySection()}
        </Form>
      </Segment>
    );
  }
}

SearchBar.propTypes = {
  request: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  toggles: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  tables: PropTypes.object.isRequired
};

export default SearchBar;
