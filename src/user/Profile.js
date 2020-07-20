import React, { useState, useEffect, Fragment } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link, Redirect } from 'react-router-dom';
import { read, update, updateUser } from './apiUser';
import { toast } from 'react-toastify';

const Profile = props => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    });

    const [isChanged, setIsChanged] = useState(false)
    const { token } = isAuthenticated();
    const { name, email, password, error, success } = values;

    const init = userId => {
        // console.log(userId);
        read(userId, token).then(data => {
            console.log("data : ", data)
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({ ...values, name: data.name, email: data.email });
            }
        });
    };

    useEffect(() => {
        // init(match.params.userId);
        init(props.userId);
    }, []);

    const handleChange = name => e => {
        setIsChanged(true)
        setValues({ ...values, error: '', [name]: e.target.value });
    };

    const clickSubmit = e => {
        e.preventDefault();
        update(props.userId, token, { name, email, password }).then(data => {
            if (data.error) {
                setValues({
                    ...values,
                    error: data.error
                })
                // console.log(data.error);
                //alert(data.error);
            } else {
                updateUser(data, () => {
                    setValues({
                        ...values,
                        name: data.name,
                        email: data.email,
                        success: true
                    });
                    setIsChanged(false)
                });
                toast.info('Updated')
            }
        });
    };

    //console.log("error : ", error)

    const redirectUser = success => {
        if (success) {
            return <Redirect to="/cart" />;
        }
    };

    const profileUpdate = (name, email, password) => (
        <form>
            <div className="form-group">
                {error && error.toLowerCase().includes('name')
                    ? <Fragment>
                        <label>Name</label>
                        <input type="text" className="form-control is-invalid" onChange={handleChange('name')} id="validationServer04" value={name} required />
                        <div className="invalid-feedback">{error}</div>
                    </Fragment>
                    : <Fragment>
                        <label className="text-muted">Name</label>
                        <input type="text" onChange={handleChange('name')} className="form-control" value={name} />
                    </Fragment>}
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input disabled type="email" onChange={handleChange('email')} className="form-control" value={email} />
            </div>
            <div className="form-group">
                {error && error.toLowerCase().includes('password')
                    ? <Fragment>
                        <label>Password</label>
                        <input type="text" className="form-control is-invalid" onChange={handleChange('password')} id="validationServer04" value={password} required />
                        <div className="invalid-feedback">{error}</div>
                    </Fragment>
                    : <Fragment>
                        <label className="text-muted">New Password</label>
                        <input disabled={false} type="password" onChange={handleChange('password')} className="form-control" value={password} />
                    </Fragment>}


            </div>


            <div className="row justify-content-end">
                <div className="col-sm-auto">
                    <button disabled={!isChanged} onClick={clickSubmit} className="btn btn-danger">Submit</button>
                </div>
            </div>

        </form>
    );

    return (
        <Fragment>
            <h2 className="mb-4">Profile update</h2>
            {profileUpdate(name, email, password)}
            {/* {redirectUser(success)} */}
        </Fragment>
        // <Layout title="Profile" description="Update your profile" className="container-fluid">
        //     <h2 className="mb-4">Profile update</h2>
        //     {profileUpdate(name, email, password)}
        //     {redirectUser(success)}
        // </Layout>
    );
};

export default Profile;
