import { useState, Fragment, useEffect, FormEvent } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Grid, Typography } from "@mui/material";
import axios from "axios";
import ColorTypes from "../../types/types";

interface Props {
  setReloadTable: React.Dispatch<React.SetStateAction<boolean>>;
  reloadTable: boolean;
  color: ColorTypes | null;
  setColor: React.Dispatch<React.SetStateAction<ColorTypes | null>>;
  openAddOrEditModal: boolean;
  setOpenAddOrEditModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddOrEdit({
  setReloadTable,
  reloadTable,
  color,
  openAddOrEditModal,
  setOpenAddOrEditModal,
}: Props) {
  const [name, setName] = useState<string>("");
  const [hex, setHex] = useState<string>("");
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleClose = () => {
    setOpenAddOrEditModal(false);
  };

  const handleAddColor = async (formData: FormData) => {
    await axios.post(`api/colors`, {
      name: formData.get("name"),
      hex: formData.get("hex"),
    });

    setReloadTable(!reloadTable);
  };

  const handleEditColor = async (formData: FormData, id: string) => {
    await axios.put(`api/colors/${id}`, {
      name: formData.get("name"),
      hex: formData.get("hex"),
    });

    setReloadTable(!reloadTable);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      await (isEdit
        ? handleEditColor(formData, color!.id)
        : handleAddColor(formData));
      setErrorMessage("");
      handleClose();
    } catch (error: any) {
      setErrorMessage(error?.message);
    }
  };

  useEffect(() => {
    let name = "";
    let hex = "";
    let isEdit = false;

    if (color) {
      name = color.name;
      hex = color.hex;
      isEdit = true;
    }

    setName(name);
    setHex(hex);
    setIsEdit(isEdit);
  }, [color]);

  return (
    <Fragment>
      <Dialog open={openAddOrEditModal} onClose={handleClose}>
        <Box component="form" onSubmit={handleSubmit}>
          <DialogTitle>Add new Color</DialogTitle>
          <DialogContent>
            <DialogContentText marginBottom="20px">
              To add new color simply fill required fields and click on Submit.
            </DialogContentText>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="name"
                  label="Name"
                  required
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="hex"
                  label="Hex"
                  required
                  fullWidth
                  value={hex}
                  onChange={(e) => setHex(e.target.value)}
                />
              </Grid>
              <Typography color="red">{errorMessage}</Typography>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Fragment>
  );
}
