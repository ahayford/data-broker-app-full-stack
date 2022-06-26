import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>,
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({
  currBroker,
  showModal,
  onClickingTheCloseAlertDialogSlide,
}) {
  return (
    <div>
      <Dialog
        open={showModal}
        TransitionComponent={Transition}
        keepMounted
        onClose={onClickingTheCloseAlertDialogSlide}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{currBroker.companyname}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {currBroker.companyname}
          </DialogContentText>
          <DialogContentText id="alert-dialog-slide-description">
            {currBroker.optoutinstructions}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClickingTheCloseAlertDialogSlide}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
