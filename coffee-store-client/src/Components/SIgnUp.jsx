import React, { use } from 'react';
import { AuthContext } from './Context/AuthProvider';
import Swal from 'sweetalert2';
import axios from 'axios';

const SIgnUp = () => {
  const { createUser } = use(AuthContext)
  console.log(createUser)
  const handleSignUpUser = (e) => {
    e.preventDefault()
    const form = e.target;
    const formData = new FormData(form);
    const { email, password, ...restFormData } = Object.fromEntries(formData.entries())
    
    // set in firebase.
    createUser(email, password)
      .then(result => {
        console.log(result.user)
        // save more info....
        const userProfile={
          email,
          ...restFormData,
          creationTime:result.user?.metadata?.creationTime,
          lastSignInTime:result.user?.metadata?.lastSignInTime
        }
        axios.post('http://localhost:3000',userProfile)
        .then(data=>{
          console.log(data.data)
        })
        //  save profile in database..
        // fetch('http://localhost:3000/users', {
        //   method: "POST",
        //   headers: {
        //     'content-type': 'application/json'
        //   },
        //   body: JSON.stringify(userProfile)
        // })
        //   .then(res => res.json())
        //   .then(data => {
        //     if (data.insertedId) {
        //       Swal.fire({
        //         position:"top-start",
        //         icon: "success",
        //         title: "Your account is created",
        //         showConfirmButton: false,
        //         timer: 1500
        //       });
        //     }
        //   })
      })
      .catch(error => {
        console.log(error)
      })
  }
  return (
    <div className="card bg-base-100  max-w-sm mx-auto mt-15 shrink-0 shadow-2xl">
      <div className="card-body">
        <h1 className="text-3xl font-bold text-center">SignUp now!</h1>
        <form onSubmit={handleSignUpUser} className="fieldset">
          <label className="label">Name</label>
          <input type="text" className="input" name='name' placeholder="Name" />
          <label className="label">Address</label>
          <input type="text" className="input" name='address' placeholder="Address" />
          <label className="label">Phone</label>
          <input type="text" className="input" name='phone' placeholder="Phone" />
          <label className="label">Photo</label>
          <input type="text" className="input" name='photo' placeholder="Photo URL" />
          <label className="label">Email</label>
          <input type="email" className="input" name='email' placeholder="Email" />
          <label className="label">Password</label>
          <input type="password" className="input" name='password' placeholder="Password" />
          <button className="btn hover:rounded-3xl mt-4 bg-blue-500 text-white">SignUp</button>
        </form>
      </div>
    </div>

  );
};

export default SIgnUp;