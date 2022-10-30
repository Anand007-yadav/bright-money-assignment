import React from 'react';
// import LineChart from 'react-linechart';
// import '../node_modules/react-linechart/dist/styles.css';
// import ReactApexChart from 'apexcharts'
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

const convertDateFormat = (date) => {
    let temp = date.split("-")
    let newDate = temp[1]+"-"+temp[0]+"-"+temp[2]
    return newDate
}

const jsondata = {
    "bills": [
    {
    "id": 1,
    "description": "Dominoes",
    "category": "FoodNDining",
    "amount": "430",
    "date": "01-02-2020"
    },
    {
    "id": 2,
    "description": "Car wash",
    "category": "utility",
    "amount": "500",
    "date": "01-06-2020"
    },
    {
    "id": 3,
    "description": "Amazon",
    "category": "shopping",
    "amount": "2030",
    "date": "01-07-2020"
    },
    {
    "id": 4,
    "description": "House rent",
    "category": "Food & Dining",
    "amount": "35900",
    "date": "01-03-2020"
    },
    {
    "id": 5,
    "description": "Tuition",
    "category": "education",
    "amount": "2200",
    "date": "01-12-2020"
    },
    {
    "id": 6,
    "description": "Laundry",
    "category": "Personal Care",
    "amount": "320",
    "date": "02-14-2020"
    },
    {
    "id": 7,
    "description": "Vacation",
    "category": "Travel",
    "amount": "3430",
    "date": "01-18-2020"
    }
    ]
   }

let data = [
    {									
        color: "steelblue", 
        points: [{x: 1, y: 2}, {x: 100, y: 5}, {x: 250, y: 13}] 
    }
];

let tempData = []
let mapData = []

jsondata.bills.map((e)=>{
    tempData.push({date: convertDateFormat(e.date), amount: e.amount})
})

tempData.sort(function(a, b){
    var aa = a.date.split('-').reverse().join(),
        bb = b.date.split('-').reverse().join();
    return aa < bb ? -1 : (aa > bb ? 1 : 0);
});

// tempData.map((e) => {
//     mapData.push({x: convertDateFormat(e.date), y: e.amount})
// })

tempData.map((e, idx) => {
    mapData.push({x: idx+1, y: e.amount})
})
data[0].points = mapData;

console.log(mapData)


export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };
  
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  

export const myData = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: [1,2,3,4,5,6,7],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
  


export default function TimeSeriesChart() {
        return (
            <div>
                <div className="App">
                    <h1>My First LineChart</h1>
                    <Line options={options} data={data} />

                </div>				
            </div>
        );
    };