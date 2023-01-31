import Head from "next/head";
import { ObjectId } from "bson";

import Link from "next/link";
import BarChart from "../../components/recharts/Barchart";
import BarChart2 from "../../components/recharts/Barchart2";
import BarChart3 from "../../components/recharts/Barchart3";
import BarChart4 from "../../components/recharts/Barchart4";
import BarChart5 from "../../components/recharts/Barchart5";
import BarChart7 from "../../components/recharts/Barchart7";

import LineChart from "../../components/recharts/LineChart";

import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import TimeAgo from "javascript-time-ago";

// English.
import en from "javascript-time-ago/locale/en";
import "react-toastify/dist/ReactToastify.css";
import NumberFormat from "react-number-format";

export default function Dashboard({ empresa }) {
  TimeAgo.addDefaultLocale(en);
  const timeAgo = new TimeAgo("en-EN");
  const [textvalue, settextvalue] = useState("");
  const [file, setFile] = useState();

  const [messages, setmessages] = useState(false);

  const [Text, setText] = useState();
  const [img, setimg] = useState();
  const [rand, setrand] = useState("Jk");

  useEffect(() => {
    const changeimg = () => {
      if (file) {
        setimg(URL.createObjectURL(file));
      }
    };
    changeimg();
  }, [file]);

  const sendmessage = async () => {
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

    const res = await fetch("/api/mensagem/novo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: empresa._id,
        img: img ? result.url : "none",
        text: Text ? Text : "none",
        sender: "gsmart",
        empresaname: empresa.nome,
        reciver: empresa._id,
        createdTime: new Date(),
      }),
    });

    if (res.status == 200) {
      setText("");
      setimg(null);
      setFile(null);
      random();
    }
  };

  const GetMessage = async () => {
    const res = await fetch("/api/messeges/all", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reciver: empresa._id,
      }),
    });
    const data = await res.json();
    setmessages(data);
  };

  function random() {
    setrand(Math.random());
  }

  useEffect(() => {
    GetMessage();
  }, [rand]);
  return (
    <div className="container">
      <Head>
        <title>ChatRoom</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <ToastContainer />

        <div className="row">
          <div className="col-md-12">
            <h3 className="mt-3 mb-3">Chatroom - {empresa && empresa.nome}</h3>
          </div>
          <div className="col-md-12">
            <div className="card card-success card-outline direct-chat direct-chat-success">
              <div className="card-header">
                <h3 className="card-title">Direct Chat</h3>
                <div className="card-tools">
                  <span title="3 New Messages" className="badge bg-success">
                    3
                  </span>
                </div>
              </div>

              <div className="card-body">
                <div
                  className="direct-chat-messages"
                  style={{ height: "430px" }}
                >
                  {messages &&
                    messages.map((m) => (
                      <>
                        {m.sender == empresa._id ? (
                          <div className="direct-chat-msg">
                            <div className="direct-chat-infos clearfix ">
                              <span className="direct-chat-name float-left">
                                {m.empresaname}
                              </span>
                              <span className="direct-chat-timestamp float-left ml-3">
                                23 Jan 2:00 pm
                              </span>
                            </div>

                            <div className="direct-chat-text col-3">
                              Is this template really for free? That's
                              unbelievable!
                            </div>
                          </div>
                        ) : (
                          <div className="direct-chat-msg right">
                            <div className="direct-chat-infos clearfix">
                              <span className="direct-chat-name float-right">
                                G smart
                              </span>
                              <span className="direct-chat-timestamp float-left float-right mr-3">
                                {timeAgo.format(new Date(m.createdTime))}
                              </span>
                            </div>

                            <div className="direct-chat-text col-3 float-right">
                              {m.text != "none" && m.text}
                              {m.img != "none" && (
                                <img className="img-thumbnail" src={m.img} />
                              )}
                            </div>
                          </div>
                        )}
                      </>
                    ))}
                </div>

                <div className="direct-chat-contacts">
                  <ul className="contacts-list">
                    <li>
                      <a href="#">
                        <img
                          className="contacts-list-img"
                          src="../dist/img/user1-128x128.jpg"
                          alt="User Avatar"
                        />
                        <div className="contacts-list-info">
                          <span className="contacts-list-name">
                            Count Dracula
                            <small className="contacts-list-date float-right">
                              2/28/2015
                            </small>
                          </span>
                          <span className="contacts-list-msg">
                            How have you been? I was...
                          </span>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="float-right">
                  {img && (
                    <>
                      <a
                        href="#"
                        onClick={() => {
                          setimg(null);
                          setFile(null);
                        }}
                      >
                        {" "}
                        <i className="bi bi-x-circle text-danger" />
                      </a>
                      <img
                        src={img}
                        className="img-thumbnail float-right"
                        style={{ height: "80px", width: "100px" }}
                      />
                    </>
                  )}
                </div>
              </div>

              <div className="card-footer">
                <form>
                  <div className="input-group">
                    <input
                      type="text"
                      name="message"
                      value={Text}
                      placeholder="Type Message ..."
                      className="form-control"
                      fdprocessedid="uwlkf8"
                      onChange={(e) => {
                        setText(e.target.value);
                      }}
                    />
                    <span className="input-group-append">
                      {img || Text ? (
                        <a
                          href="#"
                          onClick={sendmessage}
                          className="btn btn-success"
                          fdprocessedid="96gcnq"
                        >
                          Send
                        </a>
                      ) : (
                        <a
                          className="btn btn-success disabled"
                          disabled
                          fdprocessedid="96gcnq"
                        >
                          Send
                        </a>
                      )}
                    </span>
                    <label htmlFor="file">
                      <input
                        type="file"
                        id="file"
                        accept=".png,.jpeg,.jpg"
                        onChange={(e) => setFile(e.target.files[0])}
                        style={{ display: "none" }}
                      />{" "}
                      <a className="btn btn-info btn-k" fdprocessedid="96gcnq">
                        <i className="bi bi-image"></i>
                      </a>{" "}
                    </label>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
