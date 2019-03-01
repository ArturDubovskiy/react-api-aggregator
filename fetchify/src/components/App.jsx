import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";

import MainPage from "./HomePage/container/MainPageContainer";
import DataPage from "./DataPage/container/savedDataContainer";
import BodyBuilder from "./BodyBuilder/container/BodyBuilderContainer";
import Header from "./Header";
import "../styles/App.css";

class App extends Component {
  render() {
    return (
      <Container>
        <BrowserRouter>
          <div>
            <Header />
            <Route path="/" exact component={MainPage} />
            <Route path="/data" exact component={DataPage} />
            <Route path="/builder" exact component={BodyBuilder} />
          </div>
        </BrowserRouter>
      </Container>
    );
  }
}

export default App;
