import Head from "next/head";

import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import makeid from "../lib/random";

export default function GestaoUsuarios() {
  const [usuarios, setusuarios] = useState();
  const [usuario, setusuario] = useState();

  const [page, setpage] = useState(1);
  const [pages, setpages] = useState();
  const [nopages, setnopages] = useState();
  const [loading, setloading] = useState(false);
  const [nome, setnome] = useState();
  const [cargo, setcargo] = useState();
  const [email, setemail] = useState();
  const [Info, setInfo] = useState({});
  const [reload, setreload] = useState();

  var toaststate;
  var pagesarray = [];

  const Getusuarios = async () => {
    const res = await fetch("/api/usuarios/allusers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        page: page,
        info: Info,
      }),
    });
    const data = await res.json();
    setusuarios(data.usuarios);
    setnopages(data.pages);
    for (let index = 0; index < data.pages; index++) {
      var number = Number(index) + 1;
      pagesarray.push({ page: number });
    }
    setpages(pagesarray);
  };

  useEffect(() => {
    setusuarios(null);
    Getusuarios();
  }, [page, Info, reload]);

  const Prev = () => {
    if (page == 1) {
      return false;
    }
    setpage(Number(page) - 1);
  };

  const Next = () => {
    if (page == pages) {
      return false;
    }
    setpage(Number(page) + 1);
  };

  const EliminarUsuario = async () => {
    try {
      toaststate = toast.loading("aguarde...", { closeOnClick: true });

      const res = await fetch("/api/usuarios/eliminate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: usuario._id,
        }),
      });
      const data = await res.json();
      toast.update(toaststate, {
        render: data.message,
        type: "success",
        isLoading: false,
        closeOnClick: true,
        autoClose: false,
      });
    } catch (err) {
      const data = await res.json();
      toast.update(toaststate, {
        render: data.message,
        type: "error",
        isLoading: false,
        closeOnClick: true,
        autoClose: false,
      });
    }
  };

  const Cadastrar = async () => {
    toaststate = toast.loading("aguarde...", { closeOnClick: true });
    setloading(true);

    try {
      const res = await fetch("/api/usuarios/novo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.toLowerCase(),
          cargo: cargo,
          nome: nome,
        }),
      });
      const data = await res.json();
      toast.update(toaststate, {
        render: data.message,
        type: "success",
        isLoading: false,
        closeOnClick: true,
        autoClose: false,
      });
    } catch (err) {
      const data = await res.json();
      toast.update(toaststate, {
        render: data.message,
        type: "error",
        isLoading: false,
        closeOnClick: true,
        autoClose: false,
      });
    }

    const data = await res.json();
    toast.update(toaststate, {
      render: data.message,
      type: "success",
      isLoading: false,
      closeOnClick: true,
      autoClose: false,
    });
    setreload(makeid());
    setloading(false);
  };

  return (
    <div className="container">
      <Head>
        <title>Gestão do Usuário</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <ToastContainer />

        <div className="row">
          <div className="col-md-12">
            <h3 className="mt-3 mb-3">Gestão de Usuários</h3>
            <button
              className="btn btn-success btn-sm float-right"
              data-toggle="modal"
              data-target="#novo"
            >
              Novo <i className="fas fa-plus"></i>
            </button>
          </div>
          <div className="col-md-12">
            <div className="card mt-3">
              <div className="card-title mb-3">
                <div className="row">
                  <div className="col-md-4">
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fas fa-search"></i>
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Pesquisar"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body table-responsive p-0">
                <table className="table table-hover text-nowrap">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nome</th>
                      <th>Cargo</th>
                      <th>Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usuarios ? (
                      usuarios.map((e) =>
                        e.cargo != "Admin" ? (
                          <tr>
                            <td>{e._id.substring(0, 9)}</td>
                            <td>{e.nome}</td>
                            <td>{e.cargo}</td>
                            <td>{e.email}</td>
                            <td>
                              {" "}
                              <button
                                type="button"
                                className="close"
                                aria-label="Close"
                                data-toggle="modal"
                                data-target="#eliminar"
                                onClick={() => {
                                  setusuario(e);
                                }}
                              >
                                <span aria-hidden="true">
                                  {" "}
                                  <i className="fas fa-trash text-danger"></i>{" "}
                                </span>
                              </button>
                            </td>
                          </tr>
                        ) : (
                          ""
                        )
                      )
                    ) : (
                      <div className="overlay mb-5 mt-5 text-center">
                        <i className="fas fa-2x fa-sync-alt fa-spin"></i>
                      </div>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="card-footer clearfix">
                <ul className="pagination pagination-sm m-0 float-right">
                  <li className={`page-item  ${page == 1 ? "disabled" : ""}`}>
                    <a
                      href="#"
                      className="page-link"
                      onClick={() => {
                        Prev(page);
                      }}
                    >
                      Anterior
                    </a>
                  </li>

                  {pages &&
                    pages.map((n) => (
                      <li
                        className={`page-item  ${
                          page == n.page ? "active" : ""
                        }`}
                      >
                        <a
                          className="page-link"
                          onClick={() => {
                            setpage(n.page);
                          }}
                          href="#"
                        >
                          {n.page}
                        </a>
                      </li>
                    ))}

                  <li
                    className={`page-item  ${
                      page == nopages ? "disabled" : ""
                    }`}
                  >
                    <a
                      href="#"
                      className="page-link"
                      onClick={() => {
                        Next(page);
                      }}
                    >
                      Proximo
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div
          className="modal fade"
          id="eliminar"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <i className="fas fa-trash text-danger fa-2x"></i>
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <h3>
                  <p> Eliminar {usuario && usuario.nome} ?</p>
                </h3>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Cancela
                </button>

                {loading ? (
                  <button type="button" className="btn btn-danger">
                    <div className="spinner-border" role="status">
                      <span className="sr-only">Aguarde...</span>
                    </div>
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-warning"
                    onClick={() => {
                      EliminarUsuario();
                    }}
                  >
                    Elimina
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div
          className="modal fade"
          id="novo"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered ">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Criar Novo Usuário
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label for="nome">Nome</label>
                    <input
                      type="email"
                      className="form-control"
                      id="nome"
                      onChange={(e) => {
                        setnome(e.target.value);
                      }}
                      placeholder="Email do novo usuário"
                    />
                  </div>
                  <div className="form-group">
                    <label for="eamil">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="eamil"
                      onChange={(e) => {
                        setemail(e.target.value);
                      }}
                      placeholder="Email do novo usuário"
                    />
                  </div>
                  <div className="form-group">
                    <label for="cargo">Cargo</label>
                    <input
                      type="text"
                      className="form-control"
                      id="cargo"
                      placeholder="Cargo"
                      onChange={(e) => {
                        setcargo(e.target.value);
                      }}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancelar
                </button>

                {loading ? (
                  <button type="button" className="btn btn-primary">
                    <div className="spinner-border" role="status">
                      <span className="sr-only">Aguarde...</span>
                    </div>
                  </button>
                ) : email && nome && cargo ? (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      Cadastrar();
                    }}
                  >
                    Cadastrar
                  </button>
                ) : (
                  <button type="button" className="btn btn-primary" disabled>
                    Cadastrar
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
