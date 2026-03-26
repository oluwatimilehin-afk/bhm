import { Outlet } from "react-router";
import KronusFooter from "../components/KronusFooter";

const AppLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <Outlet />
      </main>
      <KronusFooter />
    </div>
  );
};

export default AppLayout;
