import React, { Fragment, useState, useEffect } from 'react'
import ShowImage from '../core/ShowImage'
import moment from "moment";


const PurchaseHistory = ({ history }) => {

    const [openOrder, setOpenOrder] = useState()

    return (
        <div className="card mb-5">
            <h3 className="card-header">Purchase history</h3>
            <ul className="list-group">

                {history && history.map((h, i) => {
                    //console.log("history : ", history)
                    return (
                        <li className="list-group-item" key={i}>
                            <div className="row align-items-center">
                                <div className="col-sm-6">
                                    <h5 className="mb-0">{`Transaction ID : ${h.transaction_id}`}</h5>
                                </div>
                                <div className="col-sm-3">
                                    <h6 className="mb-0">{moment(h.createdAt).fromNow()}</h6>
                                </div>
                                <div className="col-sm-3">
                                    <button className="btn btn-outline-primary" onClick={() => setOpenOrder(h.transaction_id === openOrder ? '' : h.transaction_id)}>View Details</button>
                                </div>
                            </div>
                            <div style={{ display: openOrder === h.transaction_id ? '' : 'none' }}>

                                {h.products.map((p, i) => {
                                    return (
                                        <Fragment>
                                            {i !== 0 && <hr />}
                                            <div key={i} className="row justify-content-start align-items-center">
                                                <div className="col-sm-6" style={{ maxWidth: '100px' }}>
                                                    <ShowImage item={p} url="product" />
                                                </div>
                                                <div className="col-sm-3">
                                                    <h6>{p.name}</h6>
                                                </div>
                                                <div className="col-sm-3">
                                                    <h6>${p.price}</h6>
                                                </div>
                                            </div>
                                        </Fragment>

                                    );
                                })}

                            </div>
                        </li>
                    );
                })}
            </ul>
        </div >
    );
};

export default PurchaseHistory