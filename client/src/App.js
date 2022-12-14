import logo from "./logo.svg";
import "./App.css";
import React from "react";

function App() {
  const [conn, setConn] = React.useState([]);

  React.useEffect(() => {
    fetch("http://localhost:5000/")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setConn(data["name"]);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>{conn}</p>
      </header>
    </div>
  );
}

export default App;
