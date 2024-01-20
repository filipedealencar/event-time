import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./screens/Login";

const Routers: React.FC = ({}) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
