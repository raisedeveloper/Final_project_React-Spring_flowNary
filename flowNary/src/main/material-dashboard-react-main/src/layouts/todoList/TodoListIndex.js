import { Card, Checkbox, Typography, FormGroup, FormControlLabel, TextField, Button, Stack, Grid } from "@mui/material";
import Done from '@mui/icons-material/Done';
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { useEffect, useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { GetWithExpiry } from "api/LocalStorage";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getTodoList } from "api/axiosGet";
import { wrong } from "api/alert";
import { updateTodoList } from "api/axiosPost";
import { updateTodo } from "api/axiosPost";
import { deleteTodo } from "api/axiosPost";
import { insertTodo } from "api/axiosPost";

export default function TodoList() {
  const uid = GetWithExpiry("uid");
  const queryClient = useQueryClient();

  const [nowList, setNowList] = useState([]);
  const [update, setUpdate] = useState(0);

  const { data: dataList, isLoading, error } = useQuery({
    queryKey: ['todoList', uid],
    queryFn: () => getTodoList(uid),
  });

  const [newItemText, setNewItemText] = useState('');

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const addItem = async () => {
    if (newItemText === null || newItemText === '') {
      return;
    }
    const newItem = {
      uid: uid,
      contents: newItemText,
    };
    console.log("왜안뜸?" + newItem.uid);
    await insertTodo(newItem);
    queryClient.invalidateQueries(['todoList', uid]);
    setNewItemText('');
  };

  const handleText = e => {
    setNewItemText(e.target.value);
    console.log(e.target.value);
  }

  const removeItem = async (tid) => {
    try {
      await deleteTodo(tid);
      queryClient.invalidateQueries(['todoList', uid]);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };
  const [updateStates, setUpdateStates] = useState(dataList.map(() => false));
  const [updateText, setUpdateText] = useState('')
  const updateItem = (idx) => {
    setUpdateStates(updateStates.map((state, index) => index === idx ? true : state));
  }

  const handleUpdateConfirm = (idx) => {
    setUpdateStates(updateStates.map((state, index) => index === idx ? false : state));
  }

  const handleUpdateText = (idx, e) => {
    setUpdateText(e.target.value);
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card sx={{ height: "90%", boxShadow: "none", backgroundColor: 'beige', mb: '3rem', p: '1rem' }}>
        <MDBox px={3}>
          <MDTypography variant="h6" fontWeight="medium">
            해야할 일!!
          </MDTypography>
        </MDBox>
        <MDBox pt={3} px={3}>
          <FormGroup>
            {dataList && dataList.map((item, idx) => (
              <Grid key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: '5rem' }}>
                {!updateStates[idx] ? (
                  <FormControlLabel
                    control={<Checkbox />}
                    label={item.contents}
                    onChange={() => console.log('Checkbox clicked:', item.contents)}
                  />
                ) : (
                  <>
                    <TextField value={updateText} onChange={(e) => handleUpdateText(idx, e)} />
                    <Button onClick={() => handleUpdateConfirm(idx)}> 확인 </Button>
                  </>
                )}
                <Button color="primary" onClick={() => updateItem(idx)}>수정</Button>
                <Button color="primary" onClick={() => removeItem(item.tid)}>삭제</Button>
              </Grid>
            ))}
          </FormGroup>
        </MDBox>
      </Card>

      <TextField
        placeholder="새로운 할 일 추가"
        value={newItemText}
        onChange={handleText}
      />
      <Button onClick={addItem}>추가</Button>
    </DashboardLayout>
  );
}
