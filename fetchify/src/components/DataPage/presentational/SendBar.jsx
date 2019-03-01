import React, { Component } from "react";
import { Segment, Message, Icon, Button, Form, Ref } from "semantic-ui-react";
import PropTypes from "prop-types";

import { RE } from "../../../utils/constants";
import SendHeaderTable from "./SendHeaderTable";

class SendBar extends Component {
  inputURL = React.createRef();
  submitBtn = React.createRef();

  handleSubmit = e => {
    e.preventDefault();
    const active_headers = this.props.request.headers.filter(
      el => el.checked === true
    );
    const headerList = {};
    if (active_headers) {
      active_headers.map(el => (headerList[el.key] = el.value));
    }
    if (RE.test(this.inputURL.current.value) && this.props.request.body) {
      this.props.actions.sendData(
        this.inputURL.current.value,
        this.props.request.body,
        this.props.request.method,
        headerList
      );
    }
  };

  formSubmitHandler = e => {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.submitBtn.current.click();
    }
  };

  handleInputValidataion = () => {
    if (/\s/.test(this.inputURL.current.value)) {
      this.inputURL.current.value = this.inputURL.current.value
        .split(" ")
        .join("");
    }
    if (RE.test(this.inputURL.current.value)) {
      this.props.actions.validateURL(true);
    } else {
      this.props.actions.validateURL(false);
    }
    this.props.actions.setSendURL(this.inputURL.current.value);
  };

  showErrors = () => {
    if (!this.props.request.validation && this.props.request.url.length > 0) {
      return <Message error content="Invalid URL" />;
    }
  };

  showProcessStatus = () => {
    if (this.props.request.isLoading) {
      return (
        <Message color="yellow" icon>
          <Icon name="spinner" loading color="yellow" />
          <Message.Content content="Sending" />
        </Message>
      );
    } else if (this.props.request.error) {
      return (
        <Message icon color="red">
          <Icon name="times circle" color="red" />
          <Message.Content>
            <Message.Header>Error ocuring during send data</Message.Header>
            {this.props.request.error}
          </Message.Content>
        </Message>
      );
    } else if (this.props.request.status) {
      return (
        <Message color="green" icon>
          <Icon name="check circle outline" color="green" />
          <Message.Content content="Successfuly send data" />
        </Message>
      );
    }
  };

  showDataSelection = () => {
    if (Object.entries(this.props.customData).length > 0) {
      return (
        <div>
          <select className="ui blue button" onInput={e => this.props.actions.setSendBody(e.target.value)}>
            <option value={JSON.stringify(this.props.data)}>Saved data</option>
            <option value={JSON.stringify(this.props.customData)}>
              Custom data
            </option>
          </select>
        </div>
      );
    }
  };

  showHeaders = e => {
    e.preventDefault();
    this.props.actions.toggleHeadersButton();
  };

  render() {
    const validation =
      !this.props.request.validation && this.props.request.url.length
        ? "error"
        : "";
    const headersShow = this.props.togglers.headers ? "block" : "none";
    if (
      this.props.data.length ||
      Object.entries(this.props.customData).length
    ) {
      return (
        <div>
        <h2 className="home-head-title">Send your data</h2>
            
          <Segment color="blue" raised>
            <Form error onSubmit={this.handleSubmit}>
              <Form.Group>
                <Form.Field>
                  <select
                    className="ui blue button"
                    onInput={e =>
                      this.props.actions.changeMethod(e.target.value)
                    }
                  >
                    <option value="POST">POST</option>
                    <option value="PUT">PUT</option>
                    <option value="PATCH">PATCH</option>
                  </select>
                </Form.Field>
                <Form.Field width={14} className={validation}>
                  <div className="ui action input">
                    <input
                      type="text"
                      defaultValue={this.props.request.url}
                      placeholder="Enter URL here ..."
                      onChange={this.handleInputValidataion}
                      onKeyDown={this.formSubmitHandler}
                      ref={this.inputURL}
                    />
                    <Ref innerRef={this.submitBtn}>
                      <Button positive content="Send" />
                    </Ref>
                  </div>
                </Form.Field>
                <Form.Field>
                  <Button
                    primary
                    onClick={this.showHeaders}
                    content="Headers"
                  />
                </Form.Field>
              </Form.Group>
              <div style={{ display: headersShow }}>
                <SendHeaderTable
                  actions={this.props.actions.headers}
                  headers={this.props.request.headers}
                />
              </div>
              {this.showDataSelection()}
              {this.showErrors()}
            </Form>
            {this.showProcessStatus()}
          </Segment>
        </div>
      );
    } else {
      return null;
    }
  }
}

SendBar.propTypes = {
  actions: PropTypes.object.isRequired,
  request: PropTypes.object.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  togglers: PropTypes.object.isRequired,
  customData: PropTypes.object.isRequired
};

export default SendBar;
