import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useEffect } from 'react';

function uniqueId() {
  const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let token = '';
  for (let i = 0; i < 7; i++) {
    token += characters[Math.floor(Math.random() * characters.length)];
  }
  return token
}

export default function InputDetail({ allData, setAllData, id, handleClose, editData }) {
  const [desc, setDesc] = useState(null)
  const [category, setCategory] = useState(null)
  const [amount, setAmount] = useState(null)
  const [date, setDate] = useState(null)

  useEffect(()=>{
    setDesc(editData.description)
    setCategory(editData.category)
    setAmount(editData.amount)
    setDate(editData.date)
  },[])

  const handleSubmit = async () => {

    allData.map((e) => {
        if(e.id === id){
            e.description = desc;
            e.category = category;
            e.amount = amount;
            e.date = date;
        }
    })
    let dummy = [...allData]
    localStorage.setItem("billData",JSON.stringify(dummy))
    await setAllData([...allData])

    handleClose()
  }

  return (
    <>
        <TextField style={{margin:"10px"}} onChange={e => setDesc(e.target.value)} defaultValue={editData.description} id="outlined-basic" label="Description" variant="outlined" placeholder="Description" />
        <TextField style={{margin:"10px"}}  onChange={e => setCategory(e.target.value)} defaultValue={editData.category} id="outlined-basic" label="Category" variant="outlined" placeholder="Category" />
        <TextField style={{margin:"10px"}} onChange={e => setAmount(e.target.value)} defaultValue={editData.amount} id="outlined-basic" label="Amount" variant="outlined" placeholder="Amount" type="number" />
        <TextField style={{margin:"10px"}}  onChange={e => setDate(e.target.value)} defaultValue={editData.date} id="outlined-basic" label="Date" variant="outlined" placeholder="Date" type="date" />
        <Button   style={{margin:"10px"}} onClick={handleSubmit} variant="contained">Submit</Button>
    </>
  );
}
