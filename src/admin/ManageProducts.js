import React, { useState, useEffect, Fragment } from "react";
//import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct } from "./apiAdmin";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions
} from '@material-ui/core';

const ManageProducts = () => {
    const [products, setProducts] = useState([]);

    const { user, token } = isAuthenticated();
    const [open, setOpen] = useState(false)
    const [deleteTarget, setDeleteTarget] = useState()
    
    const loadProducts = () => {
        getProducts().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setProducts(data);
            }
        });
    };

    const destroy = productId => {
        setOpen(false);
        deleteProduct(productId, user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                loadProducts();
            }
        });
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const handleDialogClose = () => {
        setOpen(false);
    }

    const deleteHandler = (p) => {
        setOpen(true)
        setDeleteTarget(p)
    }
    return (
        <Fragment>
            <Dialog open={open} onClose={handleDialogClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Delete Product</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {`Are you sure to delete ${deleteTarget && deleteTarget.name} ?`}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button onClick={handleDialogClose} className="btn btn-outline-primary">Cancel</button>
                    <button onClick={() => destroy(deleteTarget._id)} className="btn btn-outline-danger">delete</button>
                </DialogActions>
            </Dialog>
            <div className="row">
                <div className="col-12">
                    <h2 className="text-center">
                        Total {products.length} products
                    </h2>
                    <hr />
                    <ul className="list-group">
                        {products.map((p, i) => (
                            <li
                                key={i}
                                className="list-group-item d-flex justify-content-between align-items-center"
                            >
                                <div className="col-sm-8">
                                    <strong>{p.name}</strong>
                                </div>
                                <div className="col-sm-2">
                                    <Link to={`/admin/product/update/${p._id}`}>
                                        <button className="btn btn-outline-primary">Update</button>
                                    </Link>
                                </div>
                                <div className="col-sm-2">
                                    <button
                                        className="btn btn-outline-danger"
                                        onClick={() => deleteHandler(p)}>
                                        Delete
                                        </button>
                                </div>
                                {/* <span
                                onClick={() => destroy(p._id)}
                                className="badge badge-danger badge-pill"
                            >
                                Delete
                                </span> */}
                            </li>
                        ))}
                    </ul>
                    <br />
                </div>
            </div>
        </Fragment>
        // <Layout
        //     title="Manage Products"
        //     description="Perform CRUD on products"
        //     className="container-fluid"
        // >
        //     <div className="row">
        //         <div className="col-12">
        //             <h2 className="text-center">
        //                 Total {products.length} products
        //             </h2>
        //             <hr />
        //             <ul className="list-group">
        //                 {products.map((p, i) => (
        //                     <li
        //                         key={i}
        //                         className="list-group-item d-flex justify-content-between align-items-center"
        //                     >
        //                         <strong>{p.name}</strong>
        //                         <Link to={`/admin/product/update/${p._id}`}>
        //                             <span className="badge badge-warning badge-pill">
        //                                 Update
        //                             </span>
        //                         </Link>
        //                         <span
        //                             onClick={() => destroy(p._id)}
        //                             className="badge badge-danger badge-pill"
        //                         >
        //                             Delete
        //                         </span>
        //                     </li>
        //                 ))}
        //             </ul>
        //             <br />
        //         </div>
        //     </div>
        // </Layout>
    );
};

export default ManageProducts;
