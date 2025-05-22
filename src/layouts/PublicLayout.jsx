import { Outlet } from "react-router-dom";
import HeaderPublic from "../components/layout/HeaderPublic";
import Footer from "../components/layout/Footer";
import Notifications from "../components/layout/Notifications";

export default function PublicLayout() {
  return (
      <div className="content-container">
        <HeaderPublic />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
  );
}
