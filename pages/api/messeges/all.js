import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "bson";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }

  const data = req.body;
  const { reciver } = data;

  const cliente = await clientPromise;
  const db = cliente.db("myFirstDatabase");
  const resul = await db.collection("mensagem").find({ id: reciver }).toArray();

  console.log(resul);
  res.json(resul);
}
