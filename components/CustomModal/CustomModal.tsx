import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

interface CustomModalProps {
  readonly open: boolean;
  readonly onClose: () => void;
  readonly modalContent:React.ReactNode
}

export default function CustomModal({ open, onClose,modalContent}: CustomModalProps) {
  const handleClose = () => onClose();

  return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
            {modalContent}
        </Box>
      </Modal>
  );
}