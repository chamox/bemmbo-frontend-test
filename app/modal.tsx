import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface modalProps {
  isOpen: boolean;
}

export default function Modal({ isOpen }: modalProps) {
  const [open, setOpen] = React.useState(isOpen);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <CheckCircleIcon
            sx={{ fontSize: 60, padding: 2, border: 0 }}
            color="success"
          />
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Nota de crédito asignada correctamente
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ backgroundColor: "purple" }}
            variant="contained"
            onClick={handleClose}
          >
            Seguir Asignando
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
