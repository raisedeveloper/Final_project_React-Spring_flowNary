// @mui material components
import { Card, Icon, Checkbox, Typography, FormGroup, FormControlLabel, TextField, Button } from "@mui/material";
import Done from '@mui/icons-material/Done';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import TimelineItem from "examples/Timeline/TimelineItem";
import { useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { GetWithExpiry } from "api/LocalStorage";
import { useQuery } from "@tanstack/react-query";
import { getTodoList } from "api/axiosGet";

export default function TodoList() {
  const uid = GetWithExpiry("uid");

  const { data: dataList, isLoading, error } = useQuery({
    queryKey: ['todoList', uid],
    queryFn: () => getTodoList(uid),
  });
  const [newItemText, setNewItemText] = useState('');

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const addItem = () => {
    if (dataList.length < 7 && newItemText.trim() !== '') {
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
    <DashboardLayout>
      <DashboardNavbar />
      <Card sx={{ height: "90%", boxShadow: "none", backgroundColor: 'beige' }}>
        <MDBox pt={3} px={3}>
          <MDTypography variant="h6" fontWeight="medium">
            최대 7개 - 해야할 일!
          </MDTypography>
        </MDBox>
        <MDBox pt={3} px={3}>
          <FormGroup>
            {dataList && dataList.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <FormControlLabel
                  control={<Checkbox />}
                  label={item.contents}
                  onChange={() => console.log('Checkbox clicked:', item.text)}
                />
                <Button color="primary" onClick={() => removeItem(item.id)}>삭제</Button>
              </div>
            ))}
          </FormGroup>
          <br />
          <TextField
            placeholder="새로운 할 일 추가"
            value={newItemText}
            onChange={e => setNewItemText(e.target.value)}
          />
          <Button onClick={addItem}>추가</Button>

        </MDBox>
        <br />
      </Card>

    </DashboardLayout>
  );
}