import React, { useEffect, useState } from 'react'
import InputDetail from './InputDetail';
import DataTable from './DataTable';
import './App.css';
import Chart from './Chart'
import SearchFilter from './SearchFilter';
import AmountPaid from './AmountPaid';



function App() {
  const [allData, setAllData] = useState([])
  let [monthlyBudget, setMonthlybudget]=useState(1000);
  useEffect(()=> {
    let temp = JSON.parse(localStorage.getItem("billData") || "[]")
    temp.map((data)=>{
      data.isPaid=false;
      data.isSelected = true;
    })
    localStorage.setItem("billData",JSON.stringify(temp))

    // console.log("App",temp)
    setAllData([...temp])
  },[])

 
  
  return (

    <div className="App">
       <div className='heading'>Bills Dashboard</div>
       <hr/>
       <div className='flexContainer'>
      <InputDetail allData={allData} setAllData={setAllData} />
      <AmountPaid  allData={allData}  setAllData={setAllData} monthlyBudget={monthlyBudget} setMonthlybudget={setMonthlybudget} />
      <SearchFilter allData={allData}  setAllData={setAllData} />
      </div>
      <DataTable allData={allData} setAllData={setAllData} monthlyBudget={monthlyBudget} setMonthlybudget={setMonthlybudget}/>
      <Chart allData={allData} />
      
    </div>
  );
}

export default App;
