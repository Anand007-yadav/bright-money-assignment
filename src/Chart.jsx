import React, {useEffect, useState} from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import './Chart.css'

const convertDateFormat = (date) => {
    let temp = date.split("-")
    let newDate = temp[2]+"-"+temp[1]+"-"+temp[0]
    return newDate
}

export default function Chart({allData}) {
  const [chartData, setChartData] = useState([])

  useEffect(()=> {
    let tempData = []
    let mapData = []
    let maxAmount = 0
    allData.map((d) => {
      tempData.push({date: convertDateFormat(d.date), amount: d.amount})

      maxAmount = Math.max(maxAmount,d.amount)
    })
    tempData.sort(function(a, b){
      var aa = a.date.split('-').reverse().join(),
          bb = b.date.split('-').reverse().join();
      return aa < bb ? -1 : (aa > bb ? 1 : 0);
    });
    tempData.map((e, idx) => {
      mapData.push({name: e.date, amt: e.amount, uv: e.amount, pv: maxAmount})
    })

    setChartData([...mapData])
  },[allData])

  return (
    <>
    <div className="container">Time Series Chart</div>
    <div className="centering">
    <LineChart
      width={700}
      height={300}
      data={chartData}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="pv"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
      <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
    </LineChart>
    </div>
    </>
  );
}