import React, { use } from 'react';
import { AuthContext } from './Context/AuthProvider';

const SingIn = () => {
  const {signInUser}=use(AuthContext)
    const handleSignInUpUser=(e)=>{
        e.preventDefault()
        const form=e.target;
        const email=form.email.value;
        const password=form.password.value;
        console.log(email,password)
        // send to firebase..
        signInUser(email,password)
        .then(result=>{
          console.log(result.user)
          // update last signIn to the database.
          const signInInfo={
            email,
            lastSignInTime:result.user?.metadata?.lastSignInTime,
          }
          fetch('http://localhost:3000/users',{
            method:'PATCH',
            headers:{
              "content-type":"application/json"
            },
            body:JSON.stringify(signInInfo)
          })
          .then(res=>res.json())
          .then(data=>{
            console.log("after update",data)
          })
        })
        .catch(error=>{
          console.log(error)
        })
    }
    return (
        <div className="card bg-base-100  max-w-sm mx-auto mt-15 shrink-0 shadow-2xl">
      <div className="card-body">
        <h1 className="text-3xl font-bold text-center">SignIn now!</h1>
        <form onSubmit={handleSignInUpUser} className="fieldset">
          <label className="label">Email</label>
          <input type="email" className="input" name='email' placeholder="Email" />
          <label className="label">Password</label>
          <input type="password" className="input" name='password' placeholder="Password" />
          <button className="btn hover:rounded-3xl mt-4 bg-blue-500 text-white">SignIp</button>
        </form>
      </div>
    </div>
    );
};

export default SingIn;