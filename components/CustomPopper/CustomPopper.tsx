'use client';

import Box from '@mui/material/Box';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Popper from '@mui/material/Popper';
import { useCustomHook } from '@/app/utils/hook';

const CustomPopper = () => {
  const { anchorElForPopper, setAnchorElForPopper } = useCustomHook();

  const open = Boolean(anchorElForPopper);
  const id = open ? 'simple-popper' : undefined;

  return (
      <Popper id={id} open={open} anchorEl={anchorElForPopper} sx={{ zIndex: 1202 }}>
        <ClickAwayListener onClickAway={() => setAnchorElForPopper(null)}>
          <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
            The content of the Popper.
          </Box>
        </ClickAwayListener>
      </Popper>
  );
};

export default CustomPopper;