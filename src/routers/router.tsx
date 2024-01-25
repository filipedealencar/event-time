import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "../screens/Login";
import { Register } from "../screens/Register";
import { Calendar } from "../screens/Calendar";
import ProtectedRoute from "./ProtectedRouter";

const Routers: React.FC = ({}) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Calendar />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
