import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }

  const data = req.body;
  const { email } = data;

  const cliente = await clientPromise;
  const db = cliente.db("myFirstDatabase");
  const resul = await db.collection("usuarios").findOne({ email: email });
  res.json(resul);
}
