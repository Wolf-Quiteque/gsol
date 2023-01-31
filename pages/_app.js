import Head from "next/head";
import "bootstrap-icons/font/bootstrap-icons.css";
import Layout from "../components/layout/layout";
import $ from "jquery";
import { useRef, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const router = useRouter();

  useEffect(() => {
    if (router.pathname == "/login" || router.pathname == "/recuperacao") {
      const element = document.querySelector("body");
      element.classList.add("hold-transition", "login-page");
    } else {
      const element = document.querySelector("body");
      element.classList.remove("login-page");
      element.classList.add(
        "hold-transition",
        "sidebar-mini",
        "layout-fixed",
        "sidebar-collapse"
      );
    }
  }, [router]);
  return (
    <SessionProvider session={session}>
      <Layout>
        <Head>
          <link
            rel="stylesheet"
            href="../plugin/fontawesome-free/css/all.min.css"
          />
          <link
            rel="stylesheet"
            href="../plugin/datatables-bs4/css/dataTables.bootstrap4.min.css"
          />
          <link
            rel="stylesheet"
            href="../plugin/datatables-responsive/css/responsive.bootstrap4.min.css"
          />
          <link
            rel="stylesheet"
            href="../plugin/datatables-buttons/css/buttons.bootstrap4.min.css"
          />
          <link
            href="../https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.css"
            rel="stylesheet"
          />
          <link href="../dist/css/style.css" rel="stylesheet" />
          <link rel="stylesheet" href="../dist/css/adminlte.min.css" />
          <script src="../plugin/jquery/jquery.min.js"></script>
          <script src="../plugin/bootstrap/js/bootstrap.bundle.min.js"></script>
          <script src="../dist/js/adminlte.min.js"></script>
        </Head>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
