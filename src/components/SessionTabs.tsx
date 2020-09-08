import React from "react";
import clsx from "clsx";
import {
  makeStyles,
  Theme,
  createStyles,
  useTheme,
} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import CharacterSheet from "./CharacterSheet";
import Menu from "./menu";
import { IconButton, Drawer, FormControl } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import Login from "./Login";

// Styleはサンプルのコピーです
const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
    appBar: {
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    content: {
      flexGrow: 1,
      display: "initial",
      padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      display: "flex",
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: drawerWidth,
    },
    menuButton: {
      marginRight: theme.spacing(5),
      marginLeft: theme.spacing(5),
    },
    drawer: {
      width: drawerWidth,
    },
    hide: {
      display: "none",
    },
    tabs: {
      display: "flex",
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      justifyContent: "flex-end",
    },
  })
);

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
};

const a11yProps = (index: any) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const SessionTabs = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [drawerOpen, setOpen] = React.useState(false);
  const theme = useTheme();

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: drawerOpen,
        })}
      >
        <div className={classes.tabs}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, drawerOpen && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Tabs value={value} onChange={handleChange} aria-label="Session Tabs">
            <Tab label="キャラクター" {...a11yProps(0)} />
            <Tab label="戦闘" {...a11yProps(1)} />
            <Tab label="探索" {...a11yProps(2)} />
          </Tabs>
        </div>
      </AppBar>
      <FormControl
        className={clsx(classes.content, {
          [classes.contentShift]: drawerOpen,
        })}
      >
        {/* 各Tabの中身 */}
        <TabPanel value={value} index={0}>
          <CharacterSheet />
        </TabPanel>
        <TabPanel value={value} index={1}>
          {/* <Menu /> */}
          menu
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Login />
        </TabPanel>
      </FormControl>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={drawerOpen}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Typography className={classes.drawer}>メニュー的な何か</Typography>
      </Drawer>
    </div>
  );
};

export default SessionTabs;
