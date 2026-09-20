import * as React from "react";
import Link from "next/link";
import CustomAvatar from "@/components/CustomAvatar";
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
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  MoveToInbox as InboxIcon,
  Mail as MailIcon,
} from "@mui/icons-material";
import { useCustomHook } from "@/app/utils/hook";
import ProfilePopup from "./ProfilePopup";

// ─── Constants ────────────────────────────────────────────────────────────────

const DRAWER_WIDTH = 240;
const DRAWER_COLLAPSED_WIDTH = 65;
const TOOLBAR_HEIGHT = 48;

// ─── Types ────────────────────────────────────────────────────────────────────

export interface NavItem {
  label?: string;
  route?: string;
  customNode?: React.ReactNode;
}

// ─── Styled primitives ────────────────────────────────────────────────────────

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
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

// ─── NavList ──────────────────────────────────────────────────────────────────

interface NavListProps {
  items: NavItem[];
  open: boolean;
}

const NavList = ({ items, open }: NavListProps) => (
  <List sx={{ p: 0 }}>
    {items.map((item, index) => {
      if (item.customNode) {
        return (
          <ListItem
            key={
              item.label ??
              `custom-item-${item.route ?? String(index)}`
            }
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: open ? "flex-start" : "center",
              width: "100%",
              boxSizing: "border-box",
              px: open ? 2 : 0,
              py: 1,
              gap: open ? 1 : 0,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {item.customNode}
            </Box>

            <ListItemText
              primary={item.label}
              sx={{
                opacity: open ? 1 : 0,
                whiteSpace: "nowrap",
                flex: open ? 1 : 0,
              }}
            />
          </ListItem>
        );
      }

      return (
        <ListItem
          key={item.label}
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
            sx={[
              {
                minHeight: 48,
                px: 2.5,
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
                },
                open
                  ? {
                      mr: 3,
                    }
                  : {
                      mr: "auto",
                    },
              ]}
            >
              {index % 2 === 0 ? (
                <InboxIcon />
              ) : (
                <MailIcon />
              )}
            </ListItemIcon>

            <ListItemText
              primary={item.label}
              sx={{
                opacity: open ? 1 : 0,
              }}
            />
          </ListItemButton>
        </ListItem>
      );
    })}
  </List>
);

// ─── AppTopBar ────────────────────────────────────────────────────────────────

interface AppTopBarProps {
  title: string;
  open: boolean;
  onOpen: () => void;
  toolbarAvatar: string;
  setPopper: (
    anchorElForPopper: HTMLElement | null,
    popperContent: React.ReactNode | null
  ) => void;
}

const AppTopBar = ({
  title,
  open,
  onOpen,
  toolbarAvatar,
  setPopper,
}: AppTopBarProps) => (
  <StyledAppBar position="fixed" open={open}>
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
          onClick={(event) =>
            setPopper(
              event.currentTarget,
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ProfilePopup toolbarAvatar={toolbarAvatar} />
              </Box>
            )
          }
        >
          <CustomAvatar toolbarAvatar={toolbarAvatar} />
        </Box>
      </Stack>
    </Toolbar>
  </StyledAppBar>
);

// ─── MiniDrawer ───────────────────────────────────────────────────────────────

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
    <StyledDrawer variant="permanent" open={open}>
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

// ─── AppBody ──────────────────────────────────────────────────────────────────

interface AppBodyProps {
  children: React.ReactNode;
  drawerOpen: boolean;
}

const AppBody = ({
  children,
  drawerOpen,
}: AppBodyProps) => (
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

// ─── CommonMiniDrawerLayout ───────────────────────────────────────────────────

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
  const { setPopper } = useCustomHook();

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