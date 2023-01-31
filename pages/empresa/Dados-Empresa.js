import Head from "next/head";
import Link from "next/link";

import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DadosEmpresa({ empresa }) {
  var toaststate;

  const [nome, setnome] = useState();
  const [email, setemail] = useState();
  const [passwored, setpasswored] = useState();

  const Cadastrar = async () => {
    toaststate = toast.loading("aguarde...", { closeOnClick: true });

    try {
      const res = await fetch("/api/usuarios/cliente", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.toLowerCase(),
          idempresa: empresa._id,
          nome: nome,
          passwored: passwored,
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

  return (
    <div className="container">
      <Head>
        <title>Dados da Empresa</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <ToastContainer />

        <div className="row">
          <div className="col-md-12 mt-2">
            <h3>Dados da Empresa</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 mt-5">
            <div className="card">
              <div className="card-header">
                <div className="card-title">
                  {" "}
                  <h5 className="mt-3 mb-3">Sobre a Empresa</h5>
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Nif</label>
                      <input
                        type="text"
                        className="form-control form-control-border border-width-2"
                        placeholder="nif..."
                        defaultValue={empresa && empresa.nif}
                      />
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="form-group">
                      <label>Nome Da Empresa</label>
                      <input
                        type="text"
                        className="form-control form-control-border border-width-2"
                        placeholder="nome da empresa..."
                        defaultValue={empresa && empresa.nome}
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>Segmento</label>
                      <input
                        defaultValue={empresa && empresa.segmento}
                        type="text"
                        className="form-control form-control-border border-width-2"
                        placeholder="Segmento..."
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Grupo de segmento</label>

                      <select
                        className="form-control form-control-border border-width-2"
                        defaultValue={empresa && empresa.gruposeg}
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
                        className="form-control form-control-border border-width-2"
                        defaultValue={empresa && empresa.categoria}
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
                        className="form-control form-control-border border-width-2"
                        defaultValue={empresa && empresa.regime}
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
            </div>
          </div>

          <div className="col-md-12 ">
            <div className="card">
              <div className="card-header">
                <div className="card-title">
                  <h5>Funcionario da Empresa</h5>
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Nome</label>
                      <input
                        type="text"
                        className="form-control form-control-border border-width-2"
                        placeholder="nome..."
                        onChange={(e) => {
                          setnome(e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        className="form-control form-control-border border-width-2"
                        placeholder="email..."
                        onChange={(e) => {
                          setemail(e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Senha</label>
                      <input
                        type="password"
                        className="form-control form-control-border border-width-2"
                        placeholder="senha..."
                        onChange={(e) => {
                          setpasswored(e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  <div className="col-md-12 text-center">
                    <button
                      onClick={Cadastrar}
                      className="btn btn-outline-primary"
                    >
                      Adicionar Acesso <i className="fa fa-plus"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
