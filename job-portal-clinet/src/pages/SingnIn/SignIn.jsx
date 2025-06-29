import React, { use } from 'react';
import LoginLottee from '../../assets/LoginLotte - 1748341124166.json'
import Lottie from 'lottie-react';
import { AuthContext } from '../../AuthContext/AuthContext';
import SociaLogIn from '../Shared/SociaLogIn';
import { useLocation, useNavigate } from 'react-router';
const SignIn = () => {
    const {signInUser}=use(AuthContext)
    const location=useLocation();
    const navigate=useNavigate();
    const from=location.state || '/';
    console.log('sign in page',location)
    const handleSignIn=(e)=>{
        e.preventDefault()
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password)
        // signIn user
        signInUser(email,password)
        .then(result=>{
            console.log(result.user)
            navigate(from)
        })
        .catch(error=>{
            console.log(error)
        })
    }
    return (
         <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse gap-5 ">
                <div className="text-center lg:text-left">
                    <Lottie style={{ width: '450px' }} loop={true} animationData={LoginLottee}></Lottie>
                </div>
                <div className="card bg-base-100 w-full max-w-md shrink-0 shadow-2xl">
                    <div className="card-body">
                        <h1 className="text-5xl font-bold text-center">SignIn now!</h1>
                        <form onSubmit={handleSignIn}>
                            <fieldset className="fieldset">
                                <label className="label">Email</label>
                                <input type="email" name='email' className="input w-full" placeholder="Email" />
                                <label className="label">Password</label>
                                <input type="password" name='password' className="input w-full" placeholder="Password" />
                                <div><a className="link link-hover">Forgot password?</a></div>
                                <button className="btn btn-neutral mt-4">SignIn</button>
                            </fieldset>
                        </form>
                        <SociaLogIn from={from}></SociaLogIn>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;