import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRef, useState, useEffect } from "react";

import "react-data-grid/dist/react-data-grid.css";
const DataGrid = dynamic(() => import("react-data-grid"), { ssr: false });

export default function PlanoConta({ empresa }) {
  const [PlanoContacolumns, setPlanoContacolumns] = useState([
    {
      key: "Contas",
      name: "Código De Conta",
      width: 300,
      height: 400,
    },
    { key: "natureza", name: "Natureza" },
  ]);

  const [PlanoContarows, setPlanoContarows] = useState([
    {
      Contas: (
        <span style={{ fontWeight: "900" }}>1 Meios fixos e investimentos</span>
      ),
      natureza: "",
    },
    { Contas: " 11 Imobilizaçoes Corporeas", natureza: "Devedor" },
    { Contas: " 12 Imobilizaçoes Incorporeas", natureza: "Devedor" },
    { Contas: " 13 Investimentos Financeiros", natureza: "Devedor" },
    { Contas: " 14 Imobilizaçoes em Curso", natureza: "Devedor" },
    { Contas: " 18 Amortizaçoes Acumuladas", natureza: "Devedor" },
    {
      Contas: "19 Provisões Para Investimentos Financeiros",
      natureza: "Devedor",
    },

    {
      Contas: <span style={{ fontWeight: "900" }}>2 Existências</span>,
      natureza: "",
    },
    { Contas: "21 Compras", natureza: "Devedor" },
    {
      Contas: "22 Matérias-Primas Subsidiarias e De Consumo ",
      natureza: "Devedor",
    },
    { Contas: "23 Produtos e Trabalhos em Curso ", natureza: "Devedor" },
    { Contas: "24 Produtos Acabados e Intermédios", natureza: "Devedor" },
    {
      Contas: "25 SubProdutos Desperdícios Resíduos e Refugos",
      natureza: "Devedor",
    },
    { Contas: "26 Mercadorias", natureza: "Devedor" },
    {
      Contas: "27 Matérias-Primas Mercadorais e outros Matérias Em Trânsito",
      natureza: "Devedor",
    },
    { Contas: "28 Adiantamentos Por Conta De Contas", natureza: "Devedor" },
    {
      Contas: "29 Provisão Para Depreciação de Existências",
      natureza: "Devedor",
    },
    {
      Contas: <span style={{ fontWeight: "900" }}>3 Terceiros</span>,
      natureza: "",
    },
    { Contas: "31 Clientes", natureza: "Devedor" },
    { Contas: "32 Fornecedores", natureza: "Devedor" },
    { Contas: "33 Empréstimos ", natureza: "Devedor" },
    { Contas: "34 Estado", natureza: "Devedor" },
    {
      Contas: "35 Entidades Participantes e Participadas",
      natureza: "Devedor",
    },
    { Contas: "36 Pesssoal", natureza: "Devedor" },
    { Contas: "37 Outros Valores a Pagar e a Receber", natureza: "Devedor" },
    { Contas: "38 Provisões Para Cobranças Duvidosas", natureza: "Devedor" },
    {
      Contas: "39 Provisões Para Outros Riscos E Encargos",
      natureza: "Devedor",
    },
    {
      Contas: <span style={{ fontWeight: "900" }}>4 Meios Monetários</span>,
      natureza: "",
    },

    { Contas: "41 Títulos Negociavéis", natureza: "Devedor" },
    { Contas: "42 Depósito A Prazo ", natureza: "Devedor " },
    { Contas: "43 Deposito A Ordem", natureza: "Devedor" },
    { Contas: "44 Outros Depositos", natureza: "Devedor" },
    { Contas: "45 Caixa", natureza: "Devedor" },
    { Contas: "48 Conta Transitória", natureza: "Devedor" },
    {
      Contas: "49 Provisões Para Aplicações Detesouraria",
      natureza: "Devedor",
    },
    {
      Contas: <span style={{ fontWeight: "900" }}>5 Capital e Reservas</span>,
      natureza: "",
    },
    { Contas: "51 Capital", natureza: "Devedor" },
    { Contas: "52 Acções/Quotas Própias", natureza: "Devedor" },
    { Contas: "53 Premios De Emissão", natureza: "Devedor" },
    { Contas: "54 Prestações Suplementares", natureza: "Devedor" },
    { Contas: "55 Reservas Legais", natureza: "Devedor" },
    { Contas: "56 Resrevas De Reavaliação", natureza: "Devedor" },
    { Contas: "57 Reservas com Fins Especias", natureza: "Devedor" },
    { Contas: "58 Rservas Livres ", natureza: "Devedor" },

    {
      Contas: (
        <span style={{ fontWeight: "900" }}>
          6 Proveitos e Ganhos Por Natureza
        </span>
      ),
      natureza: "",
    },
    { Contas: "61 Vendas", natureza: "Credor" },
    { Contas: "62 Prestações De Serviços", natureza: "Credor" },
    { Contas: "63 Outros Proveitos Opercioanis", natureza: "Credor" },
    {
      Contas:
        "64 Variação nos Inventários de Produtos Acabados e De Produção em Curso",
      natureza: "Credor",
    },
    { Contas: "65 Trabalhos Para Para a Própia Empresa", natureza: "Credor" },
    { Contas: "66 Proveitos e Ganhos Financeiros Gerais", natureza: "Credor" },
    {
      Contas: "67 Proveitos e Ganhos Financeiros em Subsidáriase Associadas ",
      natureza: "Credor",
    },
    {
      Contas: "68 Outros Proveitos e Ganhos Nã Operacionais ",
      natureza: "Credor",
    },
    { Contas: "69 Proveitos e Ganhos Extraordinários " },
    {
      Contas: (
        <span style={{ fontWeight: "900" }}>
          7 Custos e Perdas Por Natureza
        </span>
      ),
      natureza: "",
    },

    { Contas: "71 Custo Das Existências Vendidas", natureza: "Credor" },
    { Contas: "72 Custos Com Pessoal", natureza: "Credor" },

    { Contas: "73 Amortizações do Exercicío", natureza: "Credor" },
    { Contas: "75 Outros Custos e Perdas Operacioanis", natureza: "Credor" },
    { Contas: "76 Custos e Perdas Financeiros Gerais", natureza: "Credor" },
    {
      Contas: "77 Custos e Perdas Financeiras em Filias e Associadas",
      natureza: "Credor",
    },
    { Contas: "78 Outros Custos e Perdas Nã Operacionais", natureza: "Credor" },
    { Contas: "79 Custos e Perdas Extraordinários", natureza: "Credor" },
    {
      Contas: <span style={{ fontWeight: "900" }}>8 Resultados</span>,
      natureza: "",
    },
    { Contas: "81 Resultados Transitados ", natureza: "Credor" },
    { Contas: "82 Resultados Operacionais", natureza: "Credor" },
    { Contas: "83 Resultados Financeiros ", natureza: "Credor" },
    {
      Contas: "84 Resultados Financeiros em Filiase Associadas",
      natureza: "Credor",
    },
    { Contas: "85 Resultados ñ Operacioanis ", natureza: "Credor" },
    { Contas: "86 Resultados Extraordinários", natureza: "Credor" },
    { Contas: "87 Impostos sobre os  Lucros ", natureza: "Credor" },
    { Contas: "88 Resultado Liquido do Exercício", natureza: "Credor" },
    { Contas: "89 Dividendos Antecipados ", natureza: "Credor" },
  ]);

  return (
    <div className="container">
      <Head>
        <title>PlanoConta</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <ToastContainer />

        <div className="row">
          <div className="col-md-12">
            <h3 className="mt-3 mb-3"> {empresa && empresa.nome}</h3>
          </div>
        </div>
        <div className="col-md-12">
          {PlanoContacolumns && (
            <DataGrid
              columns={PlanoContacolumns}
              rows={PlanoContarows}
              style={{
                height: "750px",
                fontSize: "16px",
                width: "1100px",
              }}
            />
          )}
        </div>
      </main>
    </div>
  );
}
