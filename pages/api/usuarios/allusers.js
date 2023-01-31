import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }

  const cliente = await clientPromise;

  const data = req.body;
  const { page, info } = data;

  var perPage = 6;

  const db = cliente.db("myFirstDatabase");
  // total number of records from database
  var total = await db.collection("usuarios").count();

  // Calculating number of pagination links required
  var pages = Math.ceil(total / perPage);

  // get current page number
  var pageNumber = page == null ? 1 : page;

  // get records to skip
  var startFrom = (pageNumber - 1) * perPage;

  // get data from mongo DB using pagination
  var resul = await db
    .collection("usuarios")
    .find(info)
    .sort({ id: -1 })
    .skip(startFrom)
    .limit(perPage)
    .toArray();

  res.json({ pages: pages, usuarios: resul });
}
