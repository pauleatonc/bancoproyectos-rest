
export const Sidebar = () =>
{

  return (
    <div className="sidebar d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary">
      <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
        <div className="line-container row">
          <div id="lineBlue" />
          <div id="lineRed" />
        </div>
        <span className="fs-4 ml-4"><u>Banco de Proyecto</u></span>
      </a>
        <p className="text-end">Admin</p>
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <a href="#" className="nav-link active" aria-current="page">
            Home
          </a>
        </li>
        <li>
          <a href="#" className="nav-link link-body-emphasis">

            Dashboard
          </a>
        </li>
        <li>
          <a href="#" className="nav-link link-body-emphasis">
            Orders
          </a>
        </li>
        <li>
          <a href="#" className="nav-link link-body-emphasis">
            Products
          </a>
        </li>
        <li>
          <a href="#" className="nav-link link-body-emphasis">
            Customers
          </a>
        </li>
      </ul>
      <div className="dropdown">
        <a href="#" className="d-flex align-items-center link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
          <img src="" alt="" width="32" height="32" className="rounded-circle me-2" />
          <strong>mdo</strong>
        </a>
        <ul className="dropdown-menu text-small shadow">
          <li><a className="dropdown-item" href="#">New project...</a></li>
          <li><a className="dropdown-item" href="#">Settings</a></li>
          <li><a className="dropdown-item" href="#">Profile</a></li>
          <li><a className="dropdown-item" href="#">Sign out</a></li>
        </ul>
      </div>
    </div>
  )
}
