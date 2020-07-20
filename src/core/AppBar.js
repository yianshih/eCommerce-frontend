import React, { useState, useEffect } from 'react'
//import { AuthContext } from '../context/authContext';
import clsx from 'clsx'
import {
  makeStyles,
  useTheme,
  Grid,
  Button,
  IconButton,
  Divider,
  Typography,
  Toolbar,
  AppBar,
  CssBaseline,
  Menu,
  MenuItem,
  Badge
} from '@material-ui/core'
import DrawerButton from './drawer'
import AccountCircle from '@material-ui/icons/AccountCircle';
import { deepOrange } from '@material-ui/core/colors';
//import { auth } from 'firebase';
//import { GET_POSTS, ALL_USERS } from '../graphql/queries';
import { useHistory } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { itemTotal } from "./cartHelpers";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    //display: 'flex',
    flexGrow: 1
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  search: {
    width: '50%',
  },
  input: {
    //color: "black"
  },
  textfield: {
    borderRadius: '5px',
    margin: '2px',
    background: "white"
  },
  inputRoot: {
    color: 'inherit',
  },

  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },

}));

const MyAppBar = (props) => {

  const classes = useStyles()
  //const theme = useTheme()
  const history = useHistory()
  const [anchorEl, setAnchorEl] = useState(null);

  //const { user } = state;

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const menuId = 'primary-search-account-menu';
  const mobileMenuId = 'primary-search-account-menu-mobile';
  //const [itemsTotal, setItemsTotal] = useState(itemTotal())

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isMenuOpen = Boolean(anchorEl);

  //console.log("searchData : ", searchData)

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };


  const menuClickHandler = (path) => {
    setAnchorEl(null);
    handleMobileMenuClose();
    history.push(path)
  }


  // const logout = () => {
  //   setAnchorEl(null);
  //   handleMobileMenuClose();

  // };
  //console.log("user : ", user)

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem>
        <Typography>{isAuthenticated() && isAuthenticated().user.email}</Typography>
      </MenuItem>
      {isAuthenticated() && isAuthenticated().user.role === 1 && <MenuItem onClick={() => menuClickHandler('/admin/dashboard/profile')}>Dashboard</MenuItem>}
      {isAuthenticated() && isAuthenticated().user.role === 0 && <MenuItem onClick={() => menuClickHandler('/user/dashboard/profile')}>Dashboard</MenuItem>}
      <Divider />
      {isAuthenticated() && <MenuItem onClick={() => {
        setAnchorEl(null);
        handleMobileMenuClose();
        signout(() => { history.push("/"); })
      }}>
        <Typography variant="button" color="secondary">LOGOUT</Typography>
      </MenuItem>}
    </Menu>
  );

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <Typography>{isAuthenticated() && isAuthenticated().user.email}</Typography>
      </MenuItem>
      {isAuthenticated() && isAuthenticated().user.role === 1 && <MenuItem onClick={() => history.push('/admin/dashboard')}>Dashboard</MenuItem>}
      {isAuthenticated() && isAuthenticated().user.role === 0 && <MenuItem onClick={() => history.push('/user/dashboard')}>Dashboard</MenuItem>}
      <Divider />
      {isAuthenticated() && <MenuItem onClick={() => signout(() => { history.push("/"); })}>
        <Typography variant="button" color="secondary">LOGOUT</Typography>
      </MenuItem>}

    </Menu>
  )
  //console.log("searchOption : ", searchOption)
  //console.log("auth : ", isAuthenticated().user)
  //console.log("itemTotal() : ", itemTotal())
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="static"
        className={
          clsx(classes.appBar, { [classes.appBarShift]: open, })
        }
      >
        <Toolbar>
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              <Grid container justify="center" alignItems="center" spacing={10}>
                {/* <Grid item>
                  <DrawerButton />
                </Grid> */}
                <Grid item>
                  <Typography style={{ cursor: 'pointer' }} onClick={() => history.push("/")} variant="subtitle1">Home</Typography>
                </Grid>
                <Grid item>
                  <Typography style={{ cursor: 'pointer' }} onClick={() => history.push("/shop")} variant="subtitle1">Shop</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <IconButton aria-label="showCart" color="inherit" onClick={() => history.push("/cart")}>
                <Badge badgeContent={itemTotal() && itemTotal()} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Grid>
          </Grid>
          {isAuthenticated() &&
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit">
              <AccountCircle />
            </IconButton>}
          {!isAuthenticated() &&
            <div style={{ marginLeft: '10px' }}><Button color="inherit" onClick={() => history.push("/signin")}>Login</Button></div>}

        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}

export default MyAppBar
