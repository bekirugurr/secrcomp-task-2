import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import { ProjectContext } from "../context/ProjectContext";
import Dashboard from "./Dashboard";
import Table from "./Table";
import CreateProject from "./CreateProject";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function LeftAppBar() {
  const { whichScreenIsShowing, setWhichScreenIsShowing } =
    React.useContext(ProjectContext);
  //   const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {whichScreenIsShowing === "Dashboard"
              ? whichScreenIsShowing
              : whichScreenIsShowing + " Projects  List"}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader
          sx={{
            display: "flex",
            justifyContent: "start",
            paddingLeft: "1.5rem",
          }}
        >
          <IconButton onClick={handleDrawerClose}>
            <MenuIcon />
          </IconButton>
        </DrawerHeader>
        <List sx={{ padding: " 1.5rem" }}>
          {["Dashboard", "All", "Ongoing", "Next", "Completed"].map(
            (text, index) => (
              <Button
                key={text}
                variant="contained"
                size="small"
                sx={{ width: "12rem", marginBottom: ".5rem" }}
                onClick={() => setWhichScreenIsShowing(text)}
              >
                {text === "Dashboard" ? text : text + " Projects"}
              </Button>
            )
          )}
        </List>
        <Box
          sx={{
            flexGrow: "1",
            display: "flex",
            flexDirection: "row",
            alignItems: "end",
            justifyContent: "center",
            paddingBottom: "2rem",
          }}
        >
          <List sx={{ marginTop: "8rem" }}>
            <CreateProject />
          </List>
        </Box>
      </Drawer>
      {/*//! Dashboard veya Table'ın göründüğü ana yer burası */}
      <Main open={open} sx={{ padding: "3rem 5rem" }}>
        <DrawerHeader />
        {whichScreenIsShowing === "Dashboard" ? <Dashboard /> : <Table />}
      </Main>
    </Box>
  );
}
