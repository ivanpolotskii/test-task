import DisplayComponent from "./components/DisplayComponent ";
import FormComponent from "./components/FormComponent";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<FormComponent />} />
          <Route path="/formresuts" element={<DisplayComponent />} />
        </Routes>
    </Router>
  );
}

export default App;
