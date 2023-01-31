import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "bson";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }

  const cliente = await clientPromise;

  const data = req.body;
  const db = cliente.db("myFirstDatabase");

  if (data.mes) {
    var resul = await db
      .collection("balancete")
      .find({ id_empresa: data.id_empresa, ano: data.ano, mes: data.mes })
      .toArray();
  } else {
    var resul = await db
      .collection("balancete")
      .find({ id_empresa: data.id_empresa })
      .toArray();
  }

  res.json(resul);
}
