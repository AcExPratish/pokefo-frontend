import { BrowserRouter, Route, Routes } from "react-router-dom";
import VerificationCode from "./modules/auth/verify/VerificationCode";
import "./App.css";
import Success from "./modules/auth/verify/Success";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<VerificationCode />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
