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
      <Bar dataKey="Lucro_Por_Ação" fill="#9C27B0" />
      <Bar dataKey="Lucro_Por_Ação_Acumulada" fill="#827717" />
    </BarChart>
  );
}
