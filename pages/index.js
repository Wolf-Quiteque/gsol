import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import makeid from "../lib/random";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useRef, useState, useEffect } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  var toaststate;
  const router = useRouter();

  const [empresas, setempresas] = useState();
  const [page, setpage] = useState(1);
  const [pages, setpages] = useState();
  const [nopages, setnopages] = useState();
  const [reload, setreload] = useState();
  const [usuario, setusuario] = useState("A");
  const [file, setFile] = useState();

  const [nif, setnif] = useState();
  const [nomeEmpresa, setnomeEmpresa] = useState();
  const [telefone, setPhone] = useState();
  const [gruposeg, setgruposeg] = useState("Comércio");
  const [regime, setregime] = useState("Lucro Real");
  const [categoria, setcategoria] = useState("A");
  const [anunciotext, setanunciotext] = useState("");
  const [img, setimg] = useState(false);

  const [Info, setInfo] = useState({});

  var pagesarray = [];

  const getEmpresa = async () => {
    const res = await fetch("/api/empresa/getempresa", {
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
    setempresas(data.empresa);
    setnopages(data.pages);
    for (let index = 0; index < data.pages; index++) {
      var number = Number(index) + 1;
      pagesarray.push({ page: number });
    }
    setpages(pagesarray);
  };

  const Sendanuncio = async () => {
    toaststate = toast.loading("aguarde...", { closeOnClick: true });

    var result;

    if (file) {
      const formdata = new FormData();
      const fileName = Date.now() + file.name;
      formdata.append("file", file);
      formdata.append("name", fileName);
      formdata.append("upload_preset", "ipo-uploads");

      result = await fetch(
        "https://api.cloudinary.com/v1_1/quitopia/image/upload",
        {
          method: "Post",
          body: formdata,
        }
      ).then((r) => r.json());
    }

    const res = await fetch("/api/anuncio/novo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        img: img ? result.url : "none",
        text: anunciotext ? anunciotext : "none",
        idEmpresa: "all",
        createdTime: new Date(),
      }),
    });

    if (res.status == 200) {
      toast.update(toaststate, {
        render: "Anúncio Criado",
        type: "success",
        isLoading: false,
        closeOnClick: true,
        autoClose: 1300,
      });
      setanunciotext("");
      setimg(null);
      setFile(null);
    } else {
      toast.update(toaststate, {
        render: result.error,
        type: "error",
        isLoading: false,
        closeOnClick: true,
        autoClose: 1300,
      });
    }
  };

  useEffect(() => {
    setempresas(null);
    getEmpresa();
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

  const NovaEmpresa = async () => {
    toaststate = toast.loading("aguarde...", { closeOnClick: true });

    const res = await fetch("/api/empresa/novaempresa", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: nomeEmpresa,
        regime: regime,
        categoria: categoria,
        gruposeg: gruposeg,
        telefone: telefone,
        nif: nif,
        id_usuario: session.user.email,
      }),
    });

    if (res.status == 200) {
      toast.update(toaststate, {
        render: "Empresa Criado",
        type: "success",
        isLoading: false,
        closeOnClick: true,
        autoClose: 1300,
      });
    } else {
      toast.update(toaststate, {
        render: result.error,
        type: "error",
        isLoading: false,
        closeOnClick: true,
        autoClose: 1300,
      });
    }
    $(".value").val("");
    $("#novaempresa").modal("hide");
    setreload(makeid());
  };

  useEffect(() => {
    const changeimg = () => {
      if (file) {
        setimg(URL.createObjectURL(file));
      }
    };
    changeimg();
  }, [file]);

  return (
    <div className="container" style={{ backgroundColor: "grey" }}>
      <Head>
        <title>Gsmart</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <ToastContainer />
        <div className="row">
          <div className="col-md-12">
            {" "}
            <h3 className="mt-3 mb-3">Criar Anúncio</h3>
          </div>

          <div className="col-md-4">
            {img && (
              <div className="mb-3">
                <img src={img} className="img-thumbnail" />
              </div>
            )}
            <div>
              <textarea
                className="form-control"
                value={anunciotext}
                onChange={(e) => {
                  setanunciotext(e.target.value);
                }}
              />
            </div>
            <div className="mt-3">
              {img ? (
                <button
                  onClick={() => {
                    setimg(null);
                    setFile(null);
                  }}
                  className="btn btn-lg btn-outline-danger"
                >
                  Remover foto <i className="bi bi-image"></i>
                </button>
              ) : (
                <label htmlFor="file">
                  {" "}
                  <a className="btn btn-lg btn-outline-success">
                    Adicionar foto
                  </a>
                  <input
                    type="file"
                    id="file"
                    accept=".png,.jpeg,.jpg"
                    onChange={(e) => setFile(e.target.files[0])}
                    style={{ display: "none" }}
                  />
                </label>
              )}
              {anunciotext || img ? (
                <button
                  onClick={Sendanuncio}
                  className="btn btn-lg btn-success ml-2"
                >
                  Postar
                </button>
              ) : (
                <button
                  className="btn btn-lg btn-success disabled ml-2"
                  disabled
                >
                  Postar
                </button>
              )}
            </div>
          </div>
        </div>

        <hr className="mt-5" />
        <div className="row">
          <div className="col-md-12">
            <h3 className="mt-4">Empresas</h3>
            <button
              data-toggle="modal"
              data-target="#novaempresa"
              className="btn btn-sm btn-outline-success float-right"
            >
              <i className="fa fa-plus"></i>
            </button>
          </div>
        </div>

        <div className="card mt-3">
          <div className="card-body table-responsive p-0">
            <table className="table table-hover text-nowrap">
              <thead>
                <tr>
                  <th>Nif</th>
                  <th>Empresa</th>
                  <th>Categoria</th>
                  <th>Telefone</th>
                </tr>
              </thead>
              <tbody>
                {session && empresas ? (
                  empresas.map((e) => (
                    <tr
                      className="dedo"
                      onClick={() => {
                        router.replace("/empresa/" + e._id);
                      }}
                    >
                      <td>{e.nif.substring(0, 9)}</td>
                      <td>{e.nome}</td>
                      <td>{e.categoria}</td>
                      <td>{e.telefone}</td>
                    </tr>
                  ))
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
                    className={`page-item  ${page == n.page ? "active" : ""}`}
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

              <li className={`page-item  ${page == nopages ? "disabled" : ""}`}>
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
        <div
          className="modal fade"
          id="novaempresa"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div
            className="modal-dialog modal-dialog-centered modal-lg"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title"> Nova Empresa</h5>
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
                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Nif</label>

                      <input
                        onChange={(e) => {
                          setnif(e.target.value);
                        }}
                        type="text"
                        className="form-control form-control-border value border-width-2"
                        placeholder="nif..."
                      />
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="form-group">
                      <label>Nome Da Empresa</label>
                      <input
                        onChange={(e) => {
                          setnomeEmpresa(e.target.value);
                        }}
                        type="text"
                        className="form-control form-control-border value border-width-2"
                        placeholder="nome da empresa..."
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>Telefone</label>
                      <input
                        onChange={(e) => {
                          setPhone(e.target.value);
                        }}
                        type="text"
                        className="form-control form-control-border value border-width-2"
                        placeholder="Nº Telefone..."
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Grup de Segmento</label>
                      <select
                        className="form-control form-control-border value border-width-2"
                        onChange={(e) => {
                          setgruposeg(e.target.value);
                        }}
                      >
                        <option value="Comércio">Comércio</option>
                        <option value="Indústria">Indústria</option>
                        <option value="Serviço">Serviço</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Categoria</label>
                      <select
                        className="form-control form-control-border value border-width-2"
                        onChange={(e) => {
                          setcategoria(e.target.value);
                        }}
                      >
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Regime de Tributação</label>
                      <select
                        className="form-control form-control-border value border-width-2"
                        onChange={(e) => {
                          setregime(e.target.value);
                        }}
                      >
                        <option value="Simples Nacional">
                          Simples Nacional
                        </option>
                        <option value="Lucro Real">Lucro Real</option>
                        <option value="Lucro Presumido">Lucro Presumido</option>
                        <option value="Outra">Outra</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Cancela
                </button>
                {nomeEmpresa &&
                telefone &&
                categoria &&
                gruposeg &&
                regime &&
                nif ? (
                  <button
                    type="button"
                    onClick={() => {
                      NovaEmpresa();
                    }}
                    className="btn btn-success"
                  >
                    Criar
                  </button>
                ) : (
                  <button type="button" className="btn btn-success" disabled>
                    Criar
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
