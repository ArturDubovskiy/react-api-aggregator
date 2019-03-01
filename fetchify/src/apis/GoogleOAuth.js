import React, { Component } from "react";
import { CLIENT_ID, SCOPES } from "./client.config";

class GoogleOAuth extends Component {
  state = { isSignedIn: null };

  componentWillMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId: CLIENT_ID,
          scope: SCOPES
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.setState({ isSignedIn: this.auth.isSignedIn.get() });
          this.auth.isSignedIn.listen(this.onAuthChange);
          if (this.auth.isSignedIn.get()) {
            this.imageLink = this.auth.currentUser
              .get()
              .getBasicProfile()
              .getImageUrl();
            this.props.getImage(this.imageLink);
          }
        });
    });
  }

  onAuthChange = () => {
    if (this.auth.isSignedIn.get()) {
      this.props.getImage(this.imageLink);
    } else {
      this.props.getImage(null);
    }
    this.setState({ isSignedIn: this.auth.isSignedIn.get() });
  };

  onSignIn = () => {
    this.auth.signIn();
  };

  onSignOut = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.state.isSignedIn === null) {
      return null;
    } else if (this.state.isSignedIn) {
      return (
        <div onClick={this.onSignOut} className="ui red google button">
          <i className="google icon" />
          SIGN OUT
        </div>
      );
    } else {
      return (
        <button onClick={this.onSignIn} className="ui red google button">
          <i className="google icon" />
          SIGN IN
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

export default GoogleOAuth;
