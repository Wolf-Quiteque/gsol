import Head from "next/head";
import Link from "next/link";

import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Recuperacao() {
  return (
    <div className="login-box" style={{ marginTop: "200px" }}>
      <div className="card card-outline card-primary">
        <div className="card-header text-center">
          <a href="../../index2.html" className="h1">
            <b>Emarpe</b> RP
          </a>
        </div>
        <div className="card-body">
          <p className="login-box-msg">Esqueceste sua palavra passe ?</p>
          <form action="recover-password.html" method="post">
            <div className="input-group mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Seu Email"
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-envelope"></span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <button type="submit" className="btn btn-primary btn-block">
                  requira nova palavra passe
                </button>
              </div>
            </div>
          </form>
          <p className="mt-3 mb-1">
            <Link href="/login">
              <a>Login</a>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
