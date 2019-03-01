import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Image, Segment, Menu } from "semantic-ui-react";

import GoogleOAuth from "../apis/GoogleOAuth";
import "../styles/App.css";
import "../styles/HeaderAnimation.css";

class Header extends Component {
  state = {
    url: null
  };

  getProfileImage = url => {
    this.setState({ url });
  };

  render() {
    return (
      <div>
        <div className="header-img" data-test="header-img">
          <div className="contain">
            <div className="title">API AGGREGATOR</div>
            <div className="subtitle">
              <h2>“A NEW WAY TO BUILD INTEGRATIONS„</h2>
            </div>
          </div>
          <div className="header-logo">
            <Image src={this.state.url} size="tiny" />
          </div>
        </div>
        <Segment inverted className="no_margin">
          <Menu inverted secondary pointing>
            <Menu.Item>
              <Link to="/">
                <h3>Home</h3>
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/data">
                <h3>Data</h3>
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/builder">
                <h3>Builder</h3>
              </Link>
            </Menu.Item>
            <Menu.Menu position="right">
              <GoogleOAuth getImage={this.getProfileImage} />
            </Menu.Menu>
          </Menu>
        </Segment>
      </div>
    );
  }
}

export default Header;
