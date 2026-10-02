'use client';

import Box from '@mui/material/Box';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Popper from '@mui/material/Popper';
import { useCustomHook } from '@/app/utils/customHook/hook';

const CustomPopper = () => {
  const { popper, setPopper } = useCustomHook();

  const open = Boolean(popper.anchorElForPopper);
  const id = open ? 'simple-popper' : undefined;

  return (
    <Popper
      id={id}
      open={open}
      anchorEl={popper.anchorElForPopper}
      placement={popper.popperPlacement}
      sx={{ zIndex: 1202 }}
    >
      <ClickAwayListener
        onClickAway={() => setPopper(null, null, "bottom")}
      >
        <Box
          sx={{
            bgcolor: 'background.paper',
            borderRadius: '8px',
            boxShadow: 3,
          }}
        >
          {popper.popperContent}
        </Box>
      </ClickAwayListener>
    </Popper>
  );
};

export default CustomPopper;