import { Outlet } from "react-router-dom";
import { NavbarPublic } from "../components";

const PublicLayout = () => {
  return (
    <>
      <header className="p-3">
        <NavbarPublic />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        this is footer
      </footer>
    </>
  )
};

export default PublicLayout;