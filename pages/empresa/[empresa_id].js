import Head from "next/head";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import makeid from "../../lib/random";
import Dashboard from "./Dashboard";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import EmpresaLayout from "../../components/layout/empresaLayout";

export default function EmpresaDetalhes({ empresa }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  var toaststate;

  return (
    <EmpresaLayout
      empresa={empresa}
      children={<Dashboard empresa={empresa} />}
    />
  );
}

export async function getServerSideProps(context) {
  const data = await fetch(
    "https://gsmart.vercel.app/api/empresa/infoempresa?empresa_id=" +
      context.query.empresa_id
  );
  const empresa = await data.json();

  return {
    props: { empresa },
  };
}
