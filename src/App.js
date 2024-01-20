import {BrowserRouter as Router,Routes,Route,Link} from "react-router-dom";
import Home from "./Home";
import Products from "./Products";
import Contact from "./Contact";
import SingleProduct from "./SingleProduct";
import Filtered from "./Filtered";
import Register from "./Register";
import Login from "./Login";
import Cart from "./Cart";
import UserSettings from "./UserSettings";

function App() {
  return (
    <div className="App">
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<SingleProduct />} />
          <Route path="/filter" element={<Filtered />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/settings" element={<UserSettings />} />
        </Routes>
      </div>
    </Router>
    </div>
  );
}

export default App;