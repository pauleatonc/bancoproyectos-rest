import { NavbarUser, Sidebar } from "../components/Dashboard";
import { Outlet } from 'react-router-dom';

const DashboardLayout = () =>
{
  return (
    <>
      <div className="cols-12">
        <div className="row">
          <div className="col-3">
            <Sidebar />
          </div>
          <div className="col-9">
            <NavbarUser />
            <Outlet />
          </div>
        </div>
      </div>
    </>

  )

}

export default DashboardLayout; 