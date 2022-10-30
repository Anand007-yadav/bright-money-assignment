import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import EditInput from "./EditInput";
import DeleteIcon from '@mui/icons-material/Delete';
import "./DataTable.css";
import EditIcon from '@mui/icons-material/Edit';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
export default function DataTable({ allData, setAllData , monthlyBudget,setMonthlybudget}) {

  const [editData, setEditData] = useState({});
  const [open, setOpen] = useState(false);
  const [currId, setCurrId] = useState(null);
  const [deletable,setDeletable]=useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = (id) => {
    allData.map((e) => {
      if (e.id === id) {
        setEditData(e);
      }
    });
    setCurrId(id);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    let temp=[];
    allData.map((data)=>{
      if(data.id !== id || data.amount>monthlyBudget){
        temp.push(data);
        if( data.id===id  && data.amount>monthlyBudget){
          setDeletable(true);
        }
      }
      else{
       
        monthlyBudget-=data.amount;
      }
    })
    
    setMonthlybudget(monthlyBudget);

    // let dummy = allData.filter((item) => item.id !== id &&item.amount<=monthlyBudget)
    localStorage.setItem("billData",JSON.stringify(temp))

    await setAllData([...temp]);
    
  };

  return (
    <>
    {deletable && (  <Stack sx={{ width: '100%', marginBottom: '10px' }} spacing={2}>
      <Alert onClose={() => {setDeletable(false)}} severity="error">Your Monthly Budget is insufficient to pay this bill amount !</Alert>
    </Stack>)}
    
      <TableContainer component={Paper} className="marginDown">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className="thead2">
            <TableRow>
              <TableCell className="thead">Id</TableCell>
              <TableCell className="thead" align="center">Description</TableCell>
              <TableCell className="thead" align="center">Category</TableCell>
              <TableCell className="thead" align="center">Amount</TableCell>
              <TableCell className="thead" align="center">Date</TableCell>
              <TableCell className="thead" align="center">Edit</TableCell>
              <TableCell className="thead" align="center">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allData.map((row) => {
              
              if(row.isPaid && row.isSelected){

              return(       
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } ,
                backgroundColor: "yellow"
              }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell   align="center">{row.description}</TableCell>
                <TableCell align="center">{row.category}</TableCell>
                <TableCell align="center">{row.amount}</TableCell>
                <TableCell align="center">{row.date}</TableCell>
                <TableCell align="center">
                <Button onClick={() => handleEdit(row.id)} variant="outlined" >
                <EditIcon/>
                </Button >
                </TableCell>
                <TableCell align="center">
                <Button
                  onClick={() => handleDelete(row.id)}
                  variant="outlined"
                >
                  <DeleteIcon/>
                </Button>
                </TableCell>
              </TableRow>
            )}
            else if(row.isSelected) {
              return(       
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } ,
                }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell   align="center">{row.description}</TableCell>
                  <TableCell align="center">{row.category}</TableCell>
                  <TableCell align="center">{row.amount}</TableCell>
                  <TableCell align="center">{row.date}</TableCell>
                  <TableCell align="center">
                  <Button onClick={() => handleEdit(row.id)} variant="outlined" >
                  <EditIcon/>
                  </Button >
                  </TableCell>
                  <TableCell align="center">
                  <Button
                    onClick={() => handleDelete(row.id)}
                    variant="outlined"
                  >
                    <DeleteIcon/>
                  </Button>
                  </TableCell>
                </TableRow>
              )
            }})}

          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
         maxWidth="xs"
        fullWidth="true"
      >
        <EditInput
          allData={allData}
          setAllData={setAllData}
          id={currId}
          handleClose={handleClose}
          editData={editData}
        />
      </Dialog>
    </>
  );
}
