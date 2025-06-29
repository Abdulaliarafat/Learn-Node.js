import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../Hook/useAuth';
import { Link } from 'react-router';
import SocalLogIn from '../SocalLogIn/SocalLogIn';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const {createUser}=useAuth()
    const onRegister = data => {
        console.log(data)
        createUser(data.email,data.password)
        .then(result=>{
            console.log(result)
        })
        .catch(error=>{
            console.log(error)
        })
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onRegister)}>
                <h1 className="text-2xl font-bold text-center">Create an Account</h1>
                <fieldset className="fieldset">
                    <label className="label">Email</label>
                    <input type="email"
                        {...register('email',{required: true})}
                        className="input w-full" placeholder="Email" />
                    {
                        errors.email?.type === 'required' && <p className='text-red-500'>Email is required</p>
                    }
                    <label className="label">Password</label>
                    <input type="password"
                        {...register('password',
                            {
                                required: true,
                                minLength: 6,

                            })}
                        className="input w-full" placeholder="Password" />
                    {
                        errors.password?.type === 'required' && <p className='text-red-500'>Password is required</p>
                    }
                    {
                        errors.password?.type === 'minLength' && <p className='text-red-500'>Password must be 6 charectes or longer</p>
                    }
                    <div><a className="link link-hover font-bold text-md mt-2">Forgot password?</a></div>
                    <button className="btn btn-primary text-white mt-2">Register</button>
                </fieldset>
                <p><small>Already have account <Link className='text-red-400  btn btn-link -ml-3 mb-1' to='/login'>LogIn</Link></small></p>
            </form>
             <SocalLogIn></SocalLogIn>
        </div>
    );
};

export default Register;