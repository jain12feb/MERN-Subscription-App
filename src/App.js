import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Articles from "./pages/Articles";
import SubscriptionPlan from "./pages/SubscriptionPlan";
import Navbar from "./components/Nav";
import ProtectedRoute from "./ProtectedRoutes";
import AddArticle from "./pages/AddArticle";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/articles" element={<ProtectedRoute />}>
          <Route path="/articles" element={<Articles />} />
        </Route>
        <Route path="/add-article" element={<ProtectedRoute />}>
          <Route path="/add-article" element={<AddArticle />} />
        </Route>
        <Route path="/subscription-plans" element={<ProtectedRoute />}>
          <Route path="/subscription-plans" element={<SubscriptionPlan />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
