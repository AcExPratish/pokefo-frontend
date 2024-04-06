import { BrowserRouter, Route, Routes } from "react-router-dom";
import VerificationCode from "./modules/auth/verify/VerificationCode";
import "./App.css";
import Success from "./modules/auth/verify/Success";

function App() {
  return (
    <>
      <BrowserRouter basename="pokefo-frontend">
        <Routes>
          <Route path="/pokefo-frontend" element={<VerificationCode />} />
          <Route path="/pokefo-frontend/success" element={<Success />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
