import React from 'react';
import clsx from 'clsx';
import {Button, Grid, Box, Container, AppBar, Typography, IconButton, Toolbar, Drawer, Divider, List, ListItem, ListItemText, ListItemIcon} from '@material-ui/core';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {Menu as MenuIcon, ChevronLeft as ChevronLeftIcon, AttachMoney as AttachMoneyIcon, Create as CreateIcon} from '@material-ui/icons';
import { RobotIcon} from './components/common.jsx';
import HomePage from './components/HomePage';
import FinancialPage from './components/FinancialPage';
import StormyNight from './components/StormyNight';

import {  BrowserRouter as Router,  Switch,  Route,  Link } from "react-router-dom";

import './App.css';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, 
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 10,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  card:{
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  table: {
      width: '100%'
  },
  link: {
    color: '#fff!important'
  },
  "align-right":{
    "text-align": "right"
  },

}));

function App() {

  const classes = useStyles();

  const theme = createMuiTheme({
    typography: {
      fontFamily: [
       'Cabin',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
    palette: {
      primary: {
        main: "#00a86b",
        light: "#55db99",
        dark: "#007840"
      },
      secondary: {
        main: "#000080",
        light: "#4c2eb1",
        dark: "#000053"
      },
    },
  });
    
  const [state, setState] = React.useState({
    top: false,
    left: true,
    bottom: false,
    right: false,
  });

    const [open, setOpen] = React.useState(false);
        
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
      
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
    }
    setState({ ...state, [anchor]: open });
  };

  var left = "left";

  return (    
     <div>
                 
        <ThemeProvider theme={theme}>
        <Router>

        
        <Box className="main" mt={4}>
          <AppBar color="secondary">
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant='h3' color="primary"  >Jade</Typography>
            </Toolbar>

          </AppBar>
          <Button onClick={toggleDrawer(left, true)}>left</Button>
          <Drawer anchor={left} open={state[left]} onClose={toggleDrawer(left, false)} classes={{
              paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
            }}
            open={open}>
                <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
                <ChevronLeftIcon />
            </IconButton>
            </div>
            <Divider />
              <List>
              <ListItem button component={Link} to="/">
                    <ListItemIcon>
                        <AttachMoneyIcon />
                    </ListItemIcon>
                    <ListItemText primary="Free-Form Query" />
                </ListItem>
                <ListItem button component={Link} to="/financial">
                    <ListItemIcon>
                        <AttachMoneyIcon />
                    </ListItemIcon>
                    <ListItemText primary="Financial Tools" />
                </ListItem>
              </List>
          </Drawer>
          <Container maxWidth='lg'>
            <Switch>
                <Route exact path="/">
                  <HomePage classes={classes}/>
                </Route>
                <Route exact path="/financial">
                  <FinancialPage classes={classes}/>
                </Route>
            </Switch>
            <Grid container justify="flex-end" spacing={3}>
              <Grid item sm={6} xs={5}>
                <Box className={classes["align-right"]}>
                  <a href="https://beta.openai.com/" target="_blank" rel="noopener noreferrer"><img src="https://cdn.openai.com/API/logo-assets/powered-by-openai-dark.png" width="130" height="14" alt="Powered by OpenAI" /></a>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
        
       
        </Router>
        </ThemeProvider>

      </div>

  );
}

export default App;
