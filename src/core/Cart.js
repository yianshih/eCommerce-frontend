import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import { getCart } from './cartHelpers';
import Card from './Card';
import Checkout from './Checkout';

const Cart = () => {
    const [items, setItems] = useState([]);
    const [run, setRun] = useState(false);

    useEffect(() => {
        setItems(getCart());
    }, [run]);

    const showItems = items => {
        return (
            <div>
                <h2>Your cart has {`${items.length}`} items</h2>
                <hr />
                {items.map((product, i) => (
                    <div key={i} className="mb-2" style={{ maxWidth: '400px' }}>
                        <Card
                            product={product}
                            showAddToCartButton={false}
                            cartUpdate={true}
                            showRemoveProductButton={true}
                            setRun={setRun}
                            run={run}
                        />
                    </div>
                ))}
            </div>
        );
    };

    const noItemsMessage = () => (
        <p style={{ fontSize: '20px' }} className="font-weight-lighter">
            Your cart is empty. <Link to="/shop">Go shopping</Link>
        </p>
    );

    return (
        <Layout
            title="Shopping Cart"
            description="Manage your cart items. Add remove checkout or continue shopping."
            className="container-fluid"
        >
            <div className="row justify-content-center">
                {items.length > 0
                    ? <Fragment>
                        <div className="col-sm-6">{showItems(items)}</div>
                        <div className="col-sm-4">
                            <h2 className="mb-0">Your cart summary</h2>
                            <hr />
                            <Checkout products={items} setRun={setRun} run={run} />
                        </div>
                    </Fragment>
                    : <div className="col-md-auto">{noItemsMessage()}</div>}
            </div>
        </Layout>
    );
};

export default Cart;
