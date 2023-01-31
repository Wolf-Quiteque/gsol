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

  const [rows, setRows] = useState([
    { designacao: "Vendas" },
    { designacao: "Prestação de serviços" },
    { designacao: "Total" },
    { designacao: "Custos das mercadorias vendidas" },
    { designacao: "Margem Bruto" },
    { designacao: "Outros proveitos operacionasi" },
    { designacao: "Custos de distribuição" },
    { designacao: "Custos adiminstrativos (Pessoal" },
    { designacao: "Outros custos e perdas operacionais" },
    { designacao: "Resultados operacionais (EBITDA)" },
    { designacao: "Amortizações" },
    { designacao: "Resultados operacionais(EBIT)" },
    { designacao: "Resultados Financeiros" },
    { designacao: "Resultados de filhas e associadas" },
    { designacao: "Resultados não operacionais" },
    { designacao: "Resultados antes de imposto" },
    { designacao: "Impostos sobre rendimentos (Provisional)" },
    { designacao: " Resultados Liquidos das actividadesCorrentes" },
    { designacao: "Resultados Extraordinarios" },
    { designacao: "Imposto sobre o Rendimento" },
    { designacao: "Resultados Liquido do exercicio" },
  ]);
  const [balanco, setbalanco] = useState();
  const [ano, setano] = useState("2022");
  const [mes, setmes] = useState("todos");
  const [periodo, setperiodo] = useState("Mensal");
  const [trimestral, settrimestral] = useState("1º");

  const [balancorows, setbalancorows] = useState([
    { designacao: "Activos Não Correntes" },
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
  const [columns, setcolumns] = useState();

  const getDRE = async () => {
    const res = await fetch("/api/empresa/getdre", {
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
    setdre(data);
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
        newrows.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].vendas}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              <NumberFormat
                value={data[0].vendas}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            )),

          designacao: "Vendas",
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].vendas}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[1] && (
                <NumberFormat
                  value={data[1].vendas}
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
                value={data[0].vendas}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[2] && (
                <NumberFormat
                  value={data[2].vendas}
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
                value={data[0].vendas}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[3] && (
                <NumberFormat
                  value={data[3].vendas}
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
                value={data[0].vendas}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[4] && (
                <NumberFormat
                  value={data[4].vendas}
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
                value={data[0].vendas}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[5] && (
                <NumberFormat
                  value={data[5].vendas}
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
                value={data[0].vendas}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[6] && (
                <NumberFormat
                  value={data[6].vendas}
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
                value={data[0].vendas}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[7] && (
                <NumberFormat
                  value={data[7].vendas}
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
                value={data[0].vendas}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[8] && (
                <NumberFormat
                  value={data[8].vendas}
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
                value={data[0].vendas}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[9] && (
                <NumberFormat
                  value={data[9].vendas}
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
                value={data[0].vendas}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[10] && (
                <NumberFormat
                  value={data[10].vendas}
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
                value={data[0].vendas}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[11] && (
                <NumberFormat
                  value={data[11].vendas}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });

        newrows.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].vendas}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              <NumberFormat
                value={data[0].prestacao_de_servico}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            )),
          designacao: "Prestação de serviços",
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].prestacao_de_servico}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[1] && (
                <NumberFormat
                  value={data[1].prestacao_de_servico}
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
                value={data[0].prestacao_de_servico}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[2] && (
                <NumberFormat
                  value={data[2].prestacao_de_servico}
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
                value={data[0].prestacao_de_servico}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[3] && (
                <NumberFormat
                  value={data[3].prestacao_de_servico}
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
                value={data[0].prestacao_de_servico}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[4] && (
                <NumberFormat
                  value={data[4].prestacao_de_servico}
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
                value={data[0].prestacao_de_servico}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[5] && (
                <NumberFormat
                  value={data[5].prestacao_de_servico}
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
                value={data[0].prestacao_de_servico}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[6] && (
                <NumberFormat
                  value={data[6].prestacao_de_servico}
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
                value={data[0].prestacao_de_servico}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[7] && (
                <NumberFormat
                  value={data[7].prestacao_de_servico}
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
                value={data[0].prestacao_de_servico}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[8] && (
                <NumberFormat
                  value={data[8].prestacao_de_servico}
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
                value={data[0].prestacao_de_servico}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[9] && (
                <NumberFormat
                  value={data[9].prestacao_de_servico}
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
                value={data[0].prestacao_de_servico}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[10] && (
                <NumberFormat
                  value={data[10].prestacao_de_servico}
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
                value={data[0].prestacao_de_servico}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[11] && (
                <NumberFormat
                  value={data[11].prestacao_de_servico}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });

        //----------

        newrows.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].total}
                className="text-danger"
                style={{ fontWeight: "900" }}
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
                  value={data[0].total}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          designacao: <span style={{ fontWeight: "900" }}>Total</span>,
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].total}
                className="text-danger"
                style={{ fontWeight: "900" }}
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
                  value={data[1].total}
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
                value={data[0].total}
                className="text-danger"
                style={{ fontWeight: "900" }}
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
                  value={data[2].total}
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
                value={data[0].total}
                className="text-danger"
                style={{ fontWeight: "900" }}
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
                  value={data[3].total}
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
                value={data[0].total}
                className="text-danger"
                style={{ fontWeight: "900" }}
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
                  value={data[4].total}
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
                value={data[0].total}
                className="text-danger"
                style={{ fontWeight: "900" }}
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
                  value={data[5].total}
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
                value={data[0].total}
                className="text-danger"
                style={{ fontWeight: "900" }}
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
                  value={data[6].total}
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
                value={data[0].total}
                className="text-danger"
                style={{ fontWeight: "900" }}
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
                  value={data[7].total}
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
                value={data[0].total}
                className="text-danger"
                style={{ fontWeight: "900" }}
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
                  value={data[8].total}
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
                value={data[0].total}
                className="text-danger"
                style={{ fontWeight: "900" }}
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
                  value={data[9].total}
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
                value={data[0].total}
                className="text-danger"
                style={{ fontWeight: "900" }}
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
                  value={data[10].total}
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
                value={data[0].total}
                className="text-danger"
                style={{ fontWeight: "900" }}
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
                  value={data[11].total}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });

        //----------

        newrows.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].custos_das_mercadorias_vendidas}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[0] && (
                <NumberFormat
                  value={data[0].custos_das_mercadorias_vendidas}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          designacao: "Custos Das Mercadorias Vendidas",
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].custos_das_mercadorias_vendidas}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[1] && (
                <NumberFormat
                  value={data[1].custos_das_mercadorias_vendidas}
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
                value={data[0].custos_das_mercadorias_vendidas}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[2] && (
                <NumberFormat
                  value={data[2].custos_das_mercadorias_vendidas}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          abril: data[3] && (
            <NumberFormat
              value={data[3].custos_das_mercadorias_vendidas}
              thousandSeparator="."
              decimalSeparator=","
              displayType="text"
              decimalScale={2}
            />
          ),
          maio:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].custos_das_mercadorias_vendidas}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[4] && (
                <NumberFormat
                  value={data[4].custos_das_mercadorias_vendidas}
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
                value={data[0].custos_das_mercadorias_vendidas}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[5] && (
                <NumberFormat
                  value={data[5].custos_das_mercadorias_vendidas}
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
                value={data[0].custos_das_mercadorias_vendidas}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[6] && (
                <NumberFormat
                  value={data[6].custos_das_mercadorias_vendidas}
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
                value={data[0].custos_das_mercadorias_vendidas}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[7] && (
                <NumberFormat
                  value={data[7].custos_das_mercadorias_vendidas}
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
                value={data[0].custos_das_mercadorias_vendidas}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[8] && (
                <NumberFormat
                  value={data[8].custos_das_mercadorias_vendidas}
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
                value={data[0].custos_das_mercadorias_vendidas}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[9] && (
                <NumberFormat
                  value={data[9].custos_das_mercadorias_vendidas}
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
                value={data[0].custos_das_mercadorias_vendidas}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[10] && (
                <NumberFormat
                  value={data[10].custos_das_mercadorias_vendidas}
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
                value={data[0].custos_das_mercadorias_vendidas}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[11] && (
                <NumberFormat
                  value={data[11].custos_das_mercadorias_vendidas}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });
        //----------

        newrows.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].margem_bruta}
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
                  value={data[0].margem_bruta}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          designacao: <span style={{ fontWeight: "900" }}>Margem Bruta</span>,

          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].margem_bruta}
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
                  value={data[1].margem_bruta}
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
                value={data[0].margem_bruta}
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
                  value={data[2].margem_bruta}
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
                value={data[0].margem_bruta}
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
                  value={data[3].margem_bruta}
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
                value={data[0].margem_bruta}
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
                  value={data[4].margem_bruta}
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
                value={data[0].margem_bruta}
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
                  value={data[5].margem_bruta}
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
                value={data[0].margem_bruta}
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
                  value={data[6].margem_bruta}
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
                value={data[0].margem_bruta}
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
                  value={data[7].margem_bruta}
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
                value={data[0].margem_bruta}
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
                  value={data[8].margem_bruta}
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
                value={data[0].margem_bruta}
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
                  value={data[9].margem_bruta}
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
                value={data[0].margem_bruta}
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
                  value={data[10].margem_bruta}
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
                value={data[0].margem_bruta}
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
                  value={data[11].margem_bruta}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });
        //----------

        newrows.push({ designacao: "" });

        newrows.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].outros_proveitos_operacionais}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[0] && (
                <NumberFormat
                  value={data[0].outros_proveitos_operacionais}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),

          designacao: "Outros Proveitos Operacionais",

          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].outros_proveitos_operacionais}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[1] && (
                <NumberFormat
                  value={data[1].outros_proveitos_operacionais}
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
                value={data[0].outros_proveitos_operacionais}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[2] && (
                <NumberFormat
                  value={data[2].outros_proveitos_operacionais}
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
                value={data[0].outros_proveitos_operacionais}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[3] && (
                <NumberFormat
                  value={data[3].outros_proveitos_operacionais}
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
                value={data[0].outros_proveitos_operacionais}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[4] && (
                <NumberFormat
                  value={data[4].outros_proveitos_operacionais}
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
                value={data[0].outros_proveitos_operacionais}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[5] && (
                <NumberFormat
                  value={data[5].outros_proveitos_operacionais}
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
                value={data[0].outros_proveitos_operacionais}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[6] && (
                <NumberFormat
                  value={data[6].outros_proveitos_operacionais}
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
                value={data[0].outros_proveitos_operacionais}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[7] && (
                <NumberFormat
                  value={data[7].outros_proveitos_operacionais}
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
                value={data[0].outros_proveitos_operacionais}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[8] && (
                <NumberFormat
                  value={data[8].outros_proveitos_operacionais}
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
                value={data[0].outros_proveitos_operacionais}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[9] && (
                <NumberFormat
                  value={data[9].outros_proveitos_operacionais}
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
                value={data[0].outros_proveitos_operacionais}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[10] && (
                <NumberFormat
                  value={data[10].outros_proveitos_operacionais}
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
                value={data[0].outros_proveitos_operacionais}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[11] && (
                <NumberFormat
                  value={data[11].outros_proveitos_operacionais}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });
        //----------

        newrows.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].custos_de_distribuicao}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[0] && (
                <NumberFormat
                  value={data[0].custos_de_distribuicao}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          designacao: "Custos De Distribuicao",
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].custos_de_distribuicao}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[1] && (
                <NumberFormat
                  value={data[1].custos_de_distribuicao}
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
                value={data[0].custos_de_distribuicao}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[2] && (
                <NumberFormat
                  value={data[2].custos_de_distribuicao}
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
                value={data[0].custos_de_distribuicao}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[3] && (
                <NumberFormat
                  value={data[3].custos_de_distribuicao}
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
                value={data[0].custos_de_distribuicao}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[4] && (
                <NumberFormat
                  value={data[4].custos_de_distribuicao}
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
                value={data[0].custos_de_distribuicao}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[5] && (
                <NumberFormat
                  value={data[5].custos_de_distribuicao}
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
                value={data[0].custos_de_distribuicao}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[6] && (
                <NumberFormat
                  value={data[6].custos_de_distribuicao}
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
                value={data[0].custos_de_distribuicao}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[7] && (
                <NumberFormat
                  value={data[7].custos_de_distribuicao}
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
                value={data[0].custos_de_distribuicao}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[8] && (
                <NumberFormat
                  value={data[8].custos_de_distribuicao}
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
                value={data[0].custos_de_distribuicao}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[9] && (
                <NumberFormat
                  value={data[9].custos_de_distribuicao}
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
                value={data[0].custos_de_distribuicao}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[10] && (
                <NumberFormat
                  value={data[10].custos_de_distribuicao}
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
                value={data[0].custos_de_distribuicao}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[11] && (
                <NumberFormat
                  value={data[11].custos_de_distribuicao}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });
        //----------

        newrows.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].custos_administrativos_pessoal}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[0] && (
                <NumberFormat
                  value={data[0].custos_administrativos_pessoal}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          designacao: "Custos Administrativos Pessoal",
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].custos_administrativos_pessoal}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[1] && (
                <NumberFormat
                  value={data[1].custos_administrativos_pessoal}
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
                value={data[0].custos_administrativos_pessoal}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[2] && (
                <NumberFormat
                  value={data[2].custos_administrativos_pessoal}
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
                value={data[0].custos_administrativos_pessoal}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[3] && (
                <NumberFormat
                  value={data[3].custos_administrativos_pessoal}
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
                value={data[0].custos_administrativos_pessoal}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[4] && (
                <NumberFormat
                  value={data[4].custos_administrativos_pessoal}
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
                value={data[0].custos_administrativos_pessoal}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[5] && (
                <NumberFormat
                  value={data[5].custos_administrativos_pessoal}
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
                value={data[0].custos_administrativos_pessoal}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[6] && (
                <NumberFormat
                  value={data[6].custos_administrativos_pessoal}
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
                value={data[0].custos_administrativos_pessoal}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[7] && (
                <NumberFormat
                  value={data[7].custos_administrativos_pessoal}
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
                value={data[0].custos_administrativos_pessoal}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[8] && (
                <NumberFormat
                  value={data[8].custos_administrativos_pessoal}
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
                value={data[0].custos_administrativos_pessoal}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[9] && (
                <NumberFormat
                  value={data[9].custos_administrativos_pessoal}
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
                value={data[0].custos_administrativos_pessoal}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[10] && (
                <NumberFormat
                  value={data[10].custos_administrativos_pessoal}
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
                value={data[0].custos_administrativos_pessoal}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[11] && (
                <NumberFormat
                  value={data[11].custos_administrativos_pessoal}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });
        //----------

        newrows.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].outros_custos_e_perdas_operacionais}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[0] && (
                <NumberFormat
                  value={data[0].outros_custos_e_perdas_operacionais}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          designacao: "Outros Custos E Perdas Operacionais",
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].outros_custos_e_perdas_operacionais}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[1] && (
                <NumberFormat
                  value={data[1].outros_custos_e_perdas_operacionais}
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
                value={data[0].outros_custos_e_perdas_operacionais}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[2] && (
                <NumberFormat
                  value={data[2].outros_custos_e_perdas_operacionais}
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
                value={data[0].outros_custos_e_perdas_operacionais}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[3] && (
                <NumberFormat
                  value={data[3].outros_custos_e_perdas_operacionais}
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
                value={data[0].outros_custos_e_perdas_operacionais}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[4] && (
                <NumberFormat
                  value={data[4].outros_custos_e_perdas_operacionais}
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
                value={data[0].outros_custos_e_perdas_operacionais}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[5] && (
                <NumberFormat
                  value={data[5].outros_custos_e_perdas_operacionais}
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
                value={data[0].outros_custos_e_perdas_operacionais}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[6] && (
                <NumberFormat
                  value={data[6].outros_custos_e_perdas_operacionais}
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
                value={data[0].outros_custos_e_perdas_operacionais}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[7] && (
                <NumberFormat
                  value={data[7].outros_custos_e_perdas_operacionais}
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
                value={data[0].outros_custos_e_perdas_operacionais}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[8] && (
                <NumberFormat
                  value={data[8].outros_custos_e_perdas_operacionais}
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
                value={data[0].outros_custos_e_perdas_operacionais}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[9] && (
                <NumberFormat
                  value={data[9].outros_custos_e_perdas_operacionais}
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
                value={data[0].outros_custos_e_perdas_operacionais}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[10] && (
                <NumberFormat
                  value={data[10].outros_custos_e_perdas_operacionais}
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
                value={data[0].outros_custos_e_perdas_operacionais}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[11] && (
                <NumberFormat
                  value={data[11].outros_custos_e_perdas_operacionais}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });
        //----------

        newrows.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].resultados_operacionais_ebitda}
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
                  value={data[0].resultados_operacionais_ebitda}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          designacao: (
            <span style={{ fontWeight: "900" }}>
              Resultados Operacionais Ebitda
            </span>
          ),
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].resultados_operacionais_ebitda}
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
                  value={data[1].resultados_operacionais_ebitda}
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
                value={data[0].resultados_operacionais_ebitda}
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
                  value={data[2].resultados_operacionais_ebitda}
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
                value={data[0].resultados_operacionais_ebitda}
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
                  value={data[3].resultados_operacionais_ebitda}
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
                value={data[0].resultados_operacionais_ebitda}
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
                  value={data[4].resultados_operacionais_ebitda}
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
                value={data[0].resultados_operacionais_ebitda}
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
                  value={data[5].resultados_operacionais_ebitda}
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
                value={data[0].resultados_operacionais_ebitda}
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
                  value={data[6].resultados_operacionais_ebitda}
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
                value={data[0].resultados_operacionais_ebitda}
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
                  value={data[7].resultados_operacionais_ebitda}
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
                value={data[0].resultados_operacionais_ebitda}
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
                  value={data[8].resultados_operacionais_ebitda}
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
                value={data[0].resultados_operacionais_ebitda}
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
                  value={data[9].resultados_operacionais_ebitda}
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
                value={data[0].resultados_operacionais_ebitda}
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
                  value={data[10].resultados_operacionais_ebitda}
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
                value={data[0].resultados_operacionais_ebitda}
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
                  value={data[11].resultados_operacionais_ebitda}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });
        //----------

        newrows.push({ designacao: "" });

        newrows.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].amortizacoes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[0] && (
                <NumberFormat
                  value={data[0].amortizacoes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          designacao: "Amortizacoes",
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].amortizacoes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[1] && (
                <NumberFormat
                  value={data[1].amortizacoes}
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
                value={data[0].amortizacoes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[2] && (
                <NumberFormat
                  value={data[2].amortizacoes}
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
                value={data[0].amortizacoes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[3] && (
                <NumberFormat
                  value={data[3].amortizacoes}
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
                value={data[0].amortizacoes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[4] && (
                <NumberFormat
                  value={data[4].amortizacoes}
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
                value={data[0].amortizacoes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[5] && (
                <NumberFormat
                  value={data[5].amortizacoes}
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
                value={data[0].amortizacoes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[6] && (
                <NumberFormat
                  value={data[6].amortizacoes}
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
                value={data[0].amortizacoes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[7] && (
                <NumberFormat
                  value={data[7].amortizacoes}
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
                value={data[0].amortizacoes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[8] && (
                <NumberFormat
                  value={data[8].amortizacoes}
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
                value={data[0].amortizacoes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[9] && (
                <NumberFormat
                  value={data[9].amortizacoes}
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
                value={data[0].amortizacoes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[10] && (
                <NumberFormat
                  value={data[10].amortizacoes}
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
                value={data[0].amortizacoes}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[11] && (
                <NumberFormat
                  value={data[11].amortizacoes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });
        //----------

        newrows.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].resultados_operacionais_ebit}
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
                  value={data[0].resultados_operacionais_ebit}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          designacao: (
            <span style={{ fontWeight: "900" }}>
              Resultados Operacionais Ebit
            </span>
          ),
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].resultados_operacionais_ebit}
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
                  value={data[1].resultados_operacionais_ebit}
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
                value={data[0].resultados_operacionais_ebit}
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
                  value={data[2].resultados_operacionais_ebit}
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
                value={data[0].resultados_operacionais_ebit}
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
                  value={data[3].resultados_operacionais_ebit}
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
                value={data[0].resultados_operacionais_ebit}
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
                  value={data[4].resultados_operacionais_ebit}
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
                value={data[0].resultados_operacionais_ebit}
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
                  value={data[5].resultados_operacionais_ebit}
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
                value={data[0].resultados_operacionais_ebit}
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
                  value={data[6].resultados_operacionais_ebit}
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
                value={data[0].resultados_operacionais_ebit}
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
                  value={data[7].resultados_operacionais_ebit}
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
                value={data[0].resultados_operacionais_ebit}
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
                  value={data[8].resultados_operacionais_ebit}
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
                value={data[0].resultados_operacionais_ebit}
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
                  value={data[9].resultados_operacionais_ebit}
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
                value={data[0].resultados_operacionais_ebit}
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
                  value={data[10].resultados_operacionais_ebit}
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
                value={data[0].resultados_operacionais_ebit}
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
                  value={data[11].resultados_operacionais_ebit}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });
        //----------

        newrows.push({ designacao: "" });

        newrows.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].resultados_financeiros}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[0] && (
                <NumberFormat
                  value={data[0].resultados_financeiros}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          designacao: "Resultados Financeiros",
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].resultados_financeiros}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[1] && (
                <NumberFormat
                  value={data[1].resultados_financeiros}
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
                value={data[0].resultados_financeiros}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[2] && (
                <NumberFormat
                  value={data[2].resultados_financeiros}
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
                value={data[0].resultados_financeiros}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[3] && (
                <NumberFormat
                  value={data[3].resultados_financeiros}
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
                value={data[0].resultados_financeiros}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[4] && (
                <NumberFormat
                  value={data[4].resultados_financeiros}
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
                value={data[0].resultados_financeiros}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[5] && (
                <NumberFormat
                  value={data[5].resultados_financeiros}
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
                value={data[0].resultados_financeiros}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[6] && (
                <NumberFormat
                  value={data[6].resultados_financeiros}
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
                value={data[0].resultados_financeiros}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[7] && (
                <NumberFormat
                  value={data[7].resultados_financeiros}
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
                value={data[0].resultados_financeiros}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[8] && (
                <NumberFormat
                  value={data[8].resultados_financeiros}
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
                value={data[0].resultados_financeiros}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[9] && (
                <NumberFormat
                  value={data[9].resultados_financeiros}
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
                value={data[0].resultados_financeiros}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[10] && (
                <NumberFormat
                  value={data[10].resultados_financeiros}
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
                value={data[0].resultados_financeiros}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[11] && (
                <NumberFormat
                  value={data[11].resultados_financeiros}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });
        //----------

        newrows.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].resultados_de_filias_e_associados}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[0] && (
                <NumberFormat
                  value={data[0].resultados_de_filias_e_associados}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          designacao: "Resultados De Filias E Associados",
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].resultados_de_filias_e_associados}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[1] && (
                <NumberFormat
                  value={data[1].resultados_de_filias_e_associados}
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
                value={data[0].resultados_de_filias_e_associados}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[2] && (
                <NumberFormat
                  value={data[2].resultados_de_filias_e_associados}
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
                value={data[0].resultados_de_filias_e_associados}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[3] && (
                <NumberFormat
                  value={data[3].resultados_de_filias_e_associados}
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
                value={data[0].resultados_de_filias_e_associados}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[4] && (
                <NumberFormat
                  value={data[4].resultados_de_filias_e_associados}
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
                value={data[0].resultados_de_filias_e_associados}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[5] && (
                <NumberFormat
                  value={data[5].resultados_de_filias_e_associados}
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
                value={data[0].resultados_de_filias_e_associados}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[6] && (
                <NumberFormat
                  value={data[6].resultados_de_filias_e_associados}
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
                value={data[0].resultados_de_filias_e_associados}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[7] && (
                <NumberFormat
                  value={data[7].resultados_de_filias_e_associados}
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
                value={data[0].resultados_de_filias_e_associados}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[8] && (
                <NumberFormat
                  value={data[8].resultados_de_filias_e_associados}
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
                value={data[0].resultados_de_filias_e_associados}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[9] && (
                <NumberFormat
                  value={data[9].resultados_de_filias_e_associados}
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
                value={data[0].resultados_de_filias_e_associados}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[10] && (
                <NumberFormat
                  value={data[10].resultados_de_filias_e_associados}
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
                value={data[0].resultados_de_filias_e_associados}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[11] && (
                <NumberFormat
                  value={data[11].resultados_de_filias_e_associados}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });
        //----------

        newrows.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].resultados_nao_operacionas}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[0] && (
                <NumberFormat
                  value={data[0].resultados_nao_operacionas}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          designacao: "Resultados Nao Operacionas",
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].resultados_nao_operacionas}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[1] && (
                <NumberFormat
                  value={data[1].resultados_nao_operacionas}
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
                value={data[0].resultados_nao_operacionas}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[2] && (
                <NumberFormat
                  value={data[2].resultados_nao_operacionas}
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
                value={data[0].resultados_nao_operacionas}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[3] && (
                <NumberFormat
                  value={data[3].resultados_nao_operacionas}
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
                value={data[0].resultados_nao_operacionas}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[4] && (
                <NumberFormat
                  value={data[4].resultados_nao_operacionas}
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
                value={data[0].resultados_nao_operacionas}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[5] && (
                <NumberFormat
                  value={data[5].resultados_nao_operacionas}
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
                value={data[0].resultados_nao_operacionas}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[6] && (
                <NumberFormat
                  value={data[6].resultados_nao_operacionas}
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
                value={data[0].resultados_nao_operacionas}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[7] && (
                <NumberFormat
                  value={data[7].resultados_nao_operacionas}
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
                value={data[0].resultados_nao_operacionas}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[8] && (
                <NumberFormat
                  value={data[8].resultados_nao_operacionas}
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
                value={data[0].resultados_nao_operacionas}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[9] && (
                <NumberFormat
                  value={data[9].resultados_nao_operacionas}
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
                value={data[0].resultados_nao_operacionas}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[10] && (
                <NumberFormat
                  value={data[10].resultados_nao_operacionas}
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
                value={data[0].resultados_nao_operacionas}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[11] && (
                <NumberFormat
                  value={data[11].resultados_nao_operacionas}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });
        //----------
        newrows.push({ designacao: "" });

        newrows.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].resultados_antes_de_imposto}
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
                  value={data[0].resultados_antes_de_imposto}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          designacao: (
            <span style={{ fontWeight: "900" }}>
              Resultados Antes De Imposto
            </span>
          ),
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].resultados_antes_de_imposto}
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
                  value={data[1].resultados_antes_de_imposto}
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
                value={data[0].resultados_antes_de_imposto}
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
                  value={data[2].resultados_antes_de_imposto}
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
                value={data[0].resultados_antes_de_imposto}
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
                  value={data[3].resultados_antes_de_imposto}
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
                value={data[0].resultados_antes_de_imposto}
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
                  value={data[4].resultados_antes_de_imposto}
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
                value={data[0].resultados_antes_de_imposto}
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
                  value={data[5].resultados_antes_de_imposto}
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
                value={data[0].resultados_antes_de_imposto}
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
                  value={data[6].resultados_antes_de_imposto}
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
                value={data[0].resultados_antes_de_imposto}
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
                  value={data[7].resultados_antes_de_imposto}
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
                value={data[0].resultados_antes_de_imposto}
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
                  value={data[8].resultados_antes_de_imposto}
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
                value={data[0].resultados_antes_de_imposto}
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
                  value={data[9].resultados_antes_de_imposto}
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
                value={data[0].resultados_antes_de_imposto}
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
                  value={data[10].resultados_antes_de_imposto}
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
                value={data[0].resultados_antes_de_imposto}
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
                  value={data[11].resultados_antes_de_imposto}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });
        //----------

        newrows.push({ designacao: "" });

        newrows.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].imposto_sobre_os_rendimentos_provisional}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[0] && (
                <NumberFormat
                  value={data[0].imposto_sobre_os_rendimentos_provisional}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          designacao: "Imposto Sobre Os Rendimentos Provisional",
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].imposto_sobre_os_rendimentos_provisional}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[1] && (
                <NumberFormat
                  value={data[1].imposto_sobre_os_rendimentos_provisional}
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
                value={data[0].imposto_sobre_os_rendimentos_provisional}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[2] && (
                <NumberFormat
                  value={data[2].imposto_sobre_os_rendimentos_provisional}
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
                value={data[0].imposto_sobre_os_rendimentos_provisional}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[3] && (
                <NumberFormat
                  value={data[3].imposto_sobre_os_rendimentos_provisional}
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
                value={data[0].imposto_sobre_os_rendimentos_provisional}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[4] && (
                <NumberFormat
                  value={data[4].imposto_sobre_os_rendimentos_provisional}
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
                value={data[0].imposto_sobre_os_rendimentos_provisional}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[5] && (
                <NumberFormat
                  value={data[5].imposto_sobre_os_rendimentos_provisional}
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
                value={data[0].imposto_sobre_os_rendimentos_provisional}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[6] && (
                <NumberFormat
                  value={data[6].imposto_sobre_os_rendimentos_provisional}
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
                value={data[0].imposto_sobre_os_rendimentos_provisional}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[7] && (
                <NumberFormat
                  value={data[7].imposto_sobre_os_rendimentos_provisional}
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
                value={data[0].imposto_sobre_os_rendimentos_provisional}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[8] && (
                <NumberFormat
                  value={data[8].imposto_sobre_os_rendimentos_provisional}
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
                value={data[0].imposto_sobre_os_rendimentos_provisional}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[9] && (
                <NumberFormat
                  value={data[9].imposto_sobre_os_rendimentos_provisional}
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
                value={data[0].imposto_sobre_os_rendimentos_provisional}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[10] && (
                <NumberFormat
                  value={data[10].imposto_sobre_os_rendimentos_provisional}
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
                value={data[0].imposto_sobre_os_rendimentos_provisional}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[11] && (
                <NumberFormat
                  value={data[11].imposto_sobre_os_rendimentos_provisional}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });
        //----------
        newrows.push({ designacao: "" });

        newrows.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].resultados_liquidos_das_actividades_correntes}
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
                  value={data[0].resultados_liquidos_das_actividades_correntes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          designacao: (
            <span style={{ fontWeight: "900" }}>
              Resultados Liquidos Das Actividades Correntes
            </span>
          ),
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].resultados_liquidos_das_actividades_correntes}
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
                  value={data[1].resultados_liquidos_das_actividades_correntes}
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
                value={data[0].resultados_liquidos_das_actividades_correntes}
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
                  value={data[2].resultados_liquidos_das_actividades_correntes}
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
                value={data[0].resultados_liquidos_das_actividades_correntes}
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
                  value={data[3].resultados_liquidos_das_actividades_correntes}
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
                value={data[0].resultados_liquidos_das_actividades_correntes}
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
                  value={data[4].resultados_liquidos_das_actividades_correntes}
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
                value={data[0].resultados_liquidos_das_actividades_correntes}
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
                  value={data[5].resultados_liquidos_das_actividades_correntes}
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
                value={data[0].resultados_liquidos_das_actividades_correntes}
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
                  value={data[6].resultados_liquidos_das_actividades_correntes}
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
                value={data[0].resultados_liquidos_das_actividades_correntes}
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
                  value={data[7].resultados_liquidos_das_actividades_correntes}
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
                value={data[0].resultados_liquidos_das_actividades_correntes}
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
                  value={data[8].resultados_liquidos_das_actividades_correntes}
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
                value={data[0].resultados_liquidos_das_actividades_correntes}
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
                  value={data[9].resultados_liquidos_das_actividades_correntes}
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
                value={data[0].resultados_liquidos_das_actividades_correntes}
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
                  value={data[10].resultados_liquidos_das_actividades_correntes}
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
                value={data[0].resultados_liquidos_das_actividades_correntes}
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
                  value={data[11].resultados_liquidos_das_actividades_correntes}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });
        //----------
        newrows.push({ designacao: "" });

        newrows.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].reultados_extraordinario}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[0] && (
                <NumberFormat
                  value={data[0].reultados_extraordinario}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          designacao: "Reultados Extraordinario",
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].reultados_extraordinario}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[1] && (
                <NumberFormat
                  value={data[1].reultados_extraordinario}
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
                value={data[0].reultados_extraordinario}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[2] && (
                <NumberFormat
                  value={data[2].reultados_extraordinario}
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
                value={data[0].reultados_extraordinario}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[3] && (
                <NumberFormat
                  value={data[3].reultados_extraordinario}
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
                value={data[0].reultados_extraordinario}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[4] && (
                <NumberFormat
                  value={data[4].reultados_extraordinario}
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
                value={data[0].reultados_extraordinario}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[5] && (
                <NumberFormat
                  value={data[5].reultados_extraordinario}
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
                value={data[0].reultados_extraordinario}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[6] && (
                <NumberFormat
                  value={data[6].reultados_extraordinario}
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
                value={data[0].reultados_extraordinario}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[7] && (
                <NumberFormat
                  value={data[7].reultados_extraordinario}
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
                value={data[0].reultados_extraordinario}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[8] && (
                <NumberFormat
                  value={data[8].reultados_extraordinario}
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
                value={data[0].reultados_extraordinario}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[9] && (
                <NumberFormat
                  value={data[9].reultados_extraordinario}
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
                value={data[0].reultados_extraordinario}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[10] && (
                <NumberFormat
                  value={data[10].reultados_extraordinario}
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
                value={data[0].reultados_extraordinario}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[11] && (
                <NumberFormat
                  value={data[11].reultados_extraordinario}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });
        //----------

        newrows.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].imposto_sobre_rendimetno}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[0] && (
                <NumberFormat
                  value={data[0].imposto_sobre_rendimetno}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          designacao: "Imposto Sobre Rendimetno",
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0].imposto_sobre_rendimetno}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[1] && (
                <NumberFormat
                  value={data[1].imposto_sobre_rendimetno}
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
                value={data[0].imposto_sobre_rendimetno}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[2] && (
                <NumberFormat
                  value={data[2].imposto_sobre_rendimetno}
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
                value={data[0].imposto_sobre_rendimetno}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[3] && (
                <NumberFormat
                  value={data[3].imposto_sobre_rendimetno}
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
                value={data[0].imposto_sobre_rendimetno}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[4] && (
                <NumberFormat
                  value={data[4].imposto_sobre_rendimetno}
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
                value={data[0].imposto_sobre_rendimetno}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[5] && (
                <NumberFormat
                  value={data[5].imposto_sobre_rendimetno}
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
                value={data[0].imposto_sobre_rendimetno}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[6] && (
                <NumberFormat
                  value={data[6].imposto_sobre_rendimetno}
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
                value={data[0].imposto_sobre_rendimetno}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[7] && (
                <NumberFormat
                  value={data[7].imposto_sobre_rendimetno}
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
                value={data[0].imposto_sobre_rendimetno}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[8] && (
                <NumberFormat
                  value={data[8].imposto_sobre_rendimetno}
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
                value={data[0].imposto_sobre_rendimetno}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[9] && (
                <NumberFormat
                  value={data[9].imposto_sobre_rendimetno}
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
                value={data[0].imposto_sobre_rendimetno}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[10] && (
                <NumberFormat
                  value={data[10].imposto_sobre_rendimetno}
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
                value={data[0].imposto_sobre_rendimetno}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[11] && (
                <NumberFormat
                  value={data[11].imposto_sobre_rendimetno}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });
        //----------

        newrows.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].resultados_liquido_do_exercicio}
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
                  value={data[0].resultados_liquido_do_exercicio}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          designacao: (
            <span style={{ fontWeight: "900" }}>
              {" "}
              Resultados Liquido Do Exercicio
            </span>
          ),
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={data[0].resultados_liquido_do_exercicio}
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
                  value={data[1].resultados_liquido_do_exercicio}
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
                value={data[0].resultados_liquido_do_exercicio}
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
                  value={data[2].resultados_liquido_do_exercicio}
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
                value={data[0].resultados_liquido_do_exercicio}
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
                  value={data[3].resultados_liquido_do_exercicio}
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
                value={data[0].resultados_liquido_do_exercicio}
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
                  value={data[4].resultados_liquido_do_exercicio}
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
                value={data[0].resultados_liquido_do_exercicio}
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
                  value={data[5].resultados_liquido_do_exercicio}
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
                value={data[0].resultados_liquido_do_exercicio}
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
                  value={data[6].resultados_liquido_do_exercicio}
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
                value={data[0].resultados_liquido_do_exercicio}
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
                  value={data[7].resultados_liquido_do_exercicio}
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
                value={data[0].resultados_liquido_do_exercicio}
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
                  value={data[8].resultados_liquido_do_exercicio}
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
                value={data[0].resultados_liquido_do_exercicio}
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
                  value={data[9].resultados_liquido_do_exercicio}
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
                value={data[0].resultados_liquido_do_exercicio}
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
                  value={data[10].resultados_liquido_do_exercicio}
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
                value={data[0].resultados_liquido_do_exercicio}
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
                  value={data[11].resultados_liquido_do_exercicio}
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
    setRows(newrows);
    setcolumns(meses);
  };

  const getBalanco = async () => {
    const res = await fetch("/api/empresa/getBalanco", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_empresa: new ObjectId(empresa._id),
      }),
    });
    const data = await res.json();
    setbalanco(data);
  };

  useEffect(() => {
    getBalanco();
    getDRE();
  }, [mes, ano]);

  return (
    <div className="container">
      <Head>
        <title>Demostração</title>
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
                <select
                  onChange={(e) => {
                    setperiodo(e.target.value);
                  }}
                  className="form-control"
                >
                  <option>Mensal</option>
                  <option>Trimestral</option>
                  <option>Semestral</option>
                  <option>Anual</option>
                </select>
              </div>
              <div className="col-md-2 mb-1">
                {periodo == "Mensal" ? (
                  <>
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
                  </>
                ) : periodo == "Trimestral" ? (
                  <>
                    <label>Trimestral</label>
                    <select
                      onChange={(e) => {
                        settrimestral(e.target.value);
                      }}
                      className="form-control"
                    >
                      <option>todos</option>
                      <option>1º</option>
                      <option>2º</option>
                      <option>3º</option>
                    </select>
                  </>
                ) : (
                  ""
                )}
              </div>

              <div className="col-md-2 mb-1">
                <label>Comparação</label>
                <select className="form-control">
                  <option>Mês</option>
                  <option>Ano</option>
                </select>
              </div>

              <div className="col-md-12">
                {columns && (
                  <DataGrid
                    columns={columns}
                    rows={rows}
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
