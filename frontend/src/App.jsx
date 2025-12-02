import { Routes, Route } from "react-router";
import "./App.css";
import Home from "./pages/Home";
import LoginPage from "./pages/protected/LoginPage";
import RegisterPage from "./pages/protected/RegisterPage";
import UserProfile from "./pages/protected/UserProfile";

import ProtectedLayout from "./layout/ProtectedLayout";
import NotFound from "./components/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="*" element={<NotFound />} />

      {/** Protected layout */}
      <Route element={<ProtectedLayout />}>
        <Route path="profile" element={<UserProfile />} />
      </Route>
    </Routes>
  );
}

export default App;
