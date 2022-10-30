import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';



// import './SearchFilter.css'

function SearchFilter({ allData, setAllData }) {
  const [sportList, setSportList] = useState();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [category, setCategory] = useState([])

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  const handleFilterClick = () => {
    let temp = JSON.parse(localStorage.getItem("billData") || "[]")
    setSelectedCategory("all")
    setAllData([...temp])
  }

  useEffect(() => {
    let temp = [];
    allData.map((d) => {
      if (temp.includes(d.category)) {
        return;
      }
      else
        temp.push(d.category);
    })
    setCategory(temp);
    setSportList(allData);
  }, [allData]);

  useEffect(() => {
    if (selectedCategory==='all') {
      // let temp = JSON.parse(localStorage.getItem("billData") || "[]")
      // setAllData([...temp])
      allData.map((item) => item.isSelected = true);
      setAllData([...allData]);
    }
    else{
      // setAllData(allData.filter((item) => item.category === selectedCategory));
      allData.map((item) =>  {
        if (item.category != selectedCategory) item.isSelected = false;
        else item.isSelected = true;
      });
      console.log(allData);
      setAllData([...allData]);
    }

    // window.location.reload()

  }, [selectedCategory])

  return (
    <>
  
       <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Filter</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={selectedCategory}
    label="filter"
    onChange={handleCategoryChange}
   
  >
    <MenuItem value="all" onClick={handleFilterClick}> All</MenuItem>
            {
              category.map((d) => {
                return (
                  <MenuItem value={d}>{d}</MenuItem>

                )
              })
      }
  </Select>
</FormControl>
</Box>
    </>
  )
}

export default SearchFilter