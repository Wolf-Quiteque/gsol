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
  var balanceterow = [];
  var newrows = [];
  var meses = [];

  const [dre, setdre] = useState();

  const [ano, setano] = useState("2022");
  const [mes, setmes] = useState();
  const [balancete, setbalancete] = useState();

  const [balanceterows, setbalanceterows] = useState([
    {
      designacao: " Meios fixos e investimentos",
    },
    {
      designacao: " Debito",
    },
    {
      designacao: "Credito",
    },

    { designacao: "Imobilizacoes Corporeas" },
    { designacao: "Imobilizacoes Incorporeas" },
    { designacao: "Investimentos em Subsidiarias e associadas" },
    { designacao: "Outros Activos Financeiros" },
    { designacao: "Imobilizacoes em Curso" },
    { designacao: "Amortizacoes Acumuladas" },
    { designacao: "Existencias" },
    { designacao: "compras" },
    { designacao: "Mercadorias" },
    { designacao: "Terceiros" },
    { designacao: "Clientes saldo Devedor" },
    { designacao: "Clientes saldo Credor " },
    { designacao: "Fornecedores saldo Credor " },
    { designacao: "Fornecedores saldo Devedor " },
    { designacao: "Estado saldo Devedor" },
    { designacao: "Estado saldo Credor" },
    { designacao: "Entidades Participantes e Participadas SD" },
    { designacao: "Entidades Participantes  e Participadas SC" },
    { designacao: "Pessoal saldo Credor " },
    { designacao: "Pessoal saldo devedor" },
    { designacao: "Outros valaores a rec. e a pag. saldo Credor " },
    { designacao: "Meios Fixos Monetarios " },
    { designacao: "Depositos a Prazo" },
    { designacao: "Deposito a Ordem" },
    { designacao: "Caixa" },
    { designacao: "Accoes" },
    { designacao: "Reservas Legais " },
    { designacao: "Reservas a Fins Especias" },
    { designacao: "Proveitos e Ganhos Por Natureza" },
    { designacao: "Vendas" },
    { designacao: "Prestacao de Servico" },
    { designacao: "Outros Proveitos operacionais" },
    { designacao: "Proveitos e ganhos Financeiros Gerais " },
    { designacao: "Outros Proveitos e Ganhos  nao Operacioanis " },
    { designacao: "Custos e Perdas Por Natureza " },
    { designacao: "Custos das Existencias vendidas" },
    { designacao: "Custos com o Pessoal " },
    { designacao: "Amortizacoes de Exerciocio" },
    { designacao: "Outros custos e perdas Operacionais" },
    { designacao: "Custos e perdas Financeiros Gerais " },
    { designacao: "Outros custos e perdas n Operacioanis" },
    { designacao: "Resuldados" },
    { designacao: "Resuldados Transitados" },
    { designacao: "Reusltado do Ano" },
    { designacao: "Correcoes de Erros Fundamentais " },
    { designacao: "Resultados Operacionais" },
    { designacao: "Resultados Financeiros " },
    { designacao: "Resultados n Operacioanis " },
    { designacao: "Imposto Sobre Lucros " },
    { designacao: "Resultados Liquidos do Exercicio" },
    { designacao: "Total" },
  ]);

  const [balancetecolumns, setbalancetecolumns] = useState();

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

  const getBalancete = async () => {
    const res = await fetch("/api/empresa/getBalancete", {
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

    setbalancete(data);

    var datalenght = Number(data.length) - 1;
    meses.push({
      key: "designacao",
      name: "Designação",
      resizable: true,
      frozen: true,
      width: 300,
    });

    for (let index = 0; index < data.length; index++) {
      if (data[5]) {
        meses.push({
          key: data[index].mes,
          name: data[index].mes,
          width: 200,
          height: 400,
        });
      } else {
        meses.push(
          { key: data[index].mes, name: data[index].mes, width: 150 },
          { key: "credito", name: "credito", resizable: true, width: 150 }
        );
      }

      if (index == datalenght) {
        balanceterow.push({
          designacao: (
            <span style={{ fontWeight: "900" }}>
              1 Meios fixos e investimentos
            </span>
          ),
        });

        balanceterow.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <>
                <NumberFormat
                  value={data[0]["11_debito"]}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
                <NumberFormat
                  value={data[0]["11_credito"]}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              </>
            ) : (
              data[0] && (
                <>
                  <NumberFormat
                    value={data[0]["11_debito"]}
                    thousandSeparator="."
                    decimalSeparator=","
                    displayType="text"
                    decimalScale={2}
                  />
                  <NumberFormat
                    style={{ marginLeft: "10px" }}
                    className="text-danger"
                    value={data[0]["11_credito"]}
                    thousandSeparator="."
                    decimalSeparator=","
                    displayType="text"
                    decimalScale={2}
                  />
                </>
              )
            )),
          credito: "90890",

          designacao: "11 Imobilizacoes Corporeas",
          fevereiro:
            data &&
            (data.length == 1 ? (
              <>
                <NumberFormat
                  value={data[0]["11_debito"]}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />

                <NumberFormat
                  value={data[0]["11_credito"]}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              </>
            ) : (
              data[1] && (
                <>
                  <NumberFormat
                    value={data[1]["11_debito"]}
                    thousandSeparator="."
                    decimalSeparator=","
                    displayType="text"
                    decimalScale={2}
                  />

                  <NumberFormat
                    value={data[1]["11_credito"]}
                    thousandSeparator="."
                    decimalSeparator=","
                    displayType="text"
                    decimalScale={2}
                  />
                </>
              )
            )),

          marco:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0]["11_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[2] && (
                <NumberFormat
                  value={data[2]["11_debito"]}
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
                value={data[0]["11_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[3] && (
                <NumberFormat
                  value={data[3]["11_debito"]}
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
                value={data[0]["11_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[4] && (
                <NumberFormat
                  value={data[4]["11_debito"]}
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
                value={data[0]["11_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[5] && (
                <NumberFormat
                  value={data[5]["11_debito"]}
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
                value={data[0]["11_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[6] && (
                <NumberFormat
                  value={data[6]["11_debito"]}
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
                value={data[0]["11_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[7] && (
                <NumberFormat
                  value={data[7]["11_debito"]}
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
                value={data[0]["11_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[8] && (
                <NumberFormat
                  value={data[8]["11_debito"]}
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
                value={data[0]["11_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[9] && (
                <NumberFormat
                  value={data[9]["11_debito"]}
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
                value={data[0]["11_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[10] && (
                <NumberFormat
                  value={data[10]["11_debito"]}
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
                value={data[0]["11_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[11] && (
                <NumberFormat
                  value={data[11]["11_debito"]}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });

        balanceterow.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0]["12_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[0] && (
                <NumberFormat
                  value={data[0]["12_debito"]}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          designacao: "12 Imobilizacoes Incorporeas",
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0]["12_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[1] && (
                <NumberFormat
                  value={data[1]["12_debito"]}
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
                value={data[0]["12_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[2] && (
                <NumberFormat
                  value={data[2]["12_debito"]}
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
                value={data[0]["12_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[3] && (
                <NumberFormat
                  value={data[3]["12_debito"]}
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
                value={data[0]["12_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[4] && (
                <NumberFormat
                  value={data[4]["12_debito"]}
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
                value={data[0]["12_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[5] && (
                <NumberFormat
                  value={data[5]["12_debito"]}
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
                value={data[0]["12_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[6] && (
                <NumberFormat
                  value={data[6]["12_debito"]}
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
                value={data[0]["12_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[7] && (
                <NumberFormat
                  value={data[7]["12_debito"]}
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
                value={data[0]["12_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[8] && (
                <NumberFormat
                  value={data[8]["12_debito"]}
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
                value={data[0]["12_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[9] && (
                <NumberFormat
                  value={data[9]["12_debito"]}
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
                value={data[0]["12_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[10] && (
                <NumberFormat
                  value={data[10]["12_debito"]}
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
                value={data[0]["12_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[11] && (
                <NumberFormat
                  value={data[11]["12_debito"]}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });

        //----------

        balanceterow.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0]["13_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[0] && (
                <NumberFormat
                  value={data[0]["13_debito"]}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          designacao: " 13 Investimentos em Subsidiarias e associadas",
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0]["13_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[1] && (
                <NumberFormat
                  value={data[1]["13_debito"]}
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
                value={data[0]["13_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[2] && (
                <NumberFormat
                  value={data[2]["13_debito"]}
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
                value={data[0]["13_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[3] && (
                <NumberFormat
                  value={data[3]["13_debito"]}
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
                value={data[0]["13_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[4] && (
                <NumberFormat
                  value={data[4]["13_debito"]}
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
                value={data[0]["13_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[5] && (
                <NumberFormat
                  value={data[5]["13_debito"]}
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
                value={data[0]["13_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[6] && (
                <NumberFormat
                  value={data[6]["13_debito"]}
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
                value={data[0]["13_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[7] && (
                <NumberFormat
                  value={data[7]["13_debito"]}
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
                value={data[0]["13_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[8] && (
                <NumberFormat
                  value={data[8]["13_debito"]}
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
                value={data[0]["13_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[9] && (
                <NumberFormat
                  value={data[9]["13_debito"]}
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
                value={data[0]["13_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[10] && (
                <NumberFormat
                  value={data[10]["13_debito"]}
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
                value={data[0]["13_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[11] && (
                <NumberFormat
                  value={data[11]["13_debito"]}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });

        //----------

        balanceterow.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0]["13_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[0] && (
                <NumberFormat
                  value={data[0]["13_debito"]}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          designacao: "13 Outros Activos Financeiros",
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0]["13_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[1] && (
                <NumberFormat
                  value={data[1]["13_debito"]}
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
                value={data[0]["13_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[2] && (
                <NumberFormat
                  value={data[2]["13_debito"]}
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
                value={data[0]["13_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[3] && (
                <NumberFormat
                  value={data[3]["13_debito"]}
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
                value={data[0]["13_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[4] && (
                <NumberFormat
                  value={data[4]["13_debito"]}
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
                value={data[0]["13_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[5] && (
                <NumberFormat
                  value={data[5]["13_debito"]}
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
                value={data[0]["13_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[6] && (
                <NumberFormat
                  value={data[6]["13_debito"]}
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
                value={data[0]["13_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[7] && (
                <NumberFormat
                  value={data[7]["13_debito"]}
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
                value={data[0]["13_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[8] && (
                <NumberFormat
                  value={data[8]["13_debito"]}
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
                value={data[0]["13_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[9] && (
                <NumberFormat
                  value={data[9]["13_debito"]}
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
                value={data[0]["13_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[10] && (
                <NumberFormat
                  value={data[10]["13_debito"]}
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
                value={data[0]["13_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[11] && (
                <NumberFormat
                  value={data[11]["13_debito"]}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });
        //----------

        balanceterow.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0]["14_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[0] && (
                <NumberFormat
                  value={data[0]["14_debito"]}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          designacao: "14 Imobilizacoes em Curso",
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0]["14_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[1] && (
                <NumberFormat
                  value={data[1]["14_debito"]}
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
                value={data[0]["14_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[2] && (
                <NumberFormat
                  value={data[2]["14_debito"]}
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
                value={data[0]["14_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[3] && (
                <NumberFormat
                  value={data[3]["14_debito"]}
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
                value={data[0]["14_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[4] && (
                <NumberFormat
                  value={data[4]["14_debito"]}
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
                value={data[0]["14_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[5] && (
                <NumberFormat
                  value={data[5]["14_debito"]}
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
                value={data[0]["14_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[6] && (
                <NumberFormat
                  value={data[6]["14_debito"]}
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
                value={data[0]["14_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[7] && (
                <NumberFormat
                  value={data[7]["14_debito"]}
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
                value={data[0]["14_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[8] && (
                <NumberFormat
                  value={data[8]["14_debito"]}
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
                value={data[0]["14_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[9] && (
                <NumberFormat
                  value={data[9]["14_debito"]}
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
                value={data[0]["14_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[10] && (
                <NumberFormat
                  value={data[10]["14_debito"]}
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
                value={data[0]["14_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[11] && (
                <NumberFormat
                  value={data[11]["14_debito"]}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });

        balanceterow.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0]["18_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[0] && (
                <NumberFormat
                  value={data[0]["18_debito"]}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          designacao: " 18 Amortizacoes Acumuladas",
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0]["18_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[1] && (
                <NumberFormat
                  value={data[1]["18_debito"]}
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
                value={data[0]["18_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[2] && (
                <NumberFormat
                  value={data[2]["18_debito"]}
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
                value={data[0]["18_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[3] && (
                <NumberFormat
                  value={data[3]["18_debito"]}
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
                value={data[0]["18_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[4] && (
                <NumberFormat
                  value={data[4]["18_debito"]}
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
                value={data[0]["18_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[5] && (
                <NumberFormat
                  value={data[5]["18_debito"]}
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
                value={data[0]["18_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[6] && (
                <NumberFormat
                  value={data[6]["18_debito"]}
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
                value={data[0]["18_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[7] && (
                <NumberFormat
                  value={data[7]["18_debito"]}
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
                value={data[0]["18_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[8] && (
                <NumberFormat
                  value={data[8]["18_debito"]}
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
                value={data[0]["18_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[9] && (
                <NumberFormat
                  value={data[9]["18_debito"]}
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
                value={data[0]["18_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[10] && (
                <NumberFormat
                  value={data[10]["18_debito"]}
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
                value={data[0]["18_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[11] && (
                <NumberFormat
                  value={data[11]["18_debito"]}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });

        balanceterow.push({
          designacao: <span style={{ fontWeight: "900" }}> 2 Existencias</span>,
        });
        //----------

        balanceterow.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0]["21_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[0] && (
                <NumberFormat
                  value={data[0]["21_debito"]}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          designacao: " 21 Compras",
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0]["21_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[1] && (
                <NumberFormat
                  value={data[1]["21_debito"]}
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
                value={data[0]["21_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[2] && (
                <NumberFormat
                  value={data[2]["21_debito"]}
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
                value={data[0]["21_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[3] && (
                <NumberFormat
                  value={data[3]["21_debito"]}
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
                value={data[0]["21_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[4] && (
                <NumberFormat
                  value={data[4]["21_debito"]}
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
                value={data[0]["21_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[5] && (
                <NumberFormat
                  value={data[5]["21_debito"]}
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
                value={data[0]["21_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[6] && (
                <NumberFormat
                  value={data[6]["21_debito"]}
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
                value={data[0]["21_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[7] && (
                <NumberFormat
                  value={data[7]["21_debito"]}
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
                value={data[0]["21_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[8] && (
                <NumberFormat
                  value={data[8]["21_debito"]}
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
                value={data[0]["21_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[9] && (
                <NumberFormat
                  value={data[9]["21_debito"]}
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
                value={data[0]["21_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[10] && (
                <NumberFormat
                  value={data[10]["21_debito"]}
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
                value={data[0]["21_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[11] && (
                <NumberFormat
                  value={data[11]["21_debito"]}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });
        //----------

        balanceterow.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0]["26_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[0] && (
                <NumberFormat
                  value={data[0]["26_debito"]}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          designacao: "26 Mercadorias ",
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0]["26_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[1] && (
                <NumberFormat
                  value={data[1]["26_debito"]}
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
                value={data[0]["26_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[2] && (
                <NumberFormat
                  value={data[2]["26_debito"]}
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
                value={data[0]["26_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[3] && (
                <NumberFormat
                  value={data[3]["26_debito"]}
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
                value={data[0]["26_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[4] && (
                <NumberFormat
                  value={data[4]["26_debito"]}
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
                value={data[0]["26_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[5] && (
                <NumberFormat
                  value={data[5]["26_debito"]}
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
                value={data[0]["26_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[6] && (
                <NumberFormat
                  value={data[6]["26_debito"]}
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
                value={data[0]["26_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[7] && (
                <NumberFormat
                  value={data[7]["26_debito"]}
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
                value={data[0]["26_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[8] && (
                <NumberFormat
                  value={data[8]["26_debito"]}
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
                value={data[0]["26_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[9] && (
                <NumberFormat
                  value={data[9]["26_debito"]}
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
                value={data[0]["26_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[10] && (
                <NumberFormat
                  value={data[10]["26_debito"]}
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
                value={data[0]["26_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[11] && (
                <NumberFormat
                  value={data[11]["26_debito"]}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });
        //----------

        balanceterow.push({
          designacao: <span style={{ fontWeight: "900" }}> 3 Terceiros</span>,
        });

        balanceterow.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0]["31_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[0] && (
                <NumberFormat
                  value={data[0]["31_debito"]}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          designacao: " 31 Clientes saldo Devedor ",
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0]["31_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[1] && (
                <NumberFormat
                  value={data[1]["31_debito"]}
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
                value={data[0]["31_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[2] && (
                <NumberFormat
                  value={data[2]["31_debito"]}
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
                value={data[0]["31_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[3] && (
                <NumberFormat
                  value={data[3]["31_debito"]}
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
                value={data[0]["31_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[4] && (
                <NumberFormat
                  value={data[4]["31_debito"]}
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
                value={data[0]["31_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[5] && (
                <NumberFormat
                  value={data[5]["31_debito"]}
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
                value={data[0]["31_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[6] && (
                <NumberFormat
                  value={data[6]["31_debito"]}
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
                value={data[0]["31_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[7] && (
                <NumberFormat
                  value={data[7]["31_debito"]}
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
                value={data[0]["31_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[8] && (
                <NumberFormat
                  value={data[8]["31_debito"]}
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
                value={data[0]["31_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[9] && (
                <NumberFormat
                  value={data[9]["31_debito"]}
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
                value={data[0]["31_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[10] && (
                <NumberFormat
                  value={data[10]["31_debito"]}
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
                value={data[0]["31_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[11] && (
                <NumberFormat
                  value={data[11]["31_debito"]}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });
        //----------

        balanceterow.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0]["31_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[0] && (
                <NumberFormat
                  value={data[0]["31_debito"]}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          designacao: " 31 Clientes saldo Credor",
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0]["31_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[1] && (
                <NumberFormat
                  value={data[1]["31_debito"]}
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
                value={data[0]["31_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[2] && (
                <NumberFormat
                  value={data[2]["31_debito"]}
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
                value={data[0]["31_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[3] && (
                <NumberFormat
                  value={data[3]["31_debito"]}
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
                value={data[0]["31_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[4] && (
                <NumberFormat
                  value={data[4]["31_debito"]}
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
                value={data[0]["31_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[5] && (
                <NumberFormat
                  value={data[5]["31_debito"]}
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
                value={data[0]["31_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[6] && (
                <NumberFormat
                  value={data[6]["31_debito"]}
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
                value={data[0]["31_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[7] && (
                <NumberFormat
                  value={data[7]["31_debito"]}
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
                value={data[0]["31_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[8] && (
                <NumberFormat
                  value={data[8]["31_debito"]}
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
                value={data[0]["31_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[9] && (
                <NumberFormat
                  value={data[9]["31_debito"]}
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
                value={data[0]["31_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[10] && (
                <NumberFormat
                  value={data[10]["31_debito"]}
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
                value={data[0]["31_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[11] && (
                <NumberFormat
                  value={data[11]["31_debito"]}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });
        //----------
        balanceterow.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0]["32_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[0] && (
                <NumberFormat
                  value={data[0]["32_debito"]}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          designacao: " 32 Forncedores Saldo Credor",
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0]["32_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[1] && (
                <NumberFormat
                  value={data[1]["32_debito"]}
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
                value={data[0]["32_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[2] && (
                <NumberFormat
                  value={data[2]["32_debito"]}
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
                value={data[0]["32_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[3] && (
                <NumberFormat
                  value={data[3]["32_debito"]}
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
                value={data[0]["32_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[4] && (
                <NumberFormat
                  value={data[4]["32_debito"]}
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
                value={data[0]["32_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[5] && (
                <NumberFormat
                  value={data[5]["32_debito"]}
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
                value={data[0]["32_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[6] && (
                <NumberFormat
                  value={data[6]["32_debito"]}
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
                value={data[0]["32_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[7] && (
                <NumberFormat
                  value={data[7]["32_debito"]}
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
                value={data[0]["32_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[8] && (
                <NumberFormat
                  value={data[8]["32_debito"]}
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
                value={data[0]["32_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[9] && (
                <NumberFormat
                  value={data[9]["32_debito"]}
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
                value={data[0]["32_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[10] && (
                <NumberFormat
                  value={data[10]["32_debito"]}
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
                value={data[0]["32_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[11] && (
                <NumberFormat
                  value={data[11]["32_debito"]}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });

        balanceterow.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0]["32_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[0] && (
                <NumberFormat
                  value={data[0]["32_debito"]}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          designacao: " 32 Forncedores Saldo Devedor",
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0]["32_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[1] && (
                <NumberFormat
                  value={data[1]["32_debito"]}
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
                value={data[0]["32_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[2] && (
                <NumberFormat
                  value={data[2]["32_debito"]}
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
                value={data[0]["32_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[3] && (
                <NumberFormat
                  value={data[3]["32_debito"]}
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
                value={data[0]["32_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[4] && (
                <NumberFormat
                  value={data[4]["32_debito"]}
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
                value={data[0]["32_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[5] && (
                <NumberFormat
                  value={data[5]["32_debito"]}
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
                value={data[0]["32_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[6] && (
                <NumberFormat
                  value={data[6]["32_debito"]}
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
                value={data[0]["32_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[7] && (
                <NumberFormat
                  value={data[7]["32_debito"]}
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
                value={data[0]["32_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[8] && (
                <NumberFormat
                  value={data[8]["32_debito"]}
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
                value={data[0]["32_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[9] && (
                <NumberFormat
                  value={data[9]["32_debito"]}
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
                value={data[0]["32_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[10] && (
                <NumberFormat
                  value={data[10]["32_debito"]}
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
                value={data[0]["32_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[11] && (
                <NumberFormat
                  value={data[11]["32_debito"]}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });
        //----------

        balanceterow.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0]["34_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[0] && (
                <NumberFormat
                  value={data[0]["34_debito"]}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          designacao: "34 Estados saldo Devedor",
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0]["34_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[1] && (
                <NumberFormat
                  value={data[1]["34_debito"]}
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
                value={data[0]["34_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[2] && (
                <NumberFormat
                  value={data[2]["34_debito"]}
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
                value={data[0]["34_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[3] && (
                <NumberFormat
                  value={data[3]["34_debito"]}
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
                value={data[0]["34_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[4] && (
                <NumberFormat
                  value={data[4]["34_debito"]}
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
                value={data[0]["34_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[5] && (
                <NumberFormat
                  value={data[5]["34_debito"]}
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
                value={data[0]["34_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[6] && (
                <NumberFormat
                  value={data[6]["34_debito"]}
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
                value={data[0]["34_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[7] && (
                <NumberFormat
                  value={data[7]["34_debito"]}
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
                value={data[0]["34_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[8] && (
                <NumberFormat
                  value={data[8]["34_debito"]}
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
                value={data[0]["34_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[9] && (
                <NumberFormat
                  value={data[9]["34_debito"]}
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
                value={data[0]["34_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[10] && (
                <NumberFormat
                  value={data[10]["34_debito"]}
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
                value={data[0]["34_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[11] && (
                <NumberFormat
                  value={data[11]["34_debito"]}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });
        //----------

        balanceterow.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0]["34_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[0] && (
                <NumberFormat
                  value={data[0]["34_debito"]}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          designacao: "34 Estado saldo Credor",
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0]["34_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[1] && (
                <NumberFormat
                  value={data[1]["34_debito"]}
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
                value={data[0]["34_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[2] && (
                <NumberFormat
                  value={data[2]["34_debito"]}
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
                value={data[0]["34_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[3] && (
                <NumberFormat
                  value={data[3]["34_debito"]}
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
                value={data[0]["34_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[4] && (
                <NumberFormat
                  value={data[4]["34_debito"]}
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
                value={data[0]["34_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[5] && (
                <NumberFormat
                  value={data[5]["34_debito"]}
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
                value={data[0]["34_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[6] && (
                <NumberFormat
                  value={data[6]["34_debito"]}
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
                value={data[0]["34_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[7] && (
                <NumberFormat
                  value={data[7]["34_debito"]}
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
                value={data[0]["34_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[8] && (
                <NumberFormat
                  value={data[8]["34_debito"]}
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
                value={data[0]["34_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[9] && (
                <NumberFormat
                  value={data[9]["34_debito"]}
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
                value={data[0]["34_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[10] && (
                <NumberFormat
                  value={data[10]["34_debito"]}
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
                value={data[0]["34_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[11] && (
                <NumberFormat
                  value={data[11]["34_debito"]}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });
        //----------

        balanceterow.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0]["35_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[0] && (
                <NumberFormat
                  value={data[0]["35_debito"]}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          designacao: "35 Entidades Participantes e Participadas SD",
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0]["35_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[1] && (
                <NumberFormat
                  value={data[1]["35_debito"]}
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
                value={data[0]["35_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[2] && (
                <NumberFormat
                  value={data[2]["35_debito"]}
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
                value={data[0]["35_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[3] && (
                <NumberFormat
                  value={data[3]["35_debito"]}
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
                value={data[0]["35_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[4] && (
                <NumberFormat
                  value={data[4]["35_debito"]}
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
                value={data[0]["35_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[5] && (
                <NumberFormat
                  value={data[5]["35_debito"]}
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
                value={data[0]["35_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[6] && (
                <NumberFormat
                  value={data[6]["35_debito"]}
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
                value={data[0]["35_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[7] && (
                <NumberFormat
                  value={data[7]["35_debito"]}
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
                value={data[0]["35_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[8] && (
                <NumberFormat
                  value={data[8]["35_debito"]}
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
                value={data[0]["35_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[9] && (
                <NumberFormat
                  value={data[9]["35_debito"]}
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
                value={data[0]["35_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[10] && (
                <NumberFormat
                  value={data[10]["35_debito"]}
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
                value={data[0]["35_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[11] && (
                <NumberFormat
                  value={data[11]["35_debito"]}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });
        //----------

        balanceterow.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0]["35_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[0] && (
                <NumberFormat
                  value={data[0]["35_debito"]}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          designacao: "35 Entidades Participantes e Participadas SC",
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0]["35_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[1] && (
                <NumberFormat
                  value={data[1]["35_debito"]}
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
                value={data[0]["35_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[2] && (
                <NumberFormat
                  value={data[2]["35_debito"]}
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
                value={data[0]["35_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[3] && (
                <NumberFormat
                  value={data[3]["35_debito"]}
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
                value={data[0]["35_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[4] && (
                <NumberFormat
                  value={data[4]["35_debito"]}
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
                value={data[0]["35_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[5] && (
                <NumberFormat
                  value={data[5]["35_debito"]}
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
                value={data[0]["35_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[6] && (
                <NumberFormat
                  value={data[6]["35_debito"]}
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
                value={data[0]["35_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[7] && (
                <NumberFormat
                  value={data[7]["35_debito"]}
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
                value={data[0]["35_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[8] && (
                <NumberFormat
                  value={data[8]["35_debito"]}
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
                value={data[0]["35_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[9] && (
                <NumberFormat
                  value={data[9]["35_debito"]}
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
                value={data[0]["35_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[10] && (
                <NumberFormat
                  value={data[10]["35_debito"]}
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
                value={data[0]["35_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[11] && (
                <NumberFormat
                  value={data[11]["35_debito"]}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });

        balanceterow.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0]["36_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[0] && (
                <NumberFormat
                  value={data[0]["36_debito"]}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          designacao: "36 Pessoal Saldo Credor",
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0]["36_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[1] && (
                <NumberFormat
                  value={data[1]["36_debito"]}
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
                value={data[0]["36_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[2] && (
                <NumberFormat
                  value={data[2]["36_debito"]}
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
                value={data[0]["36_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[3] && (
                <NumberFormat
                  value={data[3]["36_debito"]}
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
                value={data[0]["36_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[4] && (
                <NumberFormat
                  value={data[4]["36_debito"]}
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
                value={data[0]["36_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[5] && (
                <NumberFormat
                  value={data[5]["36_debito"]}
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
                value={data[0]["36_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[6] && (
                <NumberFormat
                  value={data[6]["36_debito"]}
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
                value={data[0]["36_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[7] && (
                <NumberFormat
                  value={data[7]["36_debito"]}
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
                value={data[0]["36_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[8] && (
                <NumberFormat
                  value={data[8]["36_debito"]}
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
                value={data[0]["36_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[9] && (
                <NumberFormat
                  value={data[9]["36_debito"]}
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
                value={data[0]["36_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[10] && (
                <NumberFormat
                  value={data[10]["36_debito"]}
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
                value={data[0]["36_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[11] && (
                <NumberFormat
                  value={data[11]["36_debito"]}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });

        balanceterow.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0]["36_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[0] && (
                <NumberFormat
                  value={data[0]["36_debito"]}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          designacao: "36 Pessoal Saldo devedor",
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0]["36_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[1] && (
                <NumberFormat
                  value={data[1]["36_debito"]}
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
                value={data[0]["36_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[2] && (
                <NumberFormat
                  value={data[2]["36_debito"]}
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
                value={data[0]["36_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[3] && (
                <NumberFormat
                  value={data[3]["36_debito"]}
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
                value={data[0]["36_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[4] && (
                <NumberFormat
                  value={data[4]["36_debito"]}
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
                value={data[0]["36_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[5] && (
                <NumberFormat
                  value={data[5]["36_debito"]}
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
                value={data[0]["36_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[6] && (
                <NumberFormat
                  value={data[6]["36_debito"]}
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
                value={data[0]["36_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[7] && (
                <NumberFormat
                  value={data[7]["36_debito"]}
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
                value={data[0]["36_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[8] && (
                <NumberFormat
                  value={data[8]["36_debito"]}
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
                value={data[0]["36_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[9] && (
                <NumberFormat
                  value={data[9]["36_debito"]}
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
                value={data[0]["36_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[10] && (
                <NumberFormat
                  value={data[10]["36_debito"]}
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
                value={data[0]["36_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[11] && (
                <NumberFormat
                  value={data[11]["36_debito"]}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });
        //----------

        balanceterow.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0]["37_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[0] && (
                <NumberFormat
                  value={data[0]["37_debito"]}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          designacao: "37 Outros Valores a rec. e a pag. saldo Credor",
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0]["37_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[1] && (
                <NumberFormat
                  value={data[1]["37_debito"]}
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
                value={data[0]["37_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[2] && (
                <NumberFormat
                  value={data[2]["37_debito"]}
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
                value={data[0]["37_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[3] && (
                <NumberFormat
                  value={data[3]["37_debito"]}
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
                value={data[0]["37_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[4] && (
                <NumberFormat
                  value={data[4]["37_debito"]}
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
                value={data[0]["37_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[5] && (
                <NumberFormat
                  value={data[5]["37_debito"]}
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
                value={data[0]["37_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[6] && (
                <NumberFormat
                  value={data[6]["37_debito"]}
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
                value={data[0]["37_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[7] && (
                <NumberFormat
                  value={data[7]["37_debito"]}
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
                value={data[0]["37_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[8] && (
                <NumberFormat
                  value={data[8]["37_debito"]}
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
                value={data[0]["37_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[9] && (
                <NumberFormat
                  value={data[9]["37_debito"]}
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
                value={data[0]["37_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[10] && (
                <NumberFormat
                  value={data[10]["37_debito"]}
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
                value={data[0]["37_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[11] && (
                <NumberFormat
                  value={data[11]["37_debito"]}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });
        //----------
        balanceterow.push({
          designacao: (
            <span style={{ fontWeight: "900" }}> 4 Meios Monetários</span>
          ),
        });
        balanceterow.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0]["42_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[0] && (
                <NumberFormat
                  value={data[0]["42_debito"]}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          designacao: "42 Depositosa Prazo",
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0]["42_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[1] && (
                <NumberFormat
                  value={data[1]["42_debito"]}
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
                value={data[0]["42_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[2] && (
                <NumberFormat
                  value={data[2]["42_debito"]}
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
                value={data[0]["42_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[3] && (
                <NumberFormat
                  value={data[3]["42_debito"]}
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
                value={data[0]["42_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[4] && (
                <NumberFormat
                  value={data[4]["42_debito"]}
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
                value={data[0]["42_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[5] && (
                <NumberFormat
                  value={data[5]["42_debito"]}
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
                value={data[0]["42_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[6] && (
                <NumberFormat
                  value={data[6]["42_debito"]}
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
                value={data[0]["42_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[7] && (
                <NumberFormat
                  value={data[7]["42_debito"]}
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
                value={data[0]["42_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[8] && (
                <NumberFormat
                  value={data[8]["42_debito"]}
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
                value={data[0]["42_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[9] && (
                <NumberFormat
                  value={data[9]["42_debito"]}
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
                value={data[0]["42_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[10] && (
                <NumberFormat
                  value={data[10]["42_debito"]}
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
                value={data[0]["42_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[11] && (
                <NumberFormat
                  value={data[11]["42_debito"]}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });
        //----------

        balanceterow.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0]["43_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[0] && (
                <NumberFormat
                  value={data[0]["43_debito"]}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          designacao: "43 Deposito a Ordem",
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0]["43_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[1] && (
                <NumberFormat
                  value={data[1]["43_debito"]}
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
                value={data[0]["43_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[2] && (
                <NumberFormat
                  value={data[2]["43_debito"]}
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
                value={data[0]["43_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[3] && (
                <NumberFormat
                  value={data[3]["43_debito"]}
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
                value={data[0]["43_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[4] && (
                <NumberFormat
                  value={data[4]["43_debito"]}
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
                value={data[0]["43_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[5] && (
                <NumberFormat
                  value={data[5]["43_debito"]}
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
                value={data[0]["43_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[6] && (
                <NumberFormat
                  value={data[6]["43_debito"]}
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
                value={data[0]["43_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[7] && (
                <NumberFormat
                  value={data[7]["43_debito"]}
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
                value={data[0]["43_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[8] && (
                <NumberFormat
                  value={data[8]["43_debito"]}
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
                value={data[0]["43_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[9] && (
                <NumberFormat
                  value={data[9]["43_debito"]}
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
                value={data[0]["43_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[10] && (
                <NumberFormat
                  value={data[10]["43_debito"]}
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
                value={data[0]["43_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[11] && (
                <NumberFormat
                  value={data[11]["43_debito"]}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });
        //----------

        balanceterow.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0]["45_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[0] && (
                <NumberFormat
                  value={data[0]["45_debito"]}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          designacao: "45 Caixa",
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0]["45_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[1] && (
                <NumberFormat
                  value={data[1]["45_debito"]}
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
                value={data[0]["45_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[2] && (
                <NumberFormat
                  value={data[2]["45_debito"]}
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
                value={data[0]["45_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[3] && (
                <NumberFormat
                  value={data[3]["45_debito"]}
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
                value={data[0]["45_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[4] && (
                <NumberFormat
                  value={data[4]["45_debito"]}
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
                value={data[0]["45_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[5] && (
                <NumberFormat
                  value={data[5]["45_debito"]}
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
                value={data[0]["45_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[6] && (
                <NumberFormat
                  value={data[6]["45_debito"]}
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
                value={data[0]["45_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[7] && (
                <NumberFormat
                  value={data[7]["45_debito"]}
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
                value={data[0]["45_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[8] && (
                <NumberFormat
                  value={data[8]["45_debito"]}
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
                value={data[0]["45_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[9] && (
                <NumberFormat
                  value={data[9]["45_debito"]}
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
                value={data[0]["45_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[10] && (
                <NumberFormat
                  value={data[10]["45_debito"]}
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
                value={data[0]["45_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[11] && (
                <NumberFormat
                  value={data[11]["45_debito"]}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });

        balanceterow.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0]["48_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[0] && (
                <NumberFormat
                  value={data[0]["48_debito"]}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          designacao: "48 Caixa Transitoria",
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0]["48_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[1] && (
                <NumberFormat
                  value={data[1]["48_debito"]}
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
                value={data[0]["48_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[2] && (
                <NumberFormat
                  value={data[2]["48_debito"]}
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
                value={data[0]["48_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[3] && (
                <NumberFormat
                  value={data[3]["48_debito"]}
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
                value={data[0]["48_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[4] && (
                <NumberFormat
                  value={data[4]["48_debito"]}
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
                value={data[0]["48_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[5] && (
                <NumberFormat
                  value={data[5]["48_debito"]}
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
                value={data[0]["48_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[6] && (
                <NumberFormat
                  value={data[6]["48_debito"]}
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
                value={data[0]["48_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[7] && (
                <NumberFormat
                  value={data[7]["48_debito"]}
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
                value={data[0]["48_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[8] && (
                <NumberFormat
                  value={data[8]["48_debito"]}
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
                value={data[0]["48_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[9] && (
                <NumberFormat
                  value={data[9]["48_debito"]}
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
                value={data[0]["48_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[10] && (
                <NumberFormat
                  value={data[10]["48_debito"]}
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
                value={data[0]["48_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[11] && (
                <NumberFormat
                  value={data[11]["48_debito"]}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });
        //----------
        balanceterow.push({
          designacao: (
            <span style={{ fontWeight: "900" }}> 5 Capital e Reservas</span>
          ),
        });

        balanceterow.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0]["51_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[0] && (
                <NumberFormat
                  value={data[0]["51_debito"]}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          designacao: "51 Capital",
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0]["51_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[1] && (
                <NumberFormat
                  value={data[1]["51_debito"]}
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
                value={data[0]["51_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[2] && (
                <NumberFormat
                  value={data[2]["51_debito"]}
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
                value={data[0]["51_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[3] && (
                <NumberFormat
                  value={data[3]["51_debito"]}
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
                value={data[0]["51_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[4] && (
                <NumberFormat
                  value={data[4]["51_debito"]}
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
                value={data[0]["51_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[5] && (
                <NumberFormat
                  value={data[5]["51_debito"]}
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
                value={data[0]["51_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[6] && (
                <NumberFormat
                  value={data[6]["51_debito"]}
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
                value={data[0]["51_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[7] && (
                <NumberFormat
                  value={data[7]["51_debito"]}
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
                value={data[0]["51_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[8] && (
                <NumberFormat
                  value={data[8]["51_debito"]}
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
                value={data[0]["51_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[9] && (
                <NumberFormat
                  value={data[9]["51_debito"]}
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
                value={data[0]["51_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[10] && (
                <NumberFormat
                  value={data[10]["51_debito"]}
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
                value={data[0]["51_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[11] && (
                <NumberFormat
                  value={data[11]["51_debito"]}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });
        //----------

        balanceterow.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0]["52_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[0] && (
                <NumberFormat
                  value={data[0]["52_debito"]}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          designacao: "52 Acções",
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0]["52_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[1] && (
                <NumberFormat
                  value={data[1]["52_debito"]}
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
                value={data[0]["52_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[2] && (
                <NumberFormat
                  value={data[2]["52_debito"]}
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
                value={data[0]["52_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[3] && (
                <NumberFormat
                  value={data[3]["52_debito"]}
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
                value={data[0]["52_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[4] && (
                <NumberFormat
                  value={data[4]["52_debito"]}
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
                value={data[0]["52_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[5] && (
                <NumberFormat
                  value={data[5]["52_debito"]}
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
                value={data[0]["52_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[6] && (
                <NumberFormat
                  value={data[6]["52_debito"]}
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
                value={data[0]["52_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[7] && (
                <NumberFormat
                  value={data[7]["52_debito"]}
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
                value={data[0]["52_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[8] && (
                <NumberFormat
                  value={data[8]["52_debito"]}
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
                value={data[0]["52_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[9] && (
                <NumberFormat
                  value={data[9]["52_debito"]}
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
                value={data[0]["52_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[10] && (
                <NumberFormat
                  value={data[10]["52_debito"]}
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
                value={data[0]["52_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[11] && (
                <NumberFormat
                  value={data[11]["52_debito"]}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });

        balanceterow.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0]["55_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[0] && (
                <NumberFormat
                  value={data[0]["55_debito"]}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          designacao: " 55 Reservas Legais",
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0]["55_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[1] && (
                <NumberFormat
                  value={data[1]["55_debito"]}
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
                value={data[0]["55_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[2] && (
                <NumberFormat
                  value={data[2]["55_debito"]}
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
                value={data[0]["55_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[3] && (
                <NumberFormat
                  value={data[3]["55_debito"]}
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
                value={data[0]["55_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[4] && (
                <NumberFormat
                  value={data[4]["55_debito"]}
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
                value={data[0]["55_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[5] && (
                <NumberFormat
                  value={data[5]["55_debito"]}
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
                value={data[0]["55_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[6] && (
                <NumberFormat
                  value={data[6]["55_debito"]}
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
                value={data[0]["55_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[7] && (
                <NumberFormat
                  value={data[7]["55_debito"]}
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
                value={data[0]["55_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[8] && (
                <NumberFormat
                  value={data[8]["55_debito"]}
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
                value={data[0]["55_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[9] && (
                <NumberFormat
                  value={data[9]["55_debito"]}
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
                value={data[0]["55_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[10] && (
                <NumberFormat
                  value={data[10]["55_debito"]}
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
                value={data[0]["55_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[11] && (
                <NumberFormat
                  value={data[11]["55_debito"]}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });

        balanceterow.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0]["57_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[0] && (
                <NumberFormat
                  value={data[0]["57_debito"]}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          designacao: "57 Reservas Fins Especias",
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0]["57_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[1] && (
                <NumberFormat
                  value={data[1]["57_debito"]}
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
                value={data[0]["57_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[2] && (
                <NumberFormat
                  value={data[2]["57_debito"]}
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
                value={data[0]["57_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[3] && (
                <NumberFormat
                  value={data[3]["57_debito"]}
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
                value={data[0]["57_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[4] && (
                <NumberFormat
                  value={data[4]["57_debito"]}
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
                value={data[0]["57_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[5] && (
                <NumberFormat
                  value={data[5]["57_debito"]}
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
                value={data[0]["57_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[6] && (
                <NumberFormat
                  value={data[6]["57_debito"]}
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
                value={data[0]["57_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[7] && (
                <NumberFormat
                  value={data[7]["57_debito"]}
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
                value={data[0]["57_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[8] && (
                <NumberFormat
                  value={data[8]["57_debito"]}
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
                value={data[0]["57_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[9] && (
                <NumberFormat
                  value={data[9]["57_debito"]}
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
                value={data[0]["57_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[10] && (
                <NumberFormat
                  value={data[10]["57_debito"]}
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
                value={data[0]["57_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[11] && (
                <NumberFormat
                  value={data[11]["57_debito"]}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });

        balanceterow.push({
          designacao: (
            <span style={{ fontWeight: "900" }}>
              {" "}
              6 Proveitos e Ganhos Por Natureza
            </span>
          ),
        });

        balanceterow.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0]["61_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[0] && (
                <NumberFormat
                  value={data[0]["61_debito"]}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          designacao: "61 Vendas",
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0]["61_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[1] && (
                <NumberFormat
                  value={data[1]["61_debito"]}
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
                value={data[0]["61_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[2] && (
                <NumberFormat
                  value={data[2]["61_debito"]}
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
                value={data[0]["61_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[3] && (
                <NumberFormat
                  value={data[3]["61_debito"]}
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
                value={data[0]["61_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[4] && (
                <NumberFormat
                  value={data[4]["61_debito"]}
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
                value={data[0]["61_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[5] && (
                <NumberFormat
                  value={data[5]["61_debito"]}
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
                value={data[0]["61_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[6] && (
                <NumberFormat
                  value={data[6]["61_debito"]}
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
                value={data[0]["61_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[7] && (
                <NumberFormat
                  value={data[7]["61_debito"]}
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
                value={data[0]["61_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[8] && (
                <NumberFormat
                  value={data[8]["61_debito"]}
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
                value={data[0]["61_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[9] && (
                <NumberFormat
                  value={data[9]["61_debito"]}
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
                value={data[0]["61_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[10] && (
                <NumberFormat
                  value={data[10]["61_debito"]}
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
                value={data[0]["61_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[11] && (
                <NumberFormat
                  value={data[11]["61_debito"]}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });

        balanceterow.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0]["62_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[0] && (
                <NumberFormat
                  value={data[0]["62_debito"]}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          designacao: "62 Prestações de Serviçco",
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0]["62_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[1] && (
                <NumberFormat
                  value={data[1]["62_debito"]}
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
                value={data[0]["62_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[2] && (
                <NumberFormat
                  value={data[2]["62_debito"]}
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
                value={data[0]["62_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[3] && (
                <NumberFormat
                  value={data[3]["62_debito"]}
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
                value={data[0]["62_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[4] && (
                <NumberFormat
                  value={data[4]["62_debito"]}
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
                value={data[0]["62_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[5] && (
                <NumberFormat
                  value={data[5]["62_debito"]}
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
                value={data[0]["62_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[6] && (
                <NumberFormat
                  value={data[6]["62_debito"]}
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
                value={data[0]["62_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[7] && (
                <NumberFormat
                  value={data[7]["62_debito"]}
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
                value={data[0]["62_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[8] && (
                <NumberFormat
                  value={data[8]["62_debito"]}
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
                value={data[0]["62_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[9] && (
                <NumberFormat
                  value={data[9]["62_debito"]}
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
                value={data[0]["62_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[10] && (
                <NumberFormat
                  value={data[10]["62_debito"]}
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
                value={data[0]["62_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[11] && (
                <NumberFormat
                  value={data[11]["62_debito"]}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });

        balanceterow.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0]["63_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[0] && (
                <NumberFormat
                  value={data[0]["63_debito"]}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          designacao: "63 Outros Proveitos Operacionais",
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0]["63_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[1] && (
                <NumberFormat
                  value={data[1]["63_debito"]}
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
                value={data[0]["63_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[2] && (
                <NumberFormat
                  value={data[2]["63_debito"]}
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
                value={data[0]["63_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[3] && (
                <NumberFormat
                  value={data[3]["63_debito"]}
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
                value={data[0]["63_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[4] && (
                <NumberFormat
                  value={data[4]["63_debito"]}
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
                value={data[0]["63_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[5] && (
                <NumberFormat
                  value={data[5]["63_debito"]}
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
                value={data[0]["63_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[6] && (
                <NumberFormat
                  value={data[6]["63_debito"]}
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
                value={data[0]["63_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[7] && (
                <NumberFormat
                  value={data[7]["63_debito"]}
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
                value={data[0]["63_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[8] && (
                <NumberFormat
                  value={data[8]["63_debito"]}
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
                value={data[0]["63_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[9] && (
                <NumberFormat
                  value={data[9]["63_debito"]}
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
                value={data[0]["63_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[10] && (
                <NumberFormat
                  value={data[10]["63_debito"]}
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
                value={data[0]["63_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[11] && (
                <NumberFormat
                  value={data[11]["63_debito"]}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });

        balanceterow.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0]["66_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[0] && (
                <NumberFormat
                  value={data[0]["66_debito"]}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          designacao: "66 Proveitos e ganhos Financeiros",
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0]["66_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[1] && (
                <NumberFormat
                  value={data[1]["66_debito"]}
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
                value={data[0]["66_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[2] && (
                <NumberFormat
                  value={data[2]["66_debito"]}
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
                value={data[0]["66_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[3] && (
                <NumberFormat
                  value={data[3]["66_debito"]}
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
                value={data[0]["66_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[4] && (
                <NumberFormat
                  value={data[4]["66_debito"]}
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
                value={data[0]["66_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[5] && (
                <NumberFormat
                  value={data[5]["66_debito"]}
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
                value={data[0]["66_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[6] && (
                <NumberFormat
                  value={data[6]["66_debito"]}
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
                value={data[0]["66_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[7] && (
                <NumberFormat
                  value={data[7]["66_debito"]}
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
                value={data[0]["66_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[8] && (
                <NumberFormat
                  value={data[8]["66_debito"]}
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
                value={data[0]["66_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[9] && (
                <NumberFormat
                  value={data[9]["66_debito"]}
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
                value={data[0]["66_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[10] && (
                <NumberFormat
                  value={data[10]["66_debito"]}
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
                value={data[0]["66_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[11] && (
                <NumberFormat
                  value={data[11]["66_debito"]}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });

        balanceterow.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={0}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[0] && (
                <NumberFormat
                  value={0}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          designacao: " 68 Outros proveitos e ganhos ñ Operacionais",
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={0}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[1] && (
                <NumberFormat
                  value={data[1]["0"]}
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
                value={0}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[2] && (
                <NumberFormat
                  value={data[2]["0"]}
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
                value={0}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[3] && (
                <NumberFormat
                  value={data[3]["0"]}
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
                value={0}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[4] && (
                <NumberFormat
                  value={data[4]["0"]}
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
                value={0}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[5] && (
                <NumberFormat
                  value={data[5]["0"]}
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
                value={0}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[6] && (
                <NumberFormat
                  value={data[6]["0"]}
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
                value={0}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[7] && (
                <NumberFormat
                  value={data[7]["0"]}
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
                value={0}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[8] && (
                <NumberFormat
                  value={data[8]["0"]}
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
                value={0}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[9] && (
                <NumberFormat
                  value={data[9]["0"]}
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
                value={0}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[10] && (
                <NumberFormat
                  value={data[10]["0"]}
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
                value={0}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[11] && (
                <NumberFormat
                  value={data[11]["0"]}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });

        balanceterow.push({
          designacao: (
            <span style={{ fontWeight: "900" }}>
              {" "}
              7 Custos e Perdas Por Natureza
            </span>
          ),
        });

        balanceterow.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0]["71_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[0] && (
                <NumberFormat
                  value={data[0]["71_debito"]}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          designacao: "71 Custos das Existéncias Vendidas",
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0]["71_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[1] && (
                <NumberFormat
                  value={data[1]["71_debito"]}
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
                value={data[0]["71_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[2] && (
                <NumberFormat
                  value={data[2]["71_debito"]}
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
                value={data[0]["71_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[3] && (
                <NumberFormat
                  value={data[3]["71_debito"]}
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
                value={data[0]["71_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[4] && (
                <NumberFormat
                  value={data[4]["71_debito"]}
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
                value={data[0]["71_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[5] && (
                <NumberFormat
                  value={data[5]["71_debito"]}
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
                value={data[0]["71_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[6] && (
                <NumberFormat
                  value={data[6]["71_debito"]}
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
                value={data[0]["71_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[7] && (
                <NumberFormat
                  value={data[7]["71_debito"]}
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
                value={data[0]["71_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[8] && (
                <NumberFormat
                  value={data[8]["71_debito"]}
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
                value={data[0]["71_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[9] && (
                <NumberFormat
                  value={data[9]["71_debito"]}
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
                value={data[0]["71_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[10] && (
                <NumberFormat
                  value={data[10]["71_debito"]}
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
                value={data[0]["71_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[11] && (
                <NumberFormat
                  value={data[11]["71_debito"]}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });

        balanceterow.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0]["72_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[0] && (
                <NumberFormat
                  value={data[0]["72_debito"]}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          designacao: "72 Custos com Pessoal",
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0]["72_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[1] && (
                <NumberFormat
                  value={data[1]["72_debito"]}
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
                value={data[0]["72_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[2] && (
                <NumberFormat
                  value={data[2]["72_debito"]}
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
                value={data[0]["72_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[3] && (
                <NumberFormat
                  value={data[3]["72_debito"]}
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
                value={data[0]["72_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[4] && (
                <NumberFormat
                  value={data[4]["72_debito"]}
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
                value={data[0]["72_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[5] && (
                <NumberFormat
                  value={data[5]["72_debito"]}
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
                value={data[0]["72_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[6] && (
                <NumberFormat
                  value={data[6]["72_debito"]}
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
                value={data[0]["72_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[7] && (
                <NumberFormat
                  value={data[7]["72_debito"]}
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
                value={data[0]["72_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[8] && (
                <NumberFormat
                  value={data[8]["72_debito"]}
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
                value={data[0]["72_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[9] && (
                <NumberFormat
                  value={data[9]["72_debito"]}
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
                value={data[0]["72_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[10] && (
                <NumberFormat
                  value={data[10]["72_debito"]}
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
                value={data[0]["72_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[11] && (
                <NumberFormat
                  value={data[11]["72_debito"]}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });

        balanceterow.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0]["73_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[0] && (
                <NumberFormat
                  value={data[0]["73_debito"]}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          designacao: "73 Amortizações de Exercicio",
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0]["73_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[1] && (
                <NumberFormat
                  value={data[1]["73_debito"]}
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
                value={data[0]["73_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[2] && (
                <NumberFormat
                  value={data[2]["73_debito"]}
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
                value={data[0]["73_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[3] && (
                <NumberFormat
                  value={data[3]["73_debito"]}
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
                value={data[0]["73_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[4] && (
                <NumberFormat
                  value={data[4]["73_debito"]}
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
                value={data[0]["73_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[5] && (
                <NumberFormat
                  value={data[5]["73_debito"]}
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
                value={data[0]["73_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[6] && (
                <NumberFormat
                  value={data[6]["73_debito"]}
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
                value={data[0]["73_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[7] && (
                <NumberFormat
                  value={data[7]["73_debito"]}
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
                value={data[0]["73_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[8] && (
                <NumberFormat
                  value={data[8]["73_debito"]}
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
                value={data[0]["73_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[9] && (
                <NumberFormat
                  value={data[9]["73_debito"]}
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
                value={data[0]["73_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[10] && (
                <NumberFormat
                  value={data[10]["73_debito"]}
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
                value={data[0]["73_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[11] && (
                <NumberFormat
                  value={data[11]["73_debito"]}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });

        balanceterow.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0]["75_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[0] && (
                <NumberFormat
                  value={data[0]["75_debito"]}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          designacao: "75 Outros Custos e Perdas Operacioanis ",
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0]["75_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[1] && (
                <NumberFormat
                  value={data[1]["75_debito"]}
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
                value={data[0]["75_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[2] && (
                <NumberFormat
                  value={data[2]["75_debito"]}
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
                value={data[0]["75_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[3] && (
                <NumberFormat
                  value={data[3]["75_debito"]}
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
                value={data[0]["75_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[4] && (
                <NumberFormat
                  value={data[4]["75_debito"]}
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
                value={data[0]["75_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[5] && (
                <NumberFormat
                  value={data[5]["75_debito"]}
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
                value={data[0]["75_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[6] && (
                <NumberFormat
                  value={data[6]["75_debito"]}
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
                value={data[0]["75_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[7] && (
                <NumberFormat
                  value={data[7]["75_debito"]}
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
                value={data[0]["75_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[8] && (
                <NumberFormat
                  value={data[8]["75_debito"]}
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
                value={data[0]["75_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[9] && (
                <NumberFormat
                  value={data[9]["75_debito"]}
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
                value={data[0]["75_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[10] && (
                <NumberFormat
                  value={data[10]["75_debito"]}
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
                value={data[0]["75_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[11] && (
                <NumberFormat
                  value={data[11]["75_debito"]}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });

        balanceterow.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0]["76_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[0] && (
                <NumberFormat
                  value={data[0]["76_debito"]}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          designacao: "76 Custos e Perdas financeiros Gerais ",
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0]["76_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[1] && (
                <NumberFormat
                  value={data[1]["76_debito"]}
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
                value={data[0]["76_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[2] && (
                <NumberFormat
                  value={data[2]["76_debito"]}
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
                value={data[0]["76_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[3] && (
                <NumberFormat
                  value={data[3]["76_debito"]}
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
                value={data[0]["76_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[4] && (
                <NumberFormat
                  value={data[4]["76_debito"]}
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
                value={data[0]["76_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[5] && (
                <NumberFormat
                  value={data[5]["76_debito"]}
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
                value={data[0]["76_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[6] && (
                <NumberFormat
                  value={data[6]["76_debito"]}
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
                value={data[0]["76_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[7] && (
                <NumberFormat
                  value={data[7]["76_debito"]}
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
                value={data[0]["76_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[8] && (
                <NumberFormat
                  value={data[8]["76_debito"]}
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
                value={data[0]["76_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[9] && (
                <NumberFormat
                  value={data[9]["76_debito"]}
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
                value={data[0]["76_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[10] && (
                <NumberFormat
                  value={data[10]["76_debito"]}
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
                value={data[0]["76_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[11] && (
                <NumberFormat
                  value={data[11]["76_debito"]}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });

        balanceterow.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0]["78_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[0] && (
                <NumberFormat
                  value={data[0]["78_debito"]}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          designacao: "78 Outros Custos e Perdas n Operaciaonis ",
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0]["78_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[1] && (
                <NumberFormat
                  value={data[1]["78_debito"]}
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
                value={data[0]["78_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[2] && (
                <NumberFormat
                  value={data[2]["78_debito"]}
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
                value={data[0]["78_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[3] && (
                <NumberFormat
                  value={data[3]["78_debito"]}
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
                value={data[0]["78_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[4] && (
                <NumberFormat
                  value={data[4]["78_debito"]}
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
                value={data[0]["78_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[5] && (
                <NumberFormat
                  value={data[5]["78_debito"]}
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
                value={data[0]["78_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[6] && (
                <NumberFormat
                  value={data[6]["78_debito"]}
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
                value={data[0]["78_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[7] && (
                <NumberFormat
                  value={data[7]["78_debito"]}
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
                value={data[0]["78_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[8] && (
                <NumberFormat
                  value={data[8]["78_debito"]}
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
                value={data[0]["78_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[9] && (
                <NumberFormat
                  value={data[9]["78_debito"]}
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
                value={data[0]["78_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[10] && (
                <NumberFormat
                  value={data[10]["78_debito"]}
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
                value={data[0]["78_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[11] && (
                <NumberFormat
                  value={data[11]["78_debito"]}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });

        //ha porbhhhhhhhhhhhhhhhhhhhhhhhhhffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff

        balanceterow.push({
          designacao: <span style={{ fontWeight: "900" }}> 8 Resultados </span>,
        });

        balanceterow.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0]["81_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[0] && (
                <NumberFormat
                  value={data[0]["81_debito"]}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          designacao: "81 Resultados Transitados",
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={data[0]["81_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[1] && (
                <NumberFormat
                  value={data[1]["81_debito"]}
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
                value={data[0]["81_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[2] && (
                <NumberFormat
                  value={data[2]["81_debito"]}
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
                value={data[0]["81_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[3] && (
                <NumberFormat
                  value={data[3]["81_debito"]}
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
                value={data[0]["81_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[4] && (
                <NumberFormat
                  value={data[4]["81_debito"]}
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
                value={data[0]["81_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[5] && (
                <NumberFormat
                  value={data[5]["81_debito"]}
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
                value={data[0]["81_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[6] && (
                <NumberFormat
                  value={data[6]["81_debito"]}
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
                value={data[0]["81_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[7] && (
                <NumberFormat
                  value={data[7]["81_debito"]}
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
                value={data[0]["81_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[8] && (
                <NumberFormat
                  value={data[8]["81_debito"]}
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
                value={data[0]["81_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[9] && (
                <NumberFormat
                  value={data[9]["81_debito"]}
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
                value={data[0]["81_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[10] && (
                <NumberFormat
                  value={data[10]["81_debito"]}
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
                value={data[0]["81_debito"]}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[11] && (
                <NumberFormat
                  value={data[11]["81_debito"]}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });

        // hdfgfhyeruuhrgfh

        balanceterow.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={0}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[0] && (
                <NumberFormat
                  value={0}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          designacao: "82 Resultados Operacioanis ",
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={0}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[1] && (
                <NumberFormat
                  value={0}
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
                value={0}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[2] && (
                <NumberFormat
                  value={0}
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
                value={0}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[3] && (
                <NumberFormat
                  value={0}
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
                value={0}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[4] && (
                <NumberFormat
                  value={0}
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
                value={0}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[5] && (
                <NumberFormat
                  value={0}
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
                value={0}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[6] && (
                <NumberFormat
                  value={0}
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
                value={0}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[7] && (
                <NumberFormat
                  value={0}
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
                value={0}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[8] && (
                <NumberFormat
                  value={0}
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
                value={0}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[9] && (
                <NumberFormat
                  value={0}
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
                value={0}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[10] && (
                <NumberFormat
                  value={0}
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
                value={0}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[11] && (
                <NumberFormat
                  value={0}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });

        balanceterow.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={0}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[0] && (
                <NumberFormat
                  value={0}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          designacao: "83 Resultados Financeiros ",
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={0}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[1] && (
                <NumberFormat
                  value={0}
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
                value={0}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[2] && (
                <NumberFormat
                  value={0}
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
                value={0}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[3] && (
                <NumberFormat
                  value={0}
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
                value={0}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[4] && (
                <NumberFormat
                  value={0}
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
                value={0}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[5] && (
                <NumberFormat
                  value={0}
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
                value={0}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[6] && (
                <NumberFormat
                  value={0}
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
                value={0}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[7] && (
                <NumberFormat
                  value={0}
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
                value={0}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[8] && (
                <NumberFormat
                  value={0}
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
                value={0}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[9] && (
                <NumberFormat
                  value={0}
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
                value={0}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[10] && (
                <NumberFormat
                  value={0}
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
                value={0}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[11] && (
                <NumberFormat
                  value={0}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });

        balanceterow.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={0}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[0] && (
                <NumberFormat
                  value={0}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          designacao: "85 Resultados ñ Operacionais ",
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={0}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[1] && (
                <NumberFormat
                  value={0}
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
                value={0}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[2] && (
                <NumberFormat
                  value={0}
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
                value={0}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[3] && (
                <NumberFormat
                  value={0}
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
                value={0}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[4] && (
                <NumberFormat
                  value={0}
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
                value={0}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[5] && (
                <NumberFormat
                  value={0}
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
                value={0}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[6] && (
                <NumberFormat
                  value={0}
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
                value={0}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[7] && (
                <NumberFormat
                  value={0}
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
                value={0}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[8] && (
                <NumberFormat
                  value={0}
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
                value={0}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[9] && (
                <NumberFormat
                  value={0}
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
                value={0}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[10] && (
                <NumberFormat
                  value={0}
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
                value={0}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[11] && (
                <NumberFormat
                  value={0}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });

        balanceterow.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={0}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[0] && (
                <NumberFormat
                  value={0}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          designacao: " 87 Imposto Sobre Lucros ",
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={0}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[1] && (
                <NumberFormat
                  value={0}
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
                value={0}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[2] && (
                <NumberFormat
                  value={0}
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
                value={0}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[3] && (
                <NumberFormat
                  value={0}
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
                value={0}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[4] && (
                <NumberFormat
                  value={0}
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
                value={0}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[5] && (
                <NumberFormat
                  value={0}
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
                value={0}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[6] && (
                <NumberFormat
                  value={0}
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
                value={0}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[7] && (
                <NumberFormat
                  value={0}
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
                value={0}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[8] && (
                <NumberFormat
                  value={0}
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
                value={0}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[9] && (
                <NumberFormat
                  value={0}
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
                value={0}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[10] && (
                <NumberFormat
                  value={0}
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
                value={0}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[11] && (
                <NumberFormat
                  value={0}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });

        balanceterow.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={0}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[0] && (
                <NumberFormat
                  value={0}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
          designacao: "88 Resultados Liquidos do exercicios",
          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                value={0}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[1] && (
                <NumberFormat
                  value={0}
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
                value={0}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[2] && (
                <NumberFormat
                  value={0}
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
                value={0}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[3] && (
                <NumberFormat
                  value={0}
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
                value={0}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[4] && (
                <NumberFormat
                  value={0}
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
                value={0}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[5] && (
                <NumberFormat
                  value={0}
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
                value={0}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[6] && (
                <NumberFormat
                  value={0}
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
                value={0}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[7] && (
                <NumberFormat
                  value={0}
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
                value={0}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[8] && (
                <NumberFormat
                  value={0}
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
                value={0}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[9] && (
                <NumberFormat
                  value={0}
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
                value={0}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[10] && (
                <NumberFormat
                  value={0}
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
                value={0}
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                decimalScale={2}
              />
            ) : (
              data[11] && (
                <NumberFormat
                  value={0}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),
        });

        balanceterow.push({
          janeiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={0}
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
                  value={0}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  decimalScale={2}
                />
              )
            )),

          designacao: <span style={{ fontWeight: "900" }}> Total</span>,

          fevereiro:
            data &&
            (data.length == 1 ? (
              <NumberFormat
                className="text-danger"
                style={{ fontWeight: "900" }}
                value={0}
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
                  value={0}
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
                value={0}
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
                  value={0}
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
                value={0}
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
                  value={0}
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
                value={0}
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
                  value={0}
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
                value={0}
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
                  value={0}
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
                value={0}
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
                  value={0}
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
                value={0}
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
                  value={0}
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
                value={0}
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
                  value={0}
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
                value={0}
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
                  value={0}
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
                value={0}
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
                  value={0}
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
                value={0}
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
                  value={0}
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
    setbalancetecolumns(meses);
    setbalanceterows(balanceterow);
  };

  useEffect(() => {
    getBalancete();
    getDRE();
  }, [mes, ano]);

  return (
    <div className="container">
      <Head>
        <title>Balancete</title>
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
                {balancetecolumns && (
                  <DataGrid
                    columns={balancetecolumns}
                    rows={balanceterows}
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
