import { useState, Fragment, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/material";
import axios from "axios";

export default function DeleteModal({
  color,
  openDeleteModal,
  setOpenDeleteModal,
  reloadTable,
  setReloadTable,
}: any) {
  const [colorId, setColorId] = useState(0);

  const handleClose = () => {
    setOpenDeleteModal(false);
  };

  const handleDeleteColor = async (id: any) => {
    await axios.delete(`api/colors/${id}`);

    setReloadTable(!reloadTable);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    await handleDeleteColor(colorId);
    handleClose();
    return;
  };

  useEffect(() => {
    if (color?.id) {
      setColorId(color.id);
    }
  }, [color]);

  return (
    <Fragment>
      <Dialog open={openDeleteModal} onClose={handleClose}>
        <Box component="form" onSubmit={handleSubmit}>
          <DialogTitle>Add new Color</DialogTitle>
          <DialogContent>
            <DialogContentText marginBottom="20px">
              Are you sure you want delete this item?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              type="submit"
              sx={{ backgroundColor: "red" }}
              variant="contained"
            >
              DELETE
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Fragment>
  );
}
