"use client";
import Box from "@mui/material/Box";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Popper from "@mui/material/Popper";

interface CustomPopperProps {
    anchorElForPopper: HTMLElement | null;
    popperContent: React.ReactNode | null;
    popperPlacement: "top" | "bottom" | "left" | "right";
    popupKey: string | null;
    onClose: () => void;
}

const CustomPopper = ({
    anchorElForPopper,
    popperContent,
    popperPlacement,
    popupKey,
    onClose,
}: CustomPopperProps) => {
    const open = Boolean(anchorElForPopper);

    const id = open ? "simple-popper" : undefined;

    return (
        <Popper
            id={id}
            open={open}
            anchorEl={anchorElForPopper}
            placement={popperPlacement}
            sx={{ zIndex: 1202 }}
        >
            <ClickAwayListener onClickAway={onClose}>
                <Box
                    sx={{
                        bgcolor: "background.paper",
                        borderRadius: "8px",
                        boxShadow: 3,
                    }}
                >
                    {popperContent}
                </Box>
            </ClickAwayListener>
        </Popper>
    );
};

export default CustomPopper;