import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function App({ data }) {
  return (
    <BarChart
      width={510}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 0,
        left: 40,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip formatter={(data) => new Intl.NumberFormat("pt").format(data)} />
      <Legend />
      <Bar dataKey="Rend_Dos_CP" fill="#9C27B0" />
      <Bar dataKey="Rend_Activos" fill="#827717" />
      <Bar dataKey="Rend_Vendas" fill="#D32F2F" />
    </BarChart>
  );
}
