import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Grid, Button } from "@mui/material";
import ColorsTable from "./colors/ColorsTable";
import SignOut from "./auth/SignOut";
import AddOrEdit from "./modals/AddOrEdit";
import { AddBox } from "@mui/icons-material";
import DeleteModal from "./modals/DeleteModal";
import ColorTypes from "../types/types";

function Dashboard() {
  const [data, setData] = useState([]);
  const [reloadTable, setReloadTable] = useState<boolean>(false);
  const [color, setColor] = useState<ColorTypes | null>(null);
  const [openAddOrEditModal, setOpenAddOrEditModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, [reloadTable]);

  const fetchData = async () => {
    try {
      const response = await axios.get("api/colors");
      setData(response.data?.colors);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <Container component="main" maxWidth="lg">
      <Grid display="flex" justifyContent="space-between" alignItems="center">
        <Grid>
          <h1>Welcome to test example</h1>
        </Grid>
        <Grid>
          <SignOut />
        </Grid>
      </Grid>
      <Button
        sx={{ marginBottom: "20px", display: "flex", gap: "5px" }}
        variant="outlined"
        onClick={() => {
          setOpenAddOrEditModal(true);
          setColor(null);
        }}
      >
        <AddBox /> Add Color
      </Button>
      <AddOrEdit
        color={color}
        setColor={setColor}
        openAddOrEditModal={openAddOrEditModal}
        setOpenAddOrEditModal={setOpenAddOrEditModal}
        setReloadTable={setReloadTable}
        reloadTable={reloadTable}
      />
      <DeleteModal
        color={color}
        setColor={setColor}
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
        setReloadTable={setReloadTable}
        reloadTable={reloadTable}
      />
      <ColorsTable
        data={data}
        setColor={setColor}
        setOpenAddOrEditModal={setOpenAddOrEditModal}
        setOpenDeleteModal={setOpenDeleteModal}
      />
    </Container>
  );
}

export default Dashboard;
