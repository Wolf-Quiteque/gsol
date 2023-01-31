import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import DadosEmpresa from "../../pages/empresa/Dados-Empresa";
import Dashboard from "../../pages/empresa/Dashboard";
import Fonte from "../../pages/empresa/Fonte";
import Demostracao from "../../pages/empresa/Demostracao";
import Balanco from "../../pages/empresa/Balanco";
import Balancete from "../../pages/empresa/Balancete";
import PlanoConta from "../../pages/empresa/Plano-conta";
export default function EmpresaLayout({ children, empresa }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [usuario, setusuario] = useState();
  const [view, setview] = useState(children);

  const getsession = async () => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  };

  const getinfo = async () => {
    const res = await fetch("/api/usuarios/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: session.user.email,
      }),
    });
    const data = await res.json();
    setusuario(data);
  };

  useEffect(() => {
    getsession();
    if (session) {
      getinfo();
    }
  }, [status, session]);

  return (
    <>
      <>
        <div className={"wrapper"}>
          <nav className="main-header navbar navbar-expand navbar-white navbar-light sticky-top">
            <ul className="navbar-nav ">
              <li className="nav-item mt-1">
                <h4>
                  <i className=" fas fa-solid fa-circle text-info"></i> EMPRESA
                </h4>
              </li>

              <li className="nav-item">
                <a
                  href="#dashboard"
                  onClick={() => {
                    setview(<Dashboard empresa={empresa} />);
                  }}
                  className="nav-link"
                >
                  Chatroom
                </a>
              </li>

              <li className="nav-item">
                <a
                  href="#dados"
                  onClick={() => {
                    setview(<DadosEmpresa empresa={empresa} />);
                  }}
                  className="nav-link"
                >
                  Dados da Empresa
                </a>
              </li>

              {/* <li className="nav-item dropdown">
            <a
              id="dropdownSubMenu1"
              href="#"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              className="nav-link dropdown-toggle"
            >
              Clientes
            </a>
            <ul
              aria-labelledby="dropdownSubMenu1"
              className="dropdown-menu border-0 shadow"
            >
              <li>
                <Link href="/cliente-pipeline">
                  <a className="dropdown-item">Pipeline</a>
                </Link>
              </li>

              <li>
                <a href="#/vendas" className="dropdown-item">
                  Vendas
                </a>
              </li>

              <li>
                <a href="#/crm-clientes" className="dropdown-item">
                  Ver clientes
                </a>
              </li>
            </ul>
          </li>

          <li className="nav-item dropdown">
            <a
              id="dropdownSubMenu1"
              href="#"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              className="nav-link dropdown-toggle"
            >
              Negociações
            </a>
            <ul
              aria-labelledby="dropdownSubMenu1"
              className="dropdown-menu border-0 shadow"
            >
              <li>
                <a href="#/negociacao" className="dropdown-item">
                  Nova
                </a>
              </li>
              <li>
                <a href="#" className="dropdown-item">
                  ver negociações
                </a>
              </li>
            </ul>
          </li>

          <li className="nav-item dropdown">
            <a
              id="dropdownSubMenu1"
              href="#"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              className="nav-link dropdown-toggle"
            >
              Empresas
            </a>
            <ul
              aria-labelledby="dropdownSubMenu1"
              className="dropdown-menu border-0 shadow"
            >
              <li>
                <Link href="/cadastar-empresa">
                  <a className="dropdown-item">Nova</a>
                </Link>
              </li>
              <li>
                <Link href="/ver-empresas">
                  <a className="dropdown-item">Gerir Empresas</a>
                </Link>
              </li>
            </ul>
          </li>*/}
            </ul>

            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-widget="navbar-search"
                  href="#"
                  role="button"
                >
                  Pesquisa Empresa &nbsp; <i className="fas fa-search"></i>
                </a>
                <div className="navbar-search-block">
                  <form className="form-inline">
                    <div className="input-group input-group-sm">
                      <input
                        className="form-control form-control-navbar"
                        type="search"
                        placeholder="Pesquisar Empresa"
                        aria-label="Search"
                      />
                      <div className="input-group-append">
                        <button className="btn btn-navbar" type="submit">
                          <i className="fas fa-search"></i>
                        </button>
                        <button
                          className="btn btn-navbar"
                          type="button"
                          data-widget="navbar-search"
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </li>
              <li></li>
              <li className="nav-item dropdown">
                <a className="nav-link" data-toggle="dropdown" href="#">
                  <i className="far fa-bell"></i>
                  <span className="badge badge-warning navbar-badge">15</span>
                </a>
                <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                  <span className="dropdown-item dropdown-header">
                    15 Notifications
                  </span>
                  <div className="dropdown-divider"></div>
                  <a href="#" className="dropdown-item">
                    <i className="fas fa-envelope mr-2"></i> 4 new messages
                    <span className="float-right text-muted text-sm">
                      3 mins
                    </span>
                  </a>
                  <div className="dropdown-divider"></div>
                  <a href="#" className="dropdown-item">
                    <i className="fas fa-users mr-2"></i> 8 friend requests
                    <span className="float-right text-muted text-sm">
                      12 hours
                    </span>
                  </a>
                  <div className="dropdown-divider"></div>
                  <a href="#" className="dropdown-item">
                    <i className="fas fa-file mr-2"></i> 3 new reports
                    <span className="float-right text-muted text-sm">
                      2 days
                    </span>
                  </a>
                  <div className="dropdown-divider"></div>
                  <a href="#" className="dropdown-item dropdown-footer">
                    See All Notifications
                  </a>
                </div>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#"
                  role="button"
                  onClick={signOut}
                >
                  <i className="fas fa-power-off text-danger"></i>
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#" role="button">
                  <i className="fas fa-user"></i>
                </a>
              </li>

              <li className="nav-item">
                <a
                  className="nav-link"
                  data-widget="fullscreen"
                  href="#"
                  role="button"
                >
                  <i className="fas fa-expand-arrows-alt"></i>
                </a>
              </li>
            </ul>
          </nav>

          <aside className="main-sidebar sidebar-dark-primary elevation-4 ">
            <Link href="/">
              <a className="brand-link">
                <span className="brand-text font-weight-light">GSMART</span>
              </a>
            </Link>

            <div className="sidebar">
              <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                <div className="image">
                  <img
                    src="https://randomuser.me/api/portraits/men/24.jpg"
                    className="img-circle elevation-2"
                    alt="User Image"
                  />
                </div>
                <div className="info">
                  <a href="#" className="d-block">
                    Usuario
                  </a>
                </div>
              </div>

              <div className="form-inline">
                <div className="input-group" data-widget="sidebar-search">
                  <input
                    className="form-control form-control-sidebar"
                    type="search"
                    placeholder="Pesquisar"
                    aria-label="Search"
                  />
                  <div className="input-group-append">
                    <button className="btn btn-sidebar">
                      <i className="fas fa-search fa-fw"></i>
                    </button>
                  </div>
                </div>
              </div>

              <nav className="mt-2">
                <ul
                  className="nav nav-pills nav-sidebar flex-column"
                  data-widget="treeview"
                  role="menu"
                  data-accordion="false"
                >
                  <li className="nav-item">
                    <a href="../gallery.html" className="nav-link">
                      <i className="nav-icon fas fa-cog"></i>
                      <p>Configurações</p>
                    </a>
                  </li>
                  <hr />

                  {/* <li className="nav-item">
                    <a
                      href="#demostracao"
                      className="nav-link"
                      onClick={() => {
                        setview(<Demostracao empresa={empresa} />);
                      }}
                    >
                      <i className="nav-icon fas fa-clone"></i>
                      <p>Demonstraçoes</p>
                    </a>
                  </li> */}
                </ul>
              </nav>
            </div>
          </aside>
          <div className="content-wrapper">
            <div className="content">
              <div className="container">{view}</div>
            </div>
          </div>
        </div>
      </>
    </>
  );
}
