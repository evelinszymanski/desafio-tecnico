import { Dialog as MDialog, DialogActions, DialogTitle, DialogContent, DialogContentText } from "@mui/material";
import Button from "./Button";

const Dialog = ({open, setOpen, title, content, confirmText, confirmFunction}) => {
    const handleClose = () => {
        setOpen(false);
    };

    const confirmAction = () => {
        confirmFunction && confirmFunction();
        setOpen(false);
    };

    return (
        <MDialog open={open} onClose={handleClose}>
            <DialogTitle id="alert-dialog-title">
                { title }
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                   { content }
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color="light" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button color="error" onClick={confirmAction} autoFocus>
                    { confirmText }
                </Button>
            </DialogActions>
        </MDialog>
    )
};

export default Dialog;