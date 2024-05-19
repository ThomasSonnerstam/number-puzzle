import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

const WinModal = ({ hasUserWon, hasCheated }) => {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (hasUserWon) setOpen(true);
  }, [hasUserWon]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {hasCheated
              ? "Cheater cheater, pumpkin eater!"
              : "Congratulations, you have won!"}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {hasCheated
              ? "I warned you not to cheat, next time do better!"
              : "You win nothing I'm afraid. Only honor and everlasting glory."}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default WinModal;
