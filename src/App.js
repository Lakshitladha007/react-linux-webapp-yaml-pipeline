import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          App 12 is running in{" "}
          {process.env.NODE_ENV != "production"
            ? process.env.REACT_APP_ENVIRONMENT_LOCAL
            : process.env.REACT_APP_ENVIRONMENT_PROD}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
  console.log(process.env.NODE_ENV);
  console.log(REACT_APP_ENVIRONMENT_PRODs);
}

export default App;
