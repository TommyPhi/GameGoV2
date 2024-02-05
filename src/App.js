import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// Import the components & pages
import Home from "./Home";
import Products from "./Products";
import Contact from "./Contact";
import SingleProduct from "./SingleProduct";
import Filtered from "./Filtered";
import Register from "./Register";
import Login from "./Login";
import Cart from "./Cart";
import UserSettings from "./UserSettings";

// This is the main component that holds the routes for the application. It uses the BrowserRouter component from the react-router-dom library to wrap the Routes and Route components. The Routes component holds the Route components that define the paths and the components that will be rendered when the paths are matched. The Route components use the element prop to specify the component that will be rendered when the path is matched.
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
