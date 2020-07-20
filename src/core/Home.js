import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getProducts } from './apiCore';
import Card from './Card';
import Search from './Search';
import { toast } from 'react-toastify';

const Home = () => {
    const [productsBySell, setProductsBySell] = useState([]);
    const [productsByArrival, setProductsByArrival] = useState([]);
    const [error, setError] = useState(false);
    const [run, setRun] = useState(false);

    const loadProductsBySell = () => {
        getProducts('sold').then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProductsBySell(data);
            }
        });
    };

    const loadProductsByArrival = () => {
        getProducts('createdAt').then(data => {
            //console.log(data);
            if (data.error) {
                setError(data.error);
            } else {
                setProductsByArrival(data);
            }
        });
    };

    useEffect(() => {
        loadProductsByArrival();
        loadProductsBySell();
    }, []);

    return (
        <Layout
            title="Ecommerce App"
            description="Full Stack MERN Ecommerce"
            className="container-fluid"
        >
            <Search />
            <h2 className="mb-4">New Arrivals</h2>
            <div className="row justify-content-start">
                {productsByArrival.map((product, i) => (
                    <div key={i} className="col-4-auto mb-3" style={{ margin: '20px', maxWidth: '300px' }}>
                        <Card
                            product={product}
                            setRun={setRun}
                            run={run} />
                    </div>
                ))}
            </div>
            <h2 className="mb-4">Best Sellers</h2>
            <div className="row">
                {productsBySell.map((product, i) => {
                    if (i < 3) return (<div key={i} className="col-4-auto mb-3" style={{ margin: '20px', maxWidth: '300px' }}>
                        <Card
                            product={product}
                            setRun={setRun}
                            run={run}
                        />
                    </div>)
                    else return
                })}
            </div>
        </Layout>
    );
};

export default Home;
