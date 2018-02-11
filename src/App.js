import React, {Component} from "react";
import "./App.css";
import FilterHub from "./FilterHub";

class App extends Component {
  render () {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          <LinkList />
        </p>
      </div>
    );
  }
}

export default App;
