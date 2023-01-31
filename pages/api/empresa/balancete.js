import clientPromise from "../../../lib/mongodb";
export default async function handler(req, res) {
  const cliente = await clientPromise;
  const data = req.body;
  const db = cliente.db("myFirstDatabase");
  const resul = await db.collection("balancete").find(data).toArray();

  console.log(resul);

  res.json(resul);
}
