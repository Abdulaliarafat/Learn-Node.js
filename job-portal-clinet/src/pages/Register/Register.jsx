import Lottie from 'lottie-react';
import React, { use } from 'react';
import RegisterLottes from '../../assets/REgister - 1748323718536.json'
import { AuthContext } from '../../AuthContext/AuthContext';
import SociaLogIn from '../Shared/SociaLogIn';

const Register = () => {
    const { createUser } = use(AuthContext)
    const handleRegister = e => {
        e.preventDefault()
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password)
        // create user
        createUser(email, password)
            .then(result => {
                console.log(result.user)
            })
            .catch((error) => {
                console.log(error)
            })

    }
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse gap-10 ">
                <div className="text-center lg:text-left">
                    <Lottie style={{ width: '350px' }} loop={true} animationData={RegisterLottes}></Lottie>
                </div>
                <div className="card bg-base-100 w-full max-w-md shrink-0 shadow-2xl">
                    <div className="card-body">
                        <h1 className="text-5xl font-bold text-center">Register now!</h1>
                        <form onSubmit={handleRegister}>
                            <fieldset className="fieldset">
                                <label className="label">Email</label>
                                <input type="email" name='email' className="input w-full" placeholder="Email" />
                                <label className="label">Password</label>
                                <input type="password" name='password' className="input w-full" placeholder="Password" />
                                <div><a className="link link-hover">Forgot password?</a></div>
                                <button className="btn btn-neutral mt-4">Register</button>
                            </fieldset>
                        </form>
                        <SociaLogIn></SociaLogIn>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;