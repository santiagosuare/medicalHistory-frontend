import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import MedicalConsultation from "./components/MedicalConsultation";
import MedicalHistory from "./components/MedicalHistory";

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <Router>
          <Routes>
            <Route path="/" Component={Login} />
            <Route path="/home" Component={Home} />
            <Route
              path="/MedicalConsultation"
              Component={MedicalConsultation}
            />
            <Route path="/MedicalHistory" Component={MedicalHistory} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
