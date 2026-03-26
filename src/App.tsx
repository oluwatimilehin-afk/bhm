import { Route, Routes } from "react-router";
import AppLayout from "./layouts/AppLayout";
import Home from "./pages/home";
import CaseStudies from "./pages/case-studies";
import ContactUs from "./pages/contact-us";

const App = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/case-studies"
          element={<CaseStudies />}
        />
        <Route
          path="/contact-us"
          element={<ContactUs />}
        />
      </Route>
    </Routes>
  );
};

export default App;
