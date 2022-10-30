import React from 'react'
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { useState } from 'react';

function AmountPaid( {allData,setAllData,monthlyBudget,setMonthlybudget}) {
   

    function sortData(){
       
        allData.sort((a,b) =>  b.amount -a.amount);

        allData.map((data)=>{
            if(data.amount<=monthlyBudget){
                data.isPaid = true;
            }
        })
       setAllData([...allData]);
        console.log(allData);
    }
   
  return (
<>

    <Button onClick={sortData} variant="outlined">Show Payble Bills</Button>
    <Stack direction="row" spacing={1}>
      
      <Chip label={`Monthly Budget: ${monthlyBudget}`} variant="outlined" />
    </Stack>
    </>
  )
}

export default AmountPaid