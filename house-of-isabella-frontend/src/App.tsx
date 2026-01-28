import { Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header/Header";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import NewInPage from "./pages/NewInPage/NewInPage";
import ProductDetailsPage from "./pages/ProductDetailsPage/ProductDetailsPage";
import CartDrawer from "./components/CartDrawer/CartDrawer"; 
import WishlistPage from "./pages/WishlistPage/WishlistPage";
import ChatWidget from "./components/ChatWidget/ChatWidget";
import ContactUs from "./pages/ContactUs/ContactUs";
function App() {
  return (
    <>
      <Header />
      <CartDrawer />
      <ChatWidget />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<NewInPage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
