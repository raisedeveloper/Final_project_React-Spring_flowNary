/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import { Card, Icon, Checkbox, Typography, FormGroup, FormControlLabel, TextField, Button } from "@mui/material";
import Done from '@mui/icons-material/Done';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import TimelineItem from "examples/Timeline/TimelineItem";
import { useState } from "react";

export default function TodoList() {
  const [items, setItems] = useState([
    { id: 1, text: '동사무소 다녀오기', required: false },
    { id: 2, text: '은행 적금 계약하기', required: true },
    { id: 3, text: '엄마한테 전화하기', required: true },
    { id: 4, text: '6/17 종강', required: false },
    { id: 5, text: '5/17 중간발표', required: true },
    { id: 6, text: '5/21 면접', required: true },
    { id: 7, text: '핸드폰 수리하기', required: true },
  ]);
  const [newItemText, setNewItemText] = useState('');

  const addItem = () => {
    if (items.length < 7 && newItemText.trim() !== '') {
      const newItem = {
        id: Date.now(),
        text: newItemText,
        required: true // Or false based on your logic
      };
      setItems(prevItems => [...prevItems, newItem]);
      setNewItemText('');
    }
  };

  const removeItem = id => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  return (
    <Card sx={{ height: "50%" }}>
      <MDBox pt={3} px={3}>
        <MDTypography variant="h6" fontWeight="medium">
          해야할 일!
        </MDTypography>
      </MDBox>
      <MDBox pt={3} px={3}>
        <FormGroup>
          {items.map(item => (
            <div key={item.id} style={{ display: 'flex', alignItems: 'center' }}>
              <FormControlLabel
                control={<Checkbox />}
                label={item.text}
                onChange={() => console.log('Checkbox clicked:', item.text)}
              />
              <Button variant="outlined" color="secondary" onClick={() => removeItem(item.id)}>삭제</Button>
            </div>
          ))}
        </FormGroup>
        <TextField
          label="Add new item"
          value={newItemText}
          onChange={e => setNewItemText(e.target.value)}
        />
        <Button onClick={addItem}>Add</Button>
      </MDBox>
    </Card>
  );
}



