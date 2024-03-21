import Customers from "../../Pages/Customers";
import Dashboard from "../../Pages/Dashboard";
import Inventory from "../../Pages/Inventory";
import Orders from "../../Pages/Orders";
import Login from "../../Pages/Login";
import { Route, Routes } from "react-router-dom";
import Teacher from "../../Pages/Teacher";
import CODTeacher from "../../Pages/Teacher/CODTeacher";
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/customers" element={<Customers />} />
      <Route path="/login" element={<Login />} />
      <Route path="/teacher" element={<Teacher />} />
      <Route path="/create_teacher" element={<CODTeacher />} />
    </Routes>
  );
}

export default AppRoutes;
