import Head from "next/head";
import { ObjectId } from "bson";
import dynamic from "next/dynamic";
import NumberFormat from "react-number-format";
import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-data-grid/dist/react-data-grid.css";
const DataGrid = dynamic(() => import("react-data-grid"), { ssr: false });

export default function Demostracao({ empresa }) {
  var balancorow = [];
  var newrows = [];
  var meses = [];

  const [dre, setdre] = useState();

  const [ano, setano] = useState("2022");
  const [mes, setmes] = useState();
  const [balanco, setbalanco] = useState();

  const [balancorows, setbalancorows] = useState([
    {
      designacao: "Activos Não Correntes",
    },
    { designacao: "Imobilizacoes Corporeas" },
    { designacao: "Imobilizacoes Incorporeas" },
    { designacao: "Investimentos em Subsidiarias" },
    { designacao: "Outros Activos Financeiros" },
    { designacao: "Outros Activos Nao Correntes" },
    { designacao: "Existencias" },
    { designacao: "Contas A Receber" },
    { designacao: "Disponibilidades" },
    { designacao: "Outros Activos Correntes" },
    { designacao: "Total activo" },
    { designacao: "Capital" },
    { designacao: "Reservas" },
    { designacao: "Resultados Transitados" },
    { designacao: "Resultados De Exercicio" },
    { designacao: "Emprestimo De Medio E Longo Prazo" },
    { designacao: "Impostos Deferidos" },
    { designacao: "Provisoes Para Pensoes" },
    { designacao: "Provisoes Para Outros Riscos Encargos" },
    { designacao: "Outros Passivos Nao Correntes" },
    { designacao: "Contas A Pagar" },
    { designacao: "Emprestimo De Curto Prazo" },
    { designacao: "Parte Cor Empr Media Longo Prazo" },
    { designacao: "Outros Passivos Correntes" },
    { designacao: "Total Capital Próprio E Passivo" },
  ]);

  const [balancocolumns, setbalancocolumns] = useState();

  meses;

  const getDRE = async () => {
    const res = await fetch("/api/empresa/getdre", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_empresa: new ObjectId(empresa._id),
      }),
    });
    const data = await res.json();
    setdre(data);
  };

  const getBalanco = async () => {
    const res = await fetch("/api/empresa/getBalanco", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_empresa: new ObjectId(empresa._id),
        ano: ano,
        mes: mes == "todos" ? "" : mes,
      }),
    });
    const data = await res.json();
    setbalanco(data);

    var datalenght = Number(data.length) - 1;
    meses.push({
      key: "designacao",
      name: "Designação",
      resizable: false,
      frozen: true,
      width: 300,
    });

    for (let index = 0; index < data.length; index++) {
      if (data[5]) {
        meses.push({ key: data[index].mes, name: data[index].mes, width: 200 });
      } else {
        meses.push({ key: data[index].mes, name: data[index].mes });
      }

      if (index == datalenght) {
        balancorow.push({
          designacao: (
            <span style={{ fontWeight: "900" }}>Activos Não Correntes</span>
          ),
        });

        balancorow.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].imobilizacoes_corporeas}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[0] && (
                <NumberFormat
                  value={data[0].imobilizacoes_corporeas}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          designacao: "Imobilizacoes Corporeas",
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].imobilizacoes_corporeas}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[1] && (
                <NumberFormat
                  value={data[1].imobilizacoes_corporeas}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),

          marco:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].imobilizacoes_corporeas}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[2] && (
                <NumberFormat
                  value={data[2].imobilizacoes_corporeas}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          abril:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].imobilizacoes_corporeas}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[3] && (
                <NumberFormat
                  value={data[3].imobilizacoes_corporeas}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          maio:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].imobilizacoes_corporeas}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[4] && (
                <NumberFormat
                  value={data[4].imobilizacoes_corporeas}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          junho:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].imobilizacoes_corporeas}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[5] && (
                <NumberFormat
                  value={data[5].imobilizacoes_corporeas}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          julho:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].imobilizacoes_corporeas}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[6] && (
                <NumberFormat
                  value={data[6].imobilizacoes_corporeas}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          agosto:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].imobilizacoes_corporeas}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[7] && (
                <NumberFormat
                  value={data[7].imobilizacoes_corporeas}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          setembro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].imobilizacoes_corporeas}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[8] && (
                <NumberFormat
                  value={data[8].imobilizacoes_corporeas}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          outubro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].imobilizacoes_corporeas}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[9] && (
                <NumberFormat
                  value={data[9].imobilizacoes_corporeas}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          novembro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].imobilizacoes_corporeas}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[10] && (
                <NumberFormat
                  value={data[10].imobilizacoes_corporeas}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          dezembro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].imobilizacoes_corporeas}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[11] && (
                <NumberFormat
                  value={data[11].imobilizacoes_corporeas}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });

        balancorow.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].imobilizacoes_incorporeas}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[0] && (
                <NumberFormat
                  value={data[0].imobilizacoes_incorporeas}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          designacao: "Imobilizacoes Incorporeas",
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].imobilizacoes_incorporeas}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[1] && (
                <NumberFormat
                  value={data[1].imobilizacoes_incorporeas}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),

          marco:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].imobilizacoes_incorporeas}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[2] && (
                <NumberFormat
                  value={data[2].imobilizacoes_incorporeas}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          abril:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].imobilizacoes_incorporeas}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[3] && (
                <NumberFormat
                  value={data[3].imobilizacoes_incorporeas}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          maio:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].imobilizacoes_incorporeas}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[4] && (
                <NumberFormat
                  value={data[4].imobilizacoes_incorporeas}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          junho:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].imobilizacoes_incorporeas}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[5] && (
                <NumberFormat
                  value={data[5].imobilizacoes_incorporeas}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          julho:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].imobilizacoes_incorporeas}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[6] && (
                <NumberFormat
                  value={data[6].imobilizacoes_incorporeas}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          agosto:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].imobilizacoes_incorporeas}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[7] && (
                <NumberFormat
                  value={data[7].imobilizacoes_incorporeas}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          setembro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].imobilizacoes_incorporeas}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[8] && (
                <NumberFormat
                  value={data[8].imobilizacoes_incorporeas}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          outubro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].imobilizacoes_incorporeas}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[9] && (
                <NumberFormat
                  value={data[9].imobilizacoes_incorporeas}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          novembro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].imobilizacoes_incorporeas}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[10] && (
                <NumberFormat
                  value={data[10].imobilizacoes_incorporeas}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          dezembro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].imobilizacoes_incorporeas}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[11] && (
                <NumberFormat
                  value={data[11].imobilizacoes_incorporeas}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });

        //----------

        balancorow.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].investimentos_em_subsidiarias}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[0] && (
                <NumberFormat
                  value={data[0].investimentos_em_subsidiarias}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          designacao: "Investimentos em Subsidiarias",
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].investimentos_em_subsidiarias}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[1] && (
                <NumberFormat
                  value={data[1].investimentos_em_subsidiarias}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),

          marco:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].investimentos_em_subsidiarias}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[2] && (
                <NumberFormat
                  value={data[2].investimentos_em_subsidiarias}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          abril:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].investimentos_em_subsidiarias}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[3] && (
                <NumberFormat
                  value={data[3].investimentos_em_subsidiarias}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          maio:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].investimentos_em_subsidiarias}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[4] && (
                <NumberFormat
                  value={data[4].investimentos_em_subsidiarias}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          junho:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].investimentos_em_subsidiarias}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[5] && (
                <NumberFormat
                  value={data[5].investimentos_em_subsidiarias}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          julho:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].investimentos_em_subsidiarias}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[6] && (
                <NumberFormat
                  value={data[6].investimentos_em_subsidiarias}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          agosto:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].investimentos_em_subsidiarias}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[7] && (
                <NumberFormat
                  value={data[7].investimentos_em_subsidiarias}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          setembro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].investimentos_em_subsidiarias}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[8] && (
                <NumberFormat
                  value={data[8].investimentos_em_subsidiarias}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          outubro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].investimentos_em_subsidiarias}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[9] && (
                <NumberFormat
                  value={data[9].investimentos_em_subsidiarias}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          novembro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].investimentos_em_subsidiarias}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[10] && (
                <NumberFormat
                  value={data[10].investimentos_em_subsidiarias}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          dezembro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].investimentos_em_subsidiarias}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[11] && (
                <NumberFormat
                  value={data[11].investimentos_em_subsidiarias}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });

        //----------

        balancorow.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].outros_activos_financeiros}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[0] && (
                <NumberFormat
                  value={data[0].outros_activos_financeiros}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          designacao: "Outros Activos Financeiros",
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].outros_activos_financeiros}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[1] && (
                <NumberFormat
                  value={data[1].outros_activos_financeiros}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),

          marco:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].outros_activos_financeiros}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[2] && (
                <NumberFormat
                  value={data[2].outros_activos_financeiros}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          abril:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].outros_activos_financeiros}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[3] && (
                <NumberFormat
                  value={data[3].outros_activos_financeiros}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          maio:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].outros_activos_financeiros}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[4] && (
                <NumberFormat
                  value={data[4].outros_activos_financeiros}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          junho:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].outros_activos_financeiros}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[5] && (
                <NumberFormat
                  value={data[5].outros_activos_financeiros}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          julho:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].outros_activos_financeiros}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[6] && (
                <NumberFormat
                  value={data[6].outros_activos_financeiros}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          agosto:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].outros_activos_financeiros}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[7] && (
                <NumberFormat
                  value={data[7].outros_activos_financeiros}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          setembro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].outros_activos_financeiros}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[8] && (
                <NumberFormat
                  value={data[8].outros_activos_financeiros}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          outubro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].outros_activos_financeiros}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[9] && (
                <NumberFormat
                  value={data[9].outros_activos_financeiros}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          novembro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].outros_activos_financeiros}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[10] && (
                <NumberFormat
                  value={data[10].outros_activos_financeiros}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          dezembro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].outros_activos_financeiros}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[11] && (
                <NumberFormat
                  value={data[11].outros_activos_financeiros}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });
        //----------

        balancorow.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].outros_activos_nao_correntes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[0] && (
                <NumberFormat
                  value={data[0].outros_activos_nao_correntes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          designacao: "Outros Activos Nao Correntes",
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].outros_activos_nao_correntes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[1] && (
                <NumberFormat
                  value={data[1].outros_activos_nao_correntes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),

          marco:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].outros_activos_nao_correntes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[2] && (
                <NumberFormat
                  value={data[2].outros_activos_nao_correntes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          abril:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].outros_activos_nao_correntes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[3] && (
                <NumberFormat
                  value={data[3].outros_activos_nao_correntes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          maio:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].outros_activos_nao_correntes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[4] && (
                <NumberFormat
                  value={data[4].outros_activos_nao_correntes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          junho:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].outros_activos_nao_correntes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[5] && (
                <NumberFormat
                  value={data[5].outros_activos_nao_correntes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          julho:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].outros_activos_nao_correntes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[6] && (
                <NumberFormat
                  value={data[6].outros_activos_nao_correntes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          agosto:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].outros_activos_nao_correntes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[7] && (
                <NumberFormat
                  value={data[7].outros_activos_nao_correntes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          setembro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].outros_activos_nao_correntes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[8] && (
                <NumberFormat
                  value={data[8].outros_activos_nao_correntes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          outubro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].outros_activos_nao_correntes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[9] && (
                <NumberFormat
                  value={data[9].outros_activos_nao_correntes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          novembro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].outros_activos_nao_correntes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[10] && (
                <NumberFormat
                  value={data[10].outros_activos_nao_correntes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          dezembro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].outros_activos_nao_correntes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[11] && (
                <NumberFormat
                  value={data[11].outros_activos_nao_correntes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });

        balancorow.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].total_activo_nao_correntes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[0] && (
                <NumberFormat
                  className="text-danger"
                  style={{ fontWeight: "900" }}
                  value={data[0].total_activo_nao_correntes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          designacao: "",
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].total_activo_nao_correntes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[1] && (
                <NumberFormat
                  className="text-danger"
                  style={{ fontWeight: "900" }}
                  value={data[1].total_activo_nao_correntes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),

          marco:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].total_activo_nao_correntes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[2] && (
                <NumberFormat
                  className="text-danger"
                  style={{ fontWeight: "900" }}
                  value={data[2].total_activo_nao_correntes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          abril:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].total_activo_nao_correntes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[3] && (
                <NumberFormat
                  className="text-danger"
                  style={{ fontWeight: "900" }}
                  value={data[3].total_activo_nao_correntes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          maio:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].total_activo_nao_correntes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[4] && (
                <NumberFormat
                  className="text-danger"
                  style={{ fontWeight: "900" }}
                  value={data[4].total_activo_nao_correntes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          junho:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].total_activo_nao_correntes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[5] && (
                <NumberFormat
                  className="text-danger"
                  style={{ fontWeight: "900" }}
                  value={data[5].total_activo_nao_correntes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          julho:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].total_activo_nao_correntes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[6] && (
                <NumberFormat
                  className="text-danger"
                  style={{ fontWeight: "900" }}
                  value={data[6].total_activo_nao_correntes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          agosto:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].total_activo_nao_correntes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[7] && (
                <NumberFormat
                  className="text-danger"
                  style={{ fontWeight: "900" }}
                  value={data[7].total_activo_nao_correntes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          setembro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].total_activo_nao_correntes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[8] && (
                <NumberFormat
                  className="text-danger"
                  style={{ fontWeight: "900" }}
                  value={data[8].total_activo_nao_correntes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          outubro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].total_activo_nao_correntes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[9] && (
                <NumberFormat
                  className="text-danger"
                  style={{ fontWeight: "900" }}
                  value={data[9].total_activo_nao_correntes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          novembro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].total_activo_nao_correntes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[10] && (
                <NumberFormat
                  className="text-danger"
                  style={{ fontWeight: "900" }}
                  value={data[10].total_activo_nao_correntes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          dezembro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].total_activo_nao_correntes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[11] && (
                <NumberFormat
                  className="text-danger"
                  style={{ fontWeight: "900" }}
                  value={data[11].total_activo_nao_correntes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });
        balancorow.push({ designacao: " " });

        balancorow.push({
          designacao: (
            <span style={{ fontWeight: "900" }}>Activos Correntes</span>
          ),
        });
        //----------

        balancorow.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].existencias}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[0] && (
                <NumberFormat
                  value={data[0].existencias}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          designacao: "Existencias",
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].existencias}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[1] && (
                <NumberFormat
                  value={data[1].existencias}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),

          marco:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].existencias}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[2] && (
                <NumberFormat
                  value={data[2].existencias}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          abril:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].existencias}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[3] && (
                <NumberFormat
                  value={data[3].existencias}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          maio:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].existencias}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[4] && (
                <NumberFormat
                  value={data[4].existencias}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          junho:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].existencias}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[5] && (
                <NumberFormat
                  value={data[5].existencias}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          julho:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].existencias}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[6] && (
                <NumberFormat
                  value={data[6].existencias}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          agosto:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].existencias}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[7] && (
                <NumberFormat
                  value={data[7].existencias}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          setembro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].existencias}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[8] && (
                <NumberFormat
                  value={data[8].existencias}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          outubro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].existencias}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[9] && (
                <NumberFormat
                  value={data[9].existencias}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          novembro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].existencias}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[10] && (
                <NumberFormat
                  value={data[10].existencias}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          dezembro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].existencias}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[11] && (
                <NumberFormat
                  value={data[11].existencias}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });
        //----------

        balancorow.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].contas_a_receber}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[0] && (
                <NumberFormat
                  value={data[0].contas_a_receber}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          designacao: "Contas A Receber",
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].contas_a_receber}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[1] && (
                <NumberFormat
                  value={data[1].contas_a_receber}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),

          marco:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].contas_a_receber}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[2] && (
                <NumberFormat
                  value={data[2].contas_a_receber}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          abril:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].contas_a_receber}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[3] && (
                <NumberFormat
                  value={data[3].contas_a_receber}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          maio:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].contas_a_receber}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[4] && (
                <NumberFormat
                  value={data[4].contas_a_receber}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          junho:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].contas_a_receber}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[5] && (
                <NumberFormat
                  value={data[5].contas_a_receber}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          julho:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].contas_a_receber}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[6] && (
                <NumberFormat
                  value={data[6].contas_a_receber}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          agosto:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].contas_a_receber}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[7] && (
                <NumberFormat
                  value={data[7].contas_a_receber}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          setembro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].contas_a_receber}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[8] && (
                <NumberFormat
                  value={data[8].contas_a_receber}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          outubro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].contas_a_receber}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[9] && (
                <NumberFormat
                  value={data[9].contas_a_receber}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          novembro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].contas_a_receber}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[10] && (
                <NumberFormat
                  value={data[10].contas_a_receber}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          dezembro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].contas_a_receber}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[11] && (
                <NumberFormat
                  value={data[11].contas_a_receber}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });
        //----------

        balancorow.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].disponibilidades}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[0] && (
                <NumberFormat
                  value={data[0].disponibilidades}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          designacao: "Disponibilidades",
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].disponibilidades}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[1] && (
                <NumberFormat
                  value={data[1].disponibilidades}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),

          marco:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].disponibilidades}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[2] && (
                <NumberFormat
                  value={data[2].disponibilidades}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          abril:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].disponibilidades}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[3] && (
                <NumberFormat
                  value={data[3].disponibilidades}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          maio:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].disponibilidades}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[4] && (
                <NumberFormat
                  value={data[4].disponibilidades}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          junho:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].disponibilidades}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[5] && (
                <NumberFormat
                  value={data[5].disponibilidades}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          julho:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].disponibilidades}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[6] && (
                <NumberFormat
                  value={data[6].disponibilidades}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          agosto:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].disponibilidades}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[7] && (
                <NumberFormat
                  value={data[7].disponibilidades}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          setembro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].disponibilidades}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[8] && (
                <NumberFormat
                  value={data[8].disponibilidades}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          outubro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].disponibilidades}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[9] && (
                <NumberFormat
                  value={data[9].disponibilidades}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          novembro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].disponibilidades}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[10] && (
                <NumberFormat
                  value={data[10].disponibilidades}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          dezembro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].disponibilidades}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[11] && (
                <NumberFormat
                  value={data[11].disponibilidades}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });
        //----------

        balancorow.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].outros_activos_correntes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[0] && (
                <NumberFormat
                  value={data[0].outros_activos_correntes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          designacao: "Outros Activos Correntes",
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].outros_activos_correntes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[1] && (
                <NumberFormat
                  value={data[1].outros_activos_correntes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),

          marco:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].outros_activos_correntes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[2] && (
                <NumberFormat
                  value={data[2].outros_activos_correntes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          abril:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].outros_activos_correntes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[3] && (
                <NumberFormat
                  value={data[3].outros_activos_correntes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          maio:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].outros_activos_correntes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[4] && (
                <NumberFormat
                  value={data[4].outros_activos_correntes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          junho:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].outros_activos_correntes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[5] && (
                <NumberFormat
                  value={data[5].outros_activos_correntes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          julho:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].outros_activos_correntes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[6] && (
                <NumberFormat
                  value={data[6].outros_activos_correntes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          agosto:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].outros_activos_correntes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[7] && (
                <NumberFormat
                  value={data[7].outros_activos_correntes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          setembro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].outros_activos_correntes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[8] && (
                <NumberFormat
                  value={data[8].outros_activos_correntes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          outubro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].outros_activos_correntes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[9] && (
                <NumberFormat
                  value={data[9].outros_activos_correntes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          novembro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].outros_activos_correntes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[10] && (
                <NumberFormat
                  value={data[10].outros_activos_correntes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          dezembro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].outros_activos_correntes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[11] && (
                <NumberFormat
                  value={data[11].outros_activos_correntes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });
        //----------
        balancorow.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].total_activos_correntes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[0] && (
                <NumberFormat
                  className="text-danger"
                  style={{ fontWeight: "900" }}
                  value={data[0].total_activos_correntes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          designacao: "",
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].total_activos_correntes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[1] && (
                <NumberFormat
                  className="text-danger"
                  style={{ fontWeight: "900" }}
                  value={data[1].total_activos_correntes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),

          marco:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].total_activos_correntes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[2] && (
                <NumberFormat
                  className="text-danger"
                  style={{ fontWeight: "900" }}
                  value={data[2].total_activos_correntes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          abril:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].total_activos_correntes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[3] && (
                <NumberFormat
                  className="text-danger"
                  style={{ fontWeight: "900" }}
                  value={data[3].total_activos_correntes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          maio:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].total_activos_correntes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[4] && (
                <NumberFormat
                  className="text-danger"
                  style={{ fontWeight: "900" }}
                  value={data[4].total_activos_correntes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          junho:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].total_activos_correntes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[5] && (
                <NumberFormat
                  className="text-danger"
                  style={{ fontWeight: "900" }}
                  value={data[5].total_activos_correntes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          julho:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].total_activos_correntes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[6] && (
                <NumberFormat
                  className="text-danger"
                  style={{ fontWeight: "900" }}
                  value={data[6].total_activos_correntes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          agosto:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].total_activos_correntes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[7] && (
                <NumberFormat
                  className="text-danger"
                  style={{ fontWeight: "900" }}
                  value={data[7].total_activos_correntes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          setembro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].total_activos_correntes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[8] && (
                <NumberFormat
                  className="text-danger"
                  style={{ fontWeight: "900" }}
                  value={data[8].total_activos_correntes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          outubro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].total_activos_correntes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[9] && (
                <NumberFormat
                  className="text-danger"
                  style={{ fontWeight: "900" }}
                  value={data[9].total_activos_correntes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          novembro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].total_activos_correntes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[10] && (
                <NumberFormat
                  className="text-danger"
                  style={{ fontWeight: "900" }}
                  value={data[10].total_activos_correntes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          dezembro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].total_activos_correntes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[11] && (
                <NumberFormat
                  className="text-danger"
                  style={{ fontWeight: "900" }}
                  value={data[11].total_activos_correntes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });

        balancorow.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].total_activos}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[0] && (
                <NumberFormat
                  className="text-danger"
                  style={{ fontWeight: "900" }}
                  value={data[0].total_activos}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          designacao: (
            <span style={{ fontWeight: "900" }}>Total do activo</span>
          ),
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].total_activos}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[1] && (
                <NumberFormat
                  className="text-danger"
                  style={{ fontWeight: "900" }}
                  value={data[1].total_activos}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),

          marco:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].total_activos}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[2] && (
                <NumberFormat
                  className="text-danger"
                  style={{ fontWeight: "900" }}
                  value={data[2].total_activos}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          abril:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].total_activos}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[3] && (
                <NumberFormat
                  className="text-danger"
                  style={{ fontWeight: "900" }}
                  value={data[3].total_activos}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          maio:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].total_activos}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[4] && (
                <NumberFormat
                  className="text-danger"
                  style={{ fontWeight: "900" }}
                  value={data[4].total_activos}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          junho:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].total_activos}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[5] && (
                <NumberFormat
                  className="text-danger"
                  style={{ fontWeight: "900" }}
                  value={data[5].total_activos}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          julho:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].total_activos}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[6] && (
                <NumberFormat
                  className="text-danger"
                  style={{ fontWeight: "900" }}
                  value={data[6].total_activos}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          agosto:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].total_activos}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[7] && (
                <NumberFormat
                  className="text-danger"
                  style={{ fontWeight: "900" }}
                  value={data[7].total_activos}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          setembro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].total_activos}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[8] && (
                <NumberFormat
                  className="text-danger"
                  style={{ fontWeight: "900" }}
                  value={data[8].total_activos}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          outubro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].total_activos}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[9] && (
                <NumberFormat
                  className="text-danger"
                  style={{ fontWeight: "900" }}
                  value={data[9].total_activos}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          novembro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].total_activos}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[10] && (
                <NumberFormat
                  className="text-danger"
                  style={{ fontWeight: "900" }}
                  value={data[10].total_activos}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          dezembro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].total_activos}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[11] && (
                <NumberFormat
                  className="text-danger"
                  style={{ fontWeight: "900" }}
                  value={data[11].total_activos}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });
        //----------

        balancorow.push({
          designacao: " ",
        });

        balancorow.push({
          designacao: <span style={{ fontWeight: "900" }}>Capital Própio</span>,
        });

        balancorow.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].capital}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[0] && (
                <NumberFormat
                  value={data[0].capital}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          designacao: "Capital",
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].capital}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[1] && (
                <NumberFormat
                  value={data[1].capital}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),

          marco:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].capital}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[2] && (
                <NumberFormat
                  value={data[2].capital}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          abril:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].capital}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[3] && (
                <NumberFormat
                  value={data[3].capital}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          maio:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].capital}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[4] && (
                <NumberFormat
                  value={data[4].capital}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          junho:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].capital}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[5] && (
                <NumberFormat
                  value={data[5].capital}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          julho:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].capital}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[6] && (
                <NumberFormat
                  value={data[6].capital}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          agosto:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].capital}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[7] && (
                <NumberFormat
                  value={data[7].capital}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          setembro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].capital}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[8] && (
                <NumberFormat
                  value={data[8].capital}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          outubro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].capital}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[9] && (
                <NumberFormat
                  value={data[9].capital}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          novembro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].capital}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[10] && (
                <NumberFormat
                  value={data[10].capital}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          dezembro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].capital}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[11] && (
                <NumberFormat
                  value={data[11].capital}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });
        //----------

        balancorow.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].reservas}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[0] && (
                <NumberFormat
                  value={data[0].reservas}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          designacao: "Reservas",
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].reservas}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[1] && (
                <NumberFormat
                  value={data[1].reservas}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),

          marco:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].reservas}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[2] && (
                <NumberFormat
                  value={data[2].reservas}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          abril:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].reservas}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[3] && (
                <NumberFormat
                  value={data[3].reservas}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          maio:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].reservas}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[4] && (
                <NumberFormat
                  value={data[4].reservas}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          junho:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].reservas}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[5] && (
                <NumberFormat
                  value={data[5].reservas}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          julho:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].reservas}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[6] && (
                <NumberFormat
                  value={data[6].reservas}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          agosto:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].reservas}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[7] && (
                <NumberFormat
                  value={data[7].reservas}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          setembro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].reservas}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[8] && (
                <NumberFormat
                  value={data[8].reservas}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          outubro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].reservas}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[9] && (
                <NumberFormat
                  value={data[9].reservas}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          novembro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].reservas}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[10] && (
                <NumberFormat
                  value={data[10].reservas}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          dezembro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].reservas}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[11] && (
                <NumberFormat
                  value={data[11].reservas}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });
        //----------

        balancorow.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].resultados_transitados}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[0] && (
                <NumberFormat
                  value={data[0].resultados_transitados}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          designacao: "Resultados Transitados",
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].resultados_transitados}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[1] && (
                <NumberFormat
                  value={data[1].resultados_transitados}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),

          marco:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].resultados_transitados}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[2] && (
                <NumberFormat
                  value={data[2].resultados_transitados}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          abril:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].resultados_transitados}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[3] && (
                <NumberFormat
                  value={data[3].resultados_transitados}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          maio:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].resultados_transitados}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[4] && (
                <NumberFormat
                  value={data[4].resultados_transitados}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          junho:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].resultados_transitados}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[5] && (
                <NumberFormat
                  value={data[5].resultados_transitados}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          julho:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].resultados_transitados}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[6] && (
                <NumberFormat
                  value={data[6].resultados_transitados}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          agosto:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].resultados_transitados}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[7] && (
                <NumberFormat
                  value={data[7].resultados_transitados}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          setembro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].resultados_transitados}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[8] && (
                <NumberFormat
                  value={data[8].resultados_transitados}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          outubro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].resultados_transitados}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[9] && (
                <NumberFormat
                  value={data[9].resultados_transitados}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          novembro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].resultados_transitados}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[10] && (
                <NumberFormat
                  value={data[10].resultados_transitados}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          dezembro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].resultados_transitados}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[11] && (
                <NumberFormat
                  value={data[11].resultados_transitados}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });
        //----------

        balancorow.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].resultados_de_exercicio}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[0] && (
                <NumberFormat
                  value={data[0].resultados_de_exercicio}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          designacao: "Resultados De Exercicio",
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].resultados_de_exercicio}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[1] && (
                <NumberFormat
                  value={data[1].resultados_de_exercicio}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),

          marco:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].resultados_de_exercicio}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[2] && (
                <NumberFormat
                  value={data[2].resultados_de_exercicio}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          abril:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].resultados_de_exercicio}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[3] && (
                <NumberFormat
                  value={data[3].resultados_de_exercicio}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          maio:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].resultados_de_exercicio}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[4] && (
                <NumberFormat
                  value={data[4].resultados_de_exercicio}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          junho:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].resultados_de_exercicio}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[5] && (
                <NumberFormat
                  value={data[5].resultados_de_exercicio}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          julho:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].resultados_de_exercicio}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[6] && (
                <NumberFormat
                  value={data[6].resultados_de_exercicio}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          agosto:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].resultados_de_exercicio}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[7] && (
                <NumberFormat
                  value={data[7].resultados_de_exercicio}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          setembro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].resultados_de_exercicio}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[8] && (
                <NumberFormat
                  value={data[8].resultados_de_exercicio}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          outubro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].resultados_de_exercicio}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[9] && (
                <NumberFormat
                  value={data[9].resultados_de_exercicio}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          novembro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].resultados_de_exercicio}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[10] && (
                <NumberFormat
                  value={data[10].resultados_de_exercicio}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          dezembro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].resultados_de_exercicio}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[11] && (
                <NumberFormat
                  value={data[11].resultados_de_exercicio}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });

        balancorow.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].total_capital_propio}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[0] && (
                <NumberFormat
                  className="text-danger"
                  style={{ fontWeight: "900" }}
                  value={data[0].total_capital_propio}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          designacao: "",
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].total_capital_propio}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[1] && (
                <NumberFormat
                  className="text-danger"
                  style={{ fontWeight: "900" }}
                  value={data[1].total_capital_propio}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),

          marco:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].total_capital_propio}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[2] && (
                <NumberFormat
                  className="text-danger"
                  style={{ fontWeight: "900" }}
                  value={data[2].total_capital_propio}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          abril:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].total_capital_propio}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[3] && (
                <NumberFormat
                  className="text-danger"
                  style={{ fontWeight: "900" }}
                  value={data[3].total_capital_propio}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          maio:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].total_capital_propio}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[4] && (
                <NumberFormat
                  className="text-danger"
                  style={{ fontWeight: "900" }}
                  value={data[4].total_capital_propio}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          junho:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].total_capital_propio}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[5] && (
                <NumberFormat
                  className="text-danger"
                  style={{ fontWeight: "900" }}
                  value={data[5].total_capital_propio}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          julho:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].total_capital_propio}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[6] && (
                <NumberFormat
                  className="text-danger"
                  style={{ fontWeight: "900" }}
                  value={data[6].total_capital_propio}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          agosto:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].total_capital_propio}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[7] && (
                <NumberFormat
                  className="text-danger"
                  style={{ fontWeight: "900" }}
                  value={data[7].total_capital_propio}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          setembro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].total_capital_propio}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[8] && (
                <NumberFormat
                  className="text-danger"
                  style={{ fontWeight: "900" }}
                  value={data[8].total_capital_propio}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          outubro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].total_capital_propio}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[9] && (
                <NumberFormat
                  className="text-danger"
                  style={{ fontWeight: "900" }}
                  value={data[9].total_capital_propio}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          novembro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].total_capital_propio}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[10] && (
                <NumberFormat
                  className="text-danger"
                  style={{ fontWeight: "900" }}
                  value={data[10].total_capital_propio}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          dezembro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].total_capital_propio}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[11] && (
                <NumberFormat
                  className="text-danger"
                  style={{ fontWeight: "900" }}
                  value={data[11].total_capital_propio}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });

        balancorow.push({ designacao: " " });

        balancorow.push({
          designacao: (
            <span style={{ fontWeight: "900" }}>Passivo não Corrente</span>
          ),
        });
        balancorow.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].emprestimo_de_medio_e_longo_prazo}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[0] && (
                <NumberFormat
                  value={data[0].emprestimo_de_medio_e_longo_prazo}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          designacao: "Emprestimo De Medio E Longo Prazo",
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].emprestimo_de_medio_e_longo_prazo}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[1] && (
                <NumberFormat
                  value={data[1].emprestimo_de_medio_e_longo_prazo}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),

          marco:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].emprestimo_de_medio_e_longo_prazo}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[2] && (
                <NumberFormat
                  value={data[2].emprestimo_de_medio_e_longo_prazo}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          abril:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].emprestimo_de_medio_e_longo_prazo}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[3] && (
                <NumberFormat
                  value={data[3].emprestimo_de_medio_e_longo_prazo}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          maio:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].emprestimo_de_medio_e_longo_prazo}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[4] && (
                <NumberFormat
                  value={data[4].emprestimo_de_medio_e_longo_prazo}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          junho:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].emprestimo_de_medio_e_longo_prazo}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[5] && (
                <NumberFormat
                  value={data[5].emprestimo_de_medio_e_longo_prazo}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          julho:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].emprestimo_de_medio_e_longo_prazo}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[6] && (
                <NumberFormat
                  value={data[6].emprestimo_de_medio_e_longo_prazo}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          agosto:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].emprestimo_de_medio_e_longo_prazo}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[7] && (
                <NumberFormat
                  value={data[7].emprestimo_de_medio_e_longo_prazo}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          setembro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].emprestimo_de_medio_e_longo_prazo}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[8] && (
                <NumberFormat
                  value={data[8].emprestimo_de_medio_e_longo_prazo}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          outubro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].emprestimo_de_medio_e_longo_prazo}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[9] && (
                <NumberFormat
                  value={data[9].emprestimo_de_medio_e_longo_prazo}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          novembro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].emprestimo_de_medio_e_longo_prazo}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[10] && (
                <NumberFormat
                  value={data[10].emprestimo_de_medio_e_longo_prazo}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          dezembro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].emprestimo_de_medio_e_longo_prazo}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[11] && (
                <NumberFormat
                  value={data[11].emprestimo_de_medio_e_longo_prazo}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });
        //----------

        balancorow.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].impostos_deferidos}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[0] && (
                <NumberFormat
                  value={data[0].impostos_deferidos}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          designacao: "Impostos Deferidos",
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].impostos_deferidos}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[1] && (
                <NumberFormat
                  value={data[1].impostos_deferidos}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),

          marco:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].impostos_deferidos}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[2] && (
                <NumberFormat
                  value={data[2].impostos_deferidos}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          abril:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].impostos_deferidos}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[3] && (
                <NumberFormat
                  value={data[3].impostos_deferidos}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          maio:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].impostos_deferidos}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[4] && (
                <NumberFormat
                  value={data[4].impostos_deferidos}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          junho:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].impostos_deferidos}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[5] && (
                <NumberFormat
                  value={data[5].impostos_deferidos}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          julho:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].impostos_deferidos}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[6] && (
                <NumberFormat
                  value={data[6].impostos_deferidos}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          agosto:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].impostos_deferidos}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[7] && (
                <NumberFormat
                  value={data[7].impostos_deferidos}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          setembro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].impostos_deferidos}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[8] && (
                <NumberFormat
                  value={data[8].impostos_deferidos}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          outubro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].impostos_deferidos}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[9] && (
                <NumberFormat
                  value={data[9].impostos_deferidos}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          novembro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].impostos_deferidos}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[10] && (
                <NumberFormat
                  value={data[10].impostos_deferidos}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          dezembro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].impostos_deferidos}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[11] && (
                <NumberFormat
                  value={data[11].impostos_deferidos}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });
        //----------

        balancorow.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].provisoes_para_pensoes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[0] && (
                <NumberFormat
                  value={data[0].provisoes_para_pensoes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          designacao: "Provisoes Para Pensoes",
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].provisoes_para_pensoes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[1] && (
                <NumberFormat
                  value={data[1].provisoes_para_pensoes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),

          marco:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].provisoes_para_pensoes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[2] && (
                <NumberFormat
                  value={data[2].provisoes_para_pensoes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          abril:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].provisoes_para_pensoes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[3] && (
                <NumberFormat
                  value={data[3].provisoes_para_pensoes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          maio:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].provisoes_para_pensoes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[4] && (
                <NumberFormat
                  value={data[4].provisoes_para_pensoes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          junho:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].provisoes_para_pensoes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[5] && (
                <NumberFormat
                  value={data[5].provisoes_para_pensoes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          julho:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].provisoes_para_pensoes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[6] && (
                <NumberFormat
                  value={data[6].provisoes_para_pensoes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          agosto:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].provisoes_para_pensoes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[7] && (
                <NumberFormat
                  value={data[7].provisoes_para_pensoes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          setembro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].provisoes_para_pensoes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[8] && (
                <NumberFormat
                  value={data[8].provisoes_para_pensoes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          outubro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].provisoes_para_pensoes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[9] && (
                <NumberFormat
                  value={data[9].provisoes_para_pensoes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          novembro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].provisoes_para_pensoes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[10] && (
                <NumberFormat
                  value={data[10].provisoes_para_pensoes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          dezembro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].provisoes_para_pensoes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[11] && (
                <NumberFormat
                  value={data[11].provisoes_para_pensoes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });
        //----------

        balancorow.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].provisoes_para_outros_riscos_encargos}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[0] && (
                <NumberFormat
                  value={data[0].provisoes_para_outros_riscos_encargos}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          designacao: "Provisoes Para Outros Riscos Encargos",
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].provisoes_para_outros_riscos_encargos}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[1] && (
                <NumberFormat
                  value={data[1].provisoes_para_outros_riscos_encargos}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),

          marco:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].provisoes_para_outros_riscos_encargos}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[2] && (
                <NumberFormat
                  value={data[2].provisoes_para_outros_riscos_encargos}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          abril:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].provisoes_para_outros_riscos_encargos}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[3] && (
                <NumberFormat
                  value={data[3].provisoes_para_outros_riscos_encargos}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          maio:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].provisoes_para_outros_riscos_encargos}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[4] && (
                <NumberFormat
                  value={data[4].provisoes_para_outros_riscos_encargos}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          junho:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].provisoes_para_outros_riscos_encargos}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[5] && (
                <NumberFormat
                  value={data[5].provisoes_para_outros_riscos_encargos}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          julho:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].provisoes_para_outros_riscos_encargos}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[6] && (
                <NumberFormat
                  value={data[6].provisoes_para_outros_riscos_encargos}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          agosto:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].provisoes_para_outros_riscos_encargos}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[7] && (
                <NumberFormat
                  value={data[7].provisoes_para_outros_riscos_encargos}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          setembro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].provisoes_para_outros_riscos_encargos}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[8] && (
                <NumberFormat
                  value={data[8].provisoes_para_outros_riscos_encargos}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          outubro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].provisoes_para_outros_riscos_encargos}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[9] && (
                <NumberFormat
                  value={data[9].provisoes_para_outros_riscos_encargos}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          novembro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].provisoes_para_outros_riscos_encargos}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[10] && (
                <NumberFormat
                  value={data[10].provisoes_para_outros_riscos_encargos}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          dezembro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].provisoes_para_outros_riscos_encargos}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[11] && (
                <NumberFormat
                  value={data[11].provisoes_para_outros_riscos_encargos}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });
        //----------

        balancorow.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].outros_passivos_nao_correntes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[0] && (
                <NumberFormat
                  value={data[0].outros_passivos_nao_correntes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          designacao: "Outros Passivos Nao Correntes",
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].outros_passivos_nao_correntes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[1] && (
                <NumberFormat
                  value={data[1].outros_passivos_nao_correntes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),

          marco:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].outros_passivos_nao_correntes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[2] && (
                <NumberFormat
                  value={data[2].outros_passivos_nao_correntes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          abril:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].outros_passivos_nao_correntes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[3] && (
                <NumberFormat
                  value={data[3].outros_passivos_nao_correntes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          maio:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].outros_passivos_nao_correntes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[4] && (
                <NumberFormat
                  value={data[4].outros_passivos_nao_correntes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          junho:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].outros_passivos_nao_correntes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[5] && (
                <NumberFormat
                  value={data[5].outros_passivos_nao_correntes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          julho:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].outros_passivos_nao_correntes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[6] && (
                <NumberFormat
                  value={data[6].outros_passivos_nao_correntes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          agosto:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].outros_passivos_nao_correntes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[7] && (
                <NumberFormat
                  value={data[7].outros_passivos_nao_correntes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          setembro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].outros_passivos_nao_correntes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[8] && (
                <NumberFormat
                  value={data[8].outros_passivos_nao_correntes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          outubro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].outros_passivos_nao_correntes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[9] && (
                <NumberFormat
                  value={data[9].outros_passivos_nao_correntes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          novembro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].outros_passivos_nao_correntes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[10] && (
                <NumberFormat
                  value={data[10].outros_passivos_nao_correntes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          dezembro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].outros_passivos_nao_correntes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[11] && (
                <NumberFormat
                  value={data[11].outros_passivos_nao_correntes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });

        balancorow.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].total_passivo_nao_corrente}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[0] && (
                <NumberFormat
                  className="text-danger"
                  style={{ fontWeight: "900" }}
                  value={data[0].total_passivo_nao_corrente}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].total_passivo_nao_corrente}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[1] && (
                <NumberFormat
                  className="text-danger"
                  style={{ fontWeight: "900" }}
                  value={data[1].total_passivo_nao_corrente}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),

          marco:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].total_passivo_nao_corrente}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[2] && (
                <NumberFormat
                  className="text-danger"
                  style={{ fontWeight: "900" }}
                  value={data[2].total_passivo_nao_corrente}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          abril:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].total_passivo_nao_corrente}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[3] && (
                <NumberFormat
                  className="text-danger"
                  style={{ fontWeight: "900" }}
                  value={data[3].total_passivo_nao_corrente}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          maio:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].total_passivo_nao_corrente}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[4] && (
                <NumberFormat
                  className="text-danger"
                  style={{ fontWeight: "900" }}
                  value={data[4].total_passivo_nao_corrente}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          junho:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].total_passivo_nao_corrente}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[5] && (
                <NumberFormat
                  className="text-danger"
                  style={{ fontWeight: "900" }}
                  value={data[5].total_passivo_nao_corrente}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          julho:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].total_passivo_nao_corrente}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[6] && (
                <NumberFormat
                  className="text-danger"
                  style={{ fontWeight: "900" }}
                  value={data[6].total_passivo_nao_corrente}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          agosto:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].total_passivo_nao_corrente}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[7] && (
                <NumberFormat
                  className="text-danger"
                  style={{ fontWeight: "900" }}
                  value={data[7].total_passivo_nao_corrente}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          setembro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].total_passivo_nao_corrente}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[8] && (
                <NumberFormat
                  className="text-danger"
                  style={{ fontWeight: "900" }}
                  value={data[8].total_passivo_nao_corrente}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          outubro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].total_passivo_nao_corrente}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[9] && (
                <NumberFormat
                  className="text-danger"
                  style={{ fontWeight: "900" }}
                  value={data[9].total_passivo_nao_corrente}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          novembro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].total_passivo_nao_corrente}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[10] && (
                <NumberFormat
                  className="text-danger"
                  style={{ fontWeight: "900" }}
                  value={data[10].total_passivo_nao_corrente}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          dezembro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].total_passivo_nao_corrente}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[11] && (
                <NumberFormat
                  className="text-danger"
                  style={{ fontWeight: "900" }}
                  value={data[11].total_passivo_nao_corrente}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });
        //----------
        balancorow.push({
          designacao: (
            <span style={{ fontWeight: "900" }}> Passivo Corrente</span>
          ),
        });

        balancorow.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].contas_a_pagar}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[0] && (
                <NumberFormat
                  value={data[0].contas_a_pagar}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          designacao: "Contas A Pagar",
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].contas_a_pagar}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[1] && (
                <NumberFormat
                  value={data[1].contas_a_pagar}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),

          marco:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].contas_a_pagar}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[2] && (
                <NumberFormat
                  value={data[2].contas_a_pagar}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          abril:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].contas_a_pagar}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[3] && (
                <NumberFormat
                  value={data[3].contas_a_pagar}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          maio:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].contas_a_pagar}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[4] && (
                <NumberFormat
                  value={data[4].contas_a_pagar}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          junho:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].contas_a_pagar}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[5] && (
                <NumberFormat
                  value={data[5].contas_a_pagar}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          julho:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].contas_a_pagar}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[6] && (
                <NumberFormat
                  value={data[6].contas_a_pagar}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          agosto:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].contas_a_pagar}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[7] && (
                <NumberFormat
                  value={data[7].contas_a_pagar}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          setembro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].contas_a_pagar}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[8] && (
                <NumberFormat
                  value={data[8].contas_a_pagar}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          outubro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].contas_a_pagar}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[9] && (
                <NumberFormat
                  value={data[9].contas_a_pagar}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          novembro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].contas_a_pagar}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[10] && (
                <NumberFormat
                  value={data[10].contas_a_pagar}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          dezembro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].contas_a_pagar}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[11] && (
                <NumberFormat
                  value={data[11].contas_a_pagar}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });
        //----------

        balancorow.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].emprestimo_de_curto_prazo}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[0] && (
                <NumberFormat
                  value={data[0].emprestimo_de_curto_prazo}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          designacao: "Emprestimo De Curto Prazo",
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].emprestimo_de_curto_prazo}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[1] && (
                <NumberFormat
                  value={data[1].emprestimo_de_curto_prazo}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),

          marco:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].emprestimo_de_curto_prazo}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[2] && (
                <NumberFormat
                  value={data[2].emprestimo_de_curto_prazo}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          abril:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].emprestimo_de_curto_prazo}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[3] && (
                <NumberFormat
                  value={data[3].emprestimo_de_curto_prazo}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          maio:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].emprestimo_de_curto_prazo}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[4] && (
                <NumberFormat
                  value={data[4].emprestimo_de_curto_prazo}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          junho:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].emprestimo_de_curto_prazo}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[5] && (
                <NumberFormat
                  value={data[5].emprestimo_de_curto_prazo}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          julho:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].emprestimo_de_curto_prazo}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[6] && (
                <NumberFormat
                  value={data[6].emprestimo_de_curto_prazo}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          agosto:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].emprestimo_de_curto_prazo}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[7] && (
                <NumberFormat
                  value={data[7].emprestimo_de_curto_prazo}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          setembro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].emprestimo_de_curto_prazo}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[8] && (
                <NumberFormat
                  value={data[8].emprestimo_de_curto_prazo}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          outubro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].emprestimo_de_curto_prazo}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[9] && (
                <NumberFormat
                  value={data[9].emprestimo_de_curto_prazo}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          novembro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].emprestimo_de_curto_prazo}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[10] && (
                <NumberFormat
                  value={data[10].emprestimo_de_curto_prazo}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          dezembro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].emprestimo_de_curto_prazo}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[11] && (
                <NumberFormat
                  value={data[11].emprestimo_de_curto_prazo}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });

        balancorow.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].parte_cor_empr_media_longo_prazo}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[0] && (
                <NumberFormat
                  value={data[0].parte_cor_empr_media_longo_prazo}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          designacao: "Parte Cor Empr Media Longo Prazo",
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].parte_cor_empr_media_longo_prazo}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[1] && (
                <NumberFormat
                  value={data[1].parte_cor_empr_media_longo_prazo}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),

          marco:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].parte_cor_empr_media_longo_prazo}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[2] && (
                <NumberFormat
                  value={data[2].parte_cor_empr_media_longo_prazo}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          abril:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].parte_cor_empr_media_longo_prazo}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[3] && (
                <NumberFormat
                  value={data[3].parte_cor_empr_media_longo_prazo}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          maio:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].parte_cor_empr_media_longo_prazo}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[4] && (
                <NumberFormat
                  value={data[4].parte_cor_empr_media_longo_prazo}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          junho:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].parte_cor_empr_media_longo_prazo}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[5] && (
                <NumberFormat
                  value={data[5].parte_cor_empr_media_longo_prazo}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          julho:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].parte_cor_empr_media_longo_prazo}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[6] && (
                <NumberFormat
                  value={data[6].parte_cor_empr_media_longo_prazo}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          agosto:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].parte_cor_empr_media_longo_prazo}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[7] && (
                <NumberFormat
                  value={data[7].parte_cor_empr_media_longo_prazo}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          setembro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].parte_cor_empr_media_longo_prazo}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[8] && (
                <NumberFormat
                  value={data[8].parte_cor_empr_media_longo_prazo}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          outubro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].parte_cor_empr_media_longo_prazo}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[9] && (
                <NumberFormat
                  value={data[9].parte_cor_empr_media_longo_prazo}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          novembro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].parte_cor_empr_media_longo_prazo}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[10] && (
                <NumberFormat
                  value={data[10].parte_cor_empr_media_longo_prazo}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          dezembro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].parte_cor_empr_media_longo_prazo}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[11] && (
                <NumberFormat
                  value={data[11].parte_cor_empr_media_longo_prazo}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });

        balancorow.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].outros_passivos_correntes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[0] && (
                <NumberFormat
                  value={data[0].outros_passivos_correntes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          designacao: "Outros Passivos Correntes",
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].outros_passivos_correntes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[1] && (
                <NumberFormat
                  value={data[1].outros_passivos_correntes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),

          marco:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].outros_passivos_correntes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[2] && (
                <NumberFormat
                  value={data[2].outros_passivos_correntes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          abril:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].outros_passivos_correntes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[3] && (
                <NumberFormat
                  value={data[3].outros_passivos_correntes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          maio:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].outros_passivos_correntes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[4] && (
                <NumberFormat
                  value={data[4].outros_passivos_correntes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          junho:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].outros_passivos_correntes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[5] && (
                <NumberFormat
                  value={data[5].outros_passivos_correntes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          julho:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].outros_passivos_correntes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[6] && (
                <NumberFormat
                  value={data[6].outros_passivos_correntes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          agosto:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].outros_passivos_correntes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[7] && (
                <NumberFormat
                  value={data[7].outros_passivos_correntes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          setembro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].outros_passivos_correntes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[8] && (
                <NumberFormat
                  value={data[8].outros_passivos_correntes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          outubro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].outros_passivos_correntes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[9] && (
                <NumberFormat
                  value={data[9].outros_passivos_correntes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          novembro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].outros_passivos_correntes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[10] && (
                <NumberFormat
                  value={data[10].outros_passivos_correntes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          dezembro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].outros_passivos_correntes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[11] && (
                <NumberFormat
                  value={data[11].outros_passivos_correntes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });
        balancorow.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].total_passivo_correntes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[0] && (
                <NumberFormat
                  className="text-danger"
                  style={{ fontWeight: "900" }}
                  value={data[0].total_passivo_correntes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].total_passivo_correntes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[1] && (
                <NumberFormat
                  className="text-danger"
                  style={{ fontWeight: "900" }}
                  value={data[1].total_passivo_correntes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),

          marco:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].total_passivo_correntes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[2] && (
                <NumberFormat
                  className="text-danger"
                  style={{ fontWeight: "900" }}
                  value={data[2].total_passivo_correntes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          abril:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].total_passivo_correntes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[3] && (
                <NumberFormat
                  className="text-danger"
                  style={{ fontWeight: "900" }}
                  value={data[3].total_passivo_correntes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          maio:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].total_passivo_correntes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[4] && (
                <NumberFormat
                  className="text-danger"
                  style={{ fontWeight: "900" }}
                  value={data[4].total_passivo_correntes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          junho:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].total_passivo_correntes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[5] && (
                <NumberFormat
                  className="text-danger"
                  style={{ fontWeight: "900" }}
                  value={data[5].total_passivo_correntes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          julho:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].total_passivo_correntes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[6] && (
                <NumberFormat
                  className="text-danger"
                  style={{ fontWeight: "900" }}
                  value={data[6].total_passivo_correntes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          agosto:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].total_passivo_correntes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[7] && (
                <NumberFormat
                  className="text-danger"
                  style={{ fontWeight: "900" }}
                  value={data[7].total_passivo_correntes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          setembro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].total_passivo_correntes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[8] && (
                <NumberFormat
                  className="text-danger"
                  style={{ fontWeight: "900" }}
                  value={data[8].total_passivo_correntes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          outubro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].total_passivo_correntes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[9] && (
                <NumberFormat
                  className="text-danger"
                  style={{ fontWeight: "900" }}
                  value={data[9].total_passivo_correntes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          novembro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].total_passivo_correntes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[10] && (
                <NumberFormat
                  className="text-danger"
                  style={{ fontWeight: "900" }}
                  value={data[10].total_passivo_correntes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          dezembro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].total_passivo_correntes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[11] && (
                <NumberFormat
                  className="text-danger"
                  style={{ fontWeight: "900" }}
                  value={data[11].total_passivo_correntes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });
        balancorow.push({ designacao: " " });

        balancorow.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].total_capital_poprio_e_passivo}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[0] && (
                <NumberFormat
                  className="text-danger"
                  style={{ fontWeight: "900" }}
                  value={data[0].total_capital_poprio_e_passivo}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          designacao: (
            <span style={{ fontWeight: "900" }}>
              Total Capital Próprio E Passivo
            </span>
          ),
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].total_capital_poprio_e_passivo}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[1] && (
                <NumberFormat
                  className="text-danger"
                  style={{ fontWeight: "900" }}
                  value={data[1].total_capital_poprio_e_passivo}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),

          marco:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].total_capital_poprio_e_passivo}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[2] && (
                <NumberFormat
                  className="text-danger"
                  style={{ fontWeight: "900" }}
                  value={data[2].total_capital_poprio_e_passivo}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          abril:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].total_capital_poprio_e_passivo}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[3] && (
                <NumberFormat
                  className="text-danger"
                  style={{ fontWeight: "900" }}
                  value={data[3].total_capital_poprio_e_passivo}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          maio:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].total_capital_poprio_e_passivo}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[4] && (
                <NumberFormat
                  className="text-danger"
                  style={{ fontWeight: "900" }}
                  value={data[4].total_capital_poprio_e_passivo}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          junho:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].total_capital_poprio_e_passivo}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[5] && (
                <NumberFormat
                  className="text-danger"
                  style={{ fontWeight: "900" }}
                  value={data[5].total_capital_poprio_e_passivo}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          julho:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].total_capital_poprio_e_passivo}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[6] && (
                <NumberFormat
                  className="text-danger"
                  style={{ fontWeight: "900" }}
                  value={data[6].total_capital_poprio_e_passivo}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          agosto:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].total_capital_poprio_e_passivo}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[7] && (
                <NumberFormat
                  className="text-danger"
                  style={{ fontWeight: "900" }}
                  value={data[7].total_capital_poprio_e_passivo}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          setembro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].total_capital_poprio_e_passivo}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[8] && (
                <NumberFormat
                  className="text-danger"
                  style={{ fontWeight: "900" }}
                  value={data[8].total_capital_poprio_e_passivo}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          outubro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].total_capital_poprio_e_passivo}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[9] && (
                <NumberFormat
                  className="text-danger"
                  style={{ fontWeight: "900" }}
                  value={data[9].total_capital_poprio_e_passivo}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          novembro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].total_capital_poprio_e_passivo}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[10] && (
                <NumberFormat
                  className="text-danger"
                  style={{ fontWeight: "900" }}
                  value={data[10].total_capital_poprio_e_passivo}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          dezembro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].total_capital_poprio_e_passivo}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[11] && (
                <NumberFormat
                  className="text-danger"
                  style={{ fontWeight: "900" }}
                  value={data[11].total_capital_poprio_e_passivo}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });
        //----------
      }
    }
    setbalancocolumns(meses);
    setbalancorows(balancorow);
  };

  useEffect(() => {
    getBalanco();
    getDRE();
  }, [mes, ano]);

  return (
    <div className="container">
      <Head>
        <title>Balanço</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <ToastContainer />
        <div className="row">
          <div className="col-md-40">
            <div className="row">
              <div className="col-md-2">
                {" "}
                <h3 className="mt-3 mb-3">{empresa && empresa.nome}</h3>
              </div>

              <div className="col-md-2 mb-1">
                <label>Ano</label>
                <select className="form-control">
                  <option>2022</option>
                  <option>2021</option>
                  <option>2020</option>
                  <option>2019</option>
                  <option>2018</option>
                  <option>2017</option>
                </select>
              </div>
              <div className="col-md-2 mb-1">
                <label>Periodo</label>
                <select className="form-control">
                  <option>Mensal</option>
                  <option>Trimestral</option>
                  <option>Semestral</option>
                  <option>Anual</option>
                </select>
              </div>
              <div className="col-md-2 mb-1">
                <label>Mês</label>
                <select
                  onChange={(e) => {
                    setmes(e.target.value);
                  }}
                  className="form-control"
                >
                  <option>todos</option>
                  <option>janeiro</option>
                  <option>fevereiro</option>
                  <option>março</option>
                  <option>abril</option>
                  <option>maio</option>
                  <option>junho</option>
                  <option>julho</option>
                  <option>agosto</option>
                  <option>setembro</option>
                  <option>outubro</option>
                  <option>novembro</option>
                  <option>dezembro</option>
                </select>
              </div>

              <div className="col-md-2 mb-1">
                <label>Comparação</label>
                <select className="form-control">
                  <option>Mês</option>
                  <option>Ano</option>
                </select>
              </div>
              <div className="col-md-12">
                {balancocolumns && (
                  <DataGrid
                    columns={balancocolumns}
                    rows={balancorows}
                    style={{
                      height: "750px",
                      fontSize: "16px",
                      width: "1100px",
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
