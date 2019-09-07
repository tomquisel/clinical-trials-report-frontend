import React from "react";
import "./App.css";
import Counter from "./components/Counter";
import Counter3 from "./components/Counter2";
import Decrement from "./components/Counter/Decrement";
import Increment from "./components/Counter/Increment";

import logo from "./logo.svg";

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <h3>Counter</h3>
        <Counter />
        <Decrement />
        <Increment />
        <h3>Counter 2</h3>
        <Counter3 />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
