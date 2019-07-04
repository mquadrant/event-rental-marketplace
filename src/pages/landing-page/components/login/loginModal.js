import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Paper } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import LoginForm from "./loginForm";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    // backgroundColor: theme.palette.background.paper,
    // boxShadow: theme.shadows[5],
    // padding: theme.spacing(4),
    outline: "none"
  }
}));

export default function LoginModal(props) {
  const [open, setOpen] = React.useState(false);
  const { handleSignOpen, handleSignClose } = props;
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  useEffect(() => {
    if (handleSignOpen) {
      setOpen(true);
    }
    return () => {};
  }, [handleSignOpen]);

  const handleClose = () => {
    setOpen(false);
    handleSignClose();
  };
  const classes = useStyles();

  return (
    <div>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <LoginForm />
        </div>
      </Modal>
    </div>
  );
}
