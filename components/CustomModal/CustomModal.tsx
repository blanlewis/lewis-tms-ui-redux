import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface CustomModalProps {
  readonly open: boolean;
  readonly onClose: () => void;
  readonly modalContent:React.ReactNode
}

const CustomModal = ({ open, onClose, modalContent }: CustomModalProps) => {
  const handleClose = () => onClose();

  return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{outline:"none"}}
      >
        <Box sx={style}>
            {modalContent}
        </Box>
      </Modal>
  );
};

export default CustomModal;