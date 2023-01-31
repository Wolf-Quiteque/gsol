import { ObjectId } from "bson";
import clientPromise from "../../../lib/mongodb";
export default async function handler(req, res) {
  const data = req.body;
  const cliente = await clientPromise;
  const db = cliente.db("myFirstDatabase");

  //pegar Investimento mensal unico
  const Investimento_mensal_unico = await db
    .collection("balanceteMes")
    .findOne(data);

  const valor_Investimento_mensal_unico = Number(
    Investimento_mensal_unico["11_debito"] +
      Investimento_mensal_unico["14_debito"] +
      Investimento_mensal_unico["18_debito"]
  );

  //---------------------------------------------------------------------------

  //pegar financiamento mensal unico
  // const financiamento_mensal_unico = await db
  //   .collection("balanceteMes")
  //   .findOne(data);

  // const valor_financiamento_mensal_unico = Number(
  //   financiamento_mensal_unico["11_debito"] +
  //     financiamento_mensal_unico["14_debito"] +
  //     financiamento_mensal_unico["18_debito"]
  // );

  //---------------------------------------------------------------------------

  res.json({ mensal_unico: valor_Investimento_mensal_unico });
}
