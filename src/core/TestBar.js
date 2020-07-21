import React from 'react'
import { signout, isAuthenticated } from "../auth";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { itemTotal } from "./cartHelpers";
import AccountCircle from '@material-ui/icons/AccountCircle';
import {
    Badge,
    IconButton
} from '@material-ui/core'
import { useHistory } from "react-router-dom";
const TestBar = () => {

    const menuId = 'primary-search-account-menu';
    const history = useHistory()

    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="collapse navbar-collapse" id="navbarText">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Shop</a>
                    </li>
                </ul>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Dropdown link
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <a class="dropdown-item" href="#">Action</a>
                        <a class="dropdown-item" href="#">Another action</a>
                    </div>
                </li>
            </div>
        </nav>
    )
}

export default TestBar