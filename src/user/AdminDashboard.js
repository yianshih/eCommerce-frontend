import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link, useParams } from "react-router-dom";
import AddCategory from '../admin/AddCategory'
import CreateProduct from '../admin/AddProduct'
import ViewOrders from '../admin/Orders'
import ManageProducts from '../admin/ManageProducts'
import { getPurchaseHistory } from "./apiUser";
import ShowImage from '../core/ShowImage'
import moment from "moment";
import PurchaseHistory from '../core/PurchaseHistory'


const AdminDashboard = () => {
    const {
        user: { _id, name, email, role },
        token
    } = isAuthenticated();


    const [history, setHistory] = useState([]);

    useEffect(() => {
        setContent(adminInfo)
        getPurchaseHistory(_id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setHistory(data);
            }
        });
    }, [])

    const [content, setContent] = useState()
    const { id } = useParams();

    const adminInfo = (
        <div className="card mb-5">
            <h3 className="card-header">User Information</h3>
            <ul className="list-group">
                <li className="list-group-item">{name}</li>
                <li className="list-group-item">{email}</li>
                <li className="list-group-item">
                    {role === 1 ? "Admin" : "Registered User"}
                </li>
            </ul>
        </div>
    );
    //console.log("id : ", id)
    const renderContent = () => {
        switch (id) {
            case 'profile':
                return adminInfo
            case 'category':
                return <AddCategory />
            case 'create-product':
                return <CreateProduct />
            case 'orders':
                return <ViewOrders />
            case 'manage-products':
                return <ManageProducts />
            case 'history':
                return <PurchaseHistory history={history} />
                //return purchaseHistory(history)
            default:
                return adminInfo
        }
    }

    const purchaseHistory = history => {
        return (
            <div className="card mb-5">
                <h3 className="card-header">Purchase history</h3>
                <ul className="list-group">
                    <li className="list-group-item">
                        {history.map((h, i) => {
                            console.log("history : ", history)
                            return (
                                <div key={i}>
                                    {i !== 0 && <hr />}
                                    {h.products.map((p, i) => {

                                        return (
                                            <div key={i} className="row justify-content-start align-items-center">
                                                <div className="col-sm-4" style={{ maxWidth: '100px' }}>
                                                    <ShowImage item={p} url="product" />
                                                </div>
                                                <div className="col-sm-3">
                                                    <h6>{p.name}</h6>
                                                </div>

                                                <div className="col-sm-2">
                                                    <h6>${p.price}</h6>
                                                </div>
                                                <div className="col-sm-3">
                                                    <h6>Purchased date:{" "}{moment(p.createdAt).fromNow()}</h6>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </li>
                </ul>
            </div>
        );
    };

    const adminLinks = () => {
        return (
            <div className="card">
                <h4 className="card-header">Admin Links</h4>
                <ul className="list-group">
                    <li className="list-group-item">

                        {/* <button className="btn btn-outline-primary" onClick={() => setContent('adminInfo')}>Profile</button> */}
                        <Link className="nav-link" to="/admin/dashboard/Profile">
                            Profile
                        </Link>
                    </li>
                    <li className="list-group-item">
                        {/* <button className="btn btn-outline-primary" onClick={() => setContent('purchaseHistory')}>Purchase History</button> */}
                        <Link className="nav-link" to={`/admin/dashboard/history`}>
                            My Purchase History
                        </Link>
                    </li>

                    <li className="list-group-item">
                        {/* <button className="btn btn-outline-primary" onClick={() => setContent('AddCategory')}>Create Category</button> */}
                        <Link className="nav-link" to="/admin/dashboard/category">
                            Create Category
                        </Link>
                    </li>
                    <li className="list-group-item">
                        {/* <button className="btn btn-outline-primary" onClick={() => setContent('CreateProduct')}>Create Product</button> */}
                        <Link className="nav-link" to="/admin/dashboard/create-product">
                            Create Product
                        </Link>
                    </li>
                    <li className="list-group-item">
                        {/* <button className="btn btn-outline-primary" onClick={() => setContent('ViewOrders')}>View Orders</button> */}
                        <Link className="nav-link" to="/admin/dashboard/orders">
                            View Orders
                        </Link>
                    </li>
                    <li className="list-group-item">
                        {/* <button className="btn btn-outline-primary" onClick={() => setContent('ManageProducts')}>Manage Products</button> */}
                        <Link className="nav-link" to="/admin/dashboard/manage-products">
                            Manage Products
                        </Link>
                    </li>
                </ul>
            </div>
        );
    };

    return (
        <Layout
            title="Dashboard"
            description={`G'day ${name}!`}
            className="container-fluid"
        >
            <div className="row">
                <div className="col-sm-2">{adminLinks()}</div>
                <div className="col-sm-10">
                    {renderContent()}
                    {/* {content === 'adminInfo' ? adminInfo : <AddCategory />} */}
                </div>
                {/* <div className="col-9">{adminInfo()}</div> */}
            </div>
        </Layout>
    );
};

export default AdminDashboard;
