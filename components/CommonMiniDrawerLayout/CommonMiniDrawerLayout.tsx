"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";

import {
  Box,
  Drawer as MuiDrawer,
  AppBar as MuiAppBar,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";

import type { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import type { ListItemButtonProps } from "@mui/material/ListItemButton";

import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  MoveToInbox as InboxIcon,
  Mail as MailIcon,
} from "@mui/icons-material";

import CustomAvatar from "@/components/CustomAvatar";
import { useCustomHook } from "@/app/utils/hook";
import ProfilePopup from "./ProfilePopup";

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

const DRAWER_WIDTH = 240;
const DRAWER_COLLAPSED_WIDTH = 65;
const TOOLBAR_HEIGHT = 48;

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface NavItem {
  label?: string;
  route?: string;
  customNode?: React.ReactNode;
  onClick?: ListItemButtonProps["onClick"];
}

// ─────────────────────────────────────────────────────────────────────────────
// Drawer styles
// ─────────────────────────────────────────────────────────────────────────────

const openedMixin = (theme: Theme): CSSObject => ({
  width: DRAWER_WIDTH,

  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),

  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),

  overflowX: "hidden",

  width: `calc(${theme.spacing(7)} + 1px)`,

  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

// ─────────────────────────────────────────────────────────────────────────────
// Drawer Header
// ─────────────────────────────────────────────────────────────────────────────

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",

  padding: theme.spacing(0, 1),

  ...theme.mixins.toolbar,

  "@media (min-width: 600px)": {
    minHeight: `${TOOLBAR_HEIGHT}px`,
  },
}));

// ─────────────────────────────────────────────────────────────────────────────
// AppBar
// ─────────────────────────────────────────────────────────────────────────────

interface StyledAppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const StyledAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<StyledAppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,

  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),

  variants: [
    {
      props: ({ open }) => open,

      style: {
        marginLeft: DRAWER_WIDTH,

        width: `calc(100% - ${DRAWER_WIDTH}px)`,

        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

// ─────────────────────────────────────────────────────────────────────────────
// Drawer
// ─────────────────────────────────────────────────────────────────────────────

const StyledDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: DRAWER_WIDTH,

  flexShrink: 0,

  whiteSpace: "nowrap",

  boxSizing: "border-box",

  variants: [
    {
      props: ({ open }) => open,

      style: {
        ...openedMixin(theme),

        "& .MuiDrawer-paper": {
          ...openedMixin(theme),
        },
      },
    },

    {
      props: ({ open }) => !open,

      style: {
        ...closedMixin(theme),

        "& .MuiDrawer-paper": {
          ...closedMixin(theme),
        },
      },
    },
  ],
}));

// ─────────────────────────────────────────────────────────────────────────────
// NavList
// ─────────────────────────────────────────────────────────────────────────────

interface NavListProps {
  items: NavItem[];
  open: boolean;
}

const NavList = ({ items, open }: NavListProps) => {
  const pathname = usePathname();

  const [activePopupItem, setActivePopupItem] = React.useState<string | null>(
    null
  );

  return (
    <List sx={{ p: 0 }}>
      {items.map((item, index) => {
        const isActivePage = item.route === pathname;

        const isActivePopup =
          !item.route &&
          activePopupItem === item.label;

        const isActive = isActivePage || isActivePopup;

        return (
          <ListItem
            key={
              item.label ??
              `custom-item-${item.route ?? String(index)}`
            }
            disablePadding
            sx={{
              display: "block",
            }}
          >
            <ListItemButton
              {...(item.route
                ? {
                    component: Link,
                    href: item.route,
                  }
                : {})}
              onClick={(event) => {
                if (!item.route) {
                  setActivePopupItem(item.label ?? null);
                }

                item.onClick?.(event);
              }}
              sx={[
                {
                  minHeight: 48,
                  px: 2.5,

                  color: isActive ? "#2970FF" : "inherit",

                  "& .MuiListItemIcon-root": {
                    color: isActive ? "#2970FF" : "inherit",
                  },
                },

                open
                  ? {
                      justifyContent: "initial",
                    }
                  : {
                      justifyContent: "center",
                    },
              ]}
            >
              <ListItemIcon
                sx={[
                  {
                    minWidth: 0,
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                    color: isActive ? "#2970FF" : "inherit",
                  },

                  open
                    ? {
                        mr: 3,
                      }
                    : {
                        mr: "auto",
                        ml: "auto",
                      },
                ]}
              >
                {item.customNode ? (
                  item.customNode
                ) : index % 2 === 0 ? (
                  <InboxIcon />
                ) : (
                  <MailIcon />
                )}
              </ListItemIcon>

              <ListItemText
                primary={item.label}
                sx={{
                  opacity: open ? 1 : 0,
                  whiteSpace: "nowrap",

                  "& .MuiListItemText-primary": {
                    color: isActive ? "#2970FF" : "inherit",
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// App Top Bar
// ─────────────────────────────────────────────────────────────────────────────

interface AppTopBarProps {
  title: string;
  open: boolean;
  onOpen: () => void;
  toolbarAvatar: string;
  setPopper: (
    anchorElForPopper: HTMLElement | null,
    popperContent: React.ReactNode | null,
    popperPlacement: "top" | "bottom" | "left" | "right"
  ) => void;
}

const AppTopBar = ({
  title,
  open,
  onOpen,
  toolbarAvatar,
  setPopper,
}: AppTopBarProps) => {
  return (
    <StyledAppBar
      position="fixed"
      open={open}
    >
      <Toolbar
        sx={{
          "@media (min-width:0px)": {
            minHeight: `${TOOLBAR_HEIGHT}px`,
          },
        }}
      >
        <Stack
          sx={{
            flexDirection: "row",
            gap: 2,
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={onOpen}
              edge="start"
              sx={[
                {
                  marginRight: 5,
                },

                open && {
                  display: "none",
                },
              ]}
            >
              <MenuIcon />
            </IconButton>

            <Typography
              variant="h6"
              noWrap
              component="div"
            >
              {title}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            onClick={(event) => {
              setPopper(
                event.currentTarget,
                <ProfilePopup
                  toolbarAvatar={toolbarAvatar}
                />,
                "bottom"
              );
            }}
          >
            <CustomAvatar
              toolbarAvatar={toolbarAvatar}
            />
          </Box>
        </Stack>
      </Toolbar>
    </StyledAppBar>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Mini Drawer
// ─────────────────────────────────────────────────────────────────────────────

interface MiniDrawerProps {
  open: boolean;
  onClose: () => void;
  primaryItems: NavItem[];
  secondaryItems: NavItem[];
}

const MiniDrawer = ({
  open,
  onClose,
  primaryItems,
  secondaryItems,
}: MiniDrawerProps) => {
  const theme = useTheme();

  return (
    <StyledDrawer
      variant="permanent"
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={onClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>

      <Divider />

      <NavList
        items={primaryItems}
        open={open}
      />

      <Divider />

      <NavList
        items={secondaryItems}
        open={open}
      />
    </StyledDrawer>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// App Body
// ─────────────────────────────────────────────────────────────────────────────

interface AppBodyProps {
  children: React.ReactNode;
  drawerOpen: boolean;
}

const AppBody = ({
  children,
  drawerOpen,
}: AppBodyProps) => {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,

        p: 0,

        mt: `${TOOLBAR_HEIGHT}px`,

        width: `calc(100% - ${
          drawerOpen
            ? DRAWER_WIDTH
            : DRAWER_COLLAPSED_WIDTH
        }px)`,

        height: `calc(100vh - ${TOOLBAR_HEIGHT}px)`,

        maxHeight: `calc(100vh - ${TOOLBAR_HEIGHT}px)`,

        overflow: "hidden",

        overscrollBehavior: "none",
      }}
    >
      {children}
    </Box>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// CommonMiniDrawerLayout
// ─────────────────────────────────────────────────────────────────────────────

interface CommonMiniDrawerLayoutProps {
  appHeaderTitle: string;
  firstListItems: NavItem[];
  secondaryListItems: NavItem[];
  appBody: React.ReactNode;
  toolbarAvatar: string;
}

const CommonMiniDrawerLayout = ({
  appHeaderTitle,
  firstListItems,
  secondaryListItems,
  appBody,
  toolbarAvatar,
}: CommonMiniDrawerLayoutProps) => {
  const [open, setOpen] = React.useState(false);

  const {
    setPopper,
  } = useCustomHook();

  return (
    <Box
      sx={{
        display: "flex",

        width: "100vw",

        height: "100vh",

        maxHeight: "100vh",

        overflow: "hidden",

        overscrollBehavior: "none",
      }}
    >
      <CssBaseline />

      <AppTopBar
        title={appHeaderTitle}
        open={open}
        onOpen={() => setOpen(true)}
        toolbarAvatar={toolbarAvatar}
        setPopper={setPopper}
      />

      <MiniDrawer
        open={open}
        onClose={() => setOpen(false)}
        primaryItems={firstListItems}
        secondaryItems={secondaryListItems}
      />

      <AppBody drawerOpen={open}>
        {appBody}
      </AppBody>
    </Box>
  );
};

export default CommonMiniDrawerLayout;