import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <Router>
          <Routes>
            <Route path="/" Component={Login} />
            <Route path="/home" Component={Home} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
