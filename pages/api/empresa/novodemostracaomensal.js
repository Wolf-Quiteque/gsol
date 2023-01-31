import clientPromise from "../../../lib/mongodb";

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }

  const data = req.body;

  const client = await clientPromise;
  const db = client.db("myFirstDatabase");
  try {
    const result = await db.collection("demostracao").insertOne(data);
    res.status(200).json({ message: "success" });
  } catch (er) {
    res.status(422).json({ message: "Empresa Criado" });
  }
}

export default handler;
