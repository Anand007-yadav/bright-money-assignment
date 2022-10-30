import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';

function uniqueId() {
  const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let token = '';
  for (let i = 0; i < 7; i++) {
    token += characters[Math.floor(Math.random() * characters.length)];
  }
  return token
}

export default function InputDetail({ allData, setAllData }) {
  const [open, setOpen] = useState(false);
  const [desc, setDesc] = useState('')
  const [category, setCategory] = useState('')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState('')

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSubmit = async () => {
    const data = {
      description: desc,
      category,
      amount,
      date,
      id: uniqueId(),
      isPaid:false,
      isSelected : true
    }

    let dummy = [...allData, data]

    localStorage.setItem("billData",JSON.stringify(dummy))

    await setAllData([...allData, data])
    handleClose()
  }

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Bills
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        // sx={{padding:'70px'}}
        maxWidth="xs"
        fullWidth="true"
      >
        <TextField style={{margin:"10px"}} onChange={e => setDesc(e.target.value)} id="outlined-basic" label="Description" variant="outlined" placeholder="Description" />
        <TextField style={{margin:"10px"}}onChange={e => setCategory(e.target.value)} id="outlined-basic" label="Category" variant="outlined" placeholder="Category" />
        <TextField style={{margin:"10px"}}onChange={e => setAmount(e.target.value)} id="outlined-basic" type="number" label="Amount" variant="outlined" placeholder="Amount" />
        <TextField style={{margin:"10px"}}onChange={e => setDate(e.target.value)} id="outlined-basic" type="date" variant="outlined" placeholder="Date" />
        <Button style={{margin:"10px"}} onClick={handleSubmit} variant="contained">Submit</Button>

      </Dialog>

    </>
  );
}
