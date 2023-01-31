import React, { useState } from "react";
import Interweave from "interweave";

export default function Card(props) {
  var estrels = " ";
  if (props.cliente) {
    for (let index = 0; index < props.cliente.interesse; index++) {
      estrels += " <i class='text-warning fa fa-star'></i>";
    }
  }

  const verCliente = () => {
    props.cliente.estrelas = estrels;
    props.onClick(props.cliente);
  };

  return (
    <>
      <div
        className={`callout  ${props.class}`}
        style={{ marginBottom: "5px" }}
      >
        <h5>
          <a
            href="#"
            data-toggle="modal"
            data-target="#modal-lg"
            onClick={() => verCliente()}
          >
            {props.cliente ? props.cliente.nome : ""}
          </a>
        </h5>
        <h6>{props.cliente ? props.cliente.proffisao : ""}</h6>
        <p>{props.cliente ? props.cliente.desc : ""}</p>

        <p>
          <Interweave content={estrels} />
        </p>
        <div className="row">
          <div className="col-md-3">
            {" "}
            <div className="image">
              <img
                src={
                  props.cliente.imgurl
                    ? props.cliente.imgurl
                    : "https://randomuser.me/api/portraits/men/31.jpg"
                }
                className="img-circle elevation-2"
                height="30px"
                alt="User Image"
              />{" "}
            </div>
          </div>
          <div className="col-md-3">
            <span style={{ marginLeft: "8px" }}>
              {" "}
              <a href="">
                {" "}
                <i className="text-success fa fa-phone"></i>{" "}
              </a>{" "}
            </span>
          </div>
          <div className="col-md-3">
            <span style={{ marginLeft: "8px" }}>
              {" "}
              <a href="">
                {" "}
                <i className="text-info fa fa-video"></i>{" "}
              </a>{" "}
            </span>
          </div>

          <div className="col-md-3">
            <span style={{ marginLeft: "8px" }}>
              {" "}
              <a href="">
                {" "}
                <i className="text-warning fa fa-envelope"></i>{" "}
              </a>{" "}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
