import { Outlet } from "react-router-dom";
import Header from "../components/layout/header/Header";
import Footer from "../components/layout/Footer";
import Notifications from "../components/layout/Notifications";

export default function PublicLayout() {
  return (
      <div className="content-container">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
  );
}
