import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link, useParams } from "react-router-dom";
import { getPurchaseHistory } from "./apiUser";
import moment from "moment";
import UpdateProfile from './Profile'
import ShowImage from '../core/ShowImage'
import PurchaseHistory from '../core/PurchaseHistory'

const Dashboard = () => {
    const [history, setHistory] = useState([]);

    const [content, setContent] = useState();
    const { id } = useParams();
    const {
        user: { _id, name, email, role }
    } = isAuthenticated();
    const token = isAuthenticated().token;

    const init = (userId, token) => {
        getPurchaseHistory(userId, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setHistory(data);
            }
        });
    };

    useEffect(() => {
        init(_id, token);
    }, []);

    const userLinks = () => {
        return (
            <div className="card">
                <h4 className="card-header">User Links</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        {/* <button className="btn btn-outline-primary" onClick={() => setContent('adminInfo')}>Profile</button> */}
                        <Link className="nav-link" to="/user/dashboard/profile">
                            Profile
                        </Link>
                    </li>
                    <li className="list-group-item">
                        {/* <button className="btn btn-outline-primary" onClick={() => setContent('UpdateProfile')}>Update Profile</button> */}
                        <Link className="nav-link" to={`/user/dashboard/update`}>
                            Update Profile
                        </Link>
                    </li>
                    <li className="list-group-item">
                        {/* <button className="btn btn-outline-primary" onClick={() => setContent('purchaseHistory')}>Purchase History</button> */}
                        <Link className="nav-link" to={`/user/dashboard/history`}>
                            My Purchase History
                        </Link>
                    </li>
                </ul>
            </div>
        );
    };

    const userInfo = (
        <div className="card mb-5">
            <h3 className="card-header">User Information</h3>
            <ul className="list-group">
                <li className="list-group-item">{name}</li>
                <li className="list-group-item">{email}</li>
                <li className="list-group-item">
                    {role === 1 ? "Admin" : "Registered User"}
                </li>
            </ul>
        </div>)



    const renderContent = () => {
        switch (id) {
            case 'profile':
                return userInfo
            case 'update':
                return <UpdateProfile userId={_id} />
            case 'history':
                return <PurchaseHistory history={history} />
            //return purchaseHistory(history)
            default:
                return userInfo
        }
    }

    return (
        <Layout
            title="Dashboard"
            description={`G'day ${name}!`}
            className="container-fluid"
        >
            <div className="row">
                <div className="col-sm-3">{userLinks()}</div>
                <div className="col-sm-9">{renderContent()}</div>
            </div>
        </Layout>
    );
};

export default Dashboard;
