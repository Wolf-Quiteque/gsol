import { hashPassword } from "../../../lib/auth";
import makeid from "../../../lib/random";
import clientPromise from "../../../lib/mongodb";
const nodemailer = require("nodemailer");

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }

  const data = req.body;

  const { email, idempresa, nome, passwored } = data;

  const client = await clientPromise;

  const db = client.db("myFirstDatabase");

  const existingUser = await db
    .collection("clientes")
    .findOne({ email: email });

  if (existingUser) {
    res.status(422).json({ message: "usuarioexiste" });
    return;
  }

  const userpassword = makeid();
  const hashedPassword = await hashPassword(passwored);

  await db.collection("clientes").insertOne({
    email: email,
    password: hashedPassword,
    idempresa: idempresa,
    nome: nome,
  });

  res.status(200).json({
    message: "Um convite de adessão foi enviado! para o " + nome,
  });
}

export default handler;
