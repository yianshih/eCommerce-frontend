import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function ButtonAppBar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <Typography variant="h6" className={classes.title}>Home</Typography>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>Shop</Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}



// server {
//     listen 80 default_server;
//     server_name _;
  
//     #react app & front-end files
//     location / {
//         root /var/www/eCommerce-frontend/build;
//         proxy_pass http://localhost:3000/;
//         try_files $uri /index.html;
//     }
  
//     #node api reverse proxy
//     location /api/ {
//         proxy_pass http://localhost:8000/;
//     }
// }
