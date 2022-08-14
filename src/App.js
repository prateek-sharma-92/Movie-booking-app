import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Authentication from "./Pages/Authentication/Authentication";
import Customer from "./Pages/Customer/Customer";
import { Routes, Route } from "react-router-dom";
import Client from "./Pages/Client/Client";
import Admin from "./Pages/Admin/Admin";
import Home from "./Pages/Home/Home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Authentication />} />
        <Route path="/Customer" element={<Customer />} />
        <Route path="/Client" element={<Client />} />
        <Route path="/Admin" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
