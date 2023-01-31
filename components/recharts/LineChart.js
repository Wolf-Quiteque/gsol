import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function App({ data }) {
  return (
    <LineChart
      width={530}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 10,
        left: 30,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" padding={{ left: 10, right: 0 }} />
      <YAxis />
      <Tooltip formatter={(data) => new Intl.NumberFormat("pt").format(data)} />
      <Legend />
      <Line
        type="monotone"
        dataKey="Valor_Do_Capital"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
      <Line type="monotone" dataKey="Valor_Da_Firma" stroke="#82ca9d" />
    </LineChart>
  );
}
