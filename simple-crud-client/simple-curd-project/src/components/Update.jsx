import React from 'react';
import { useLoaderData } from 'react-router';

const Update = () => {
    const user=useLoaderData()
    const handleUpdateUser=(e)=>{
        e.preventDefault();
        const name=e.target.name.value;
        const email=e.target.email.value;
        const updateUser={name,email}
        console.log(updateUser)
        // put method
        fetch(`http://localhost:3000/users/${user._id}`,{
            method:'PUT',
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(updateUser)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log('after update',data)
            alert('User update successfully')
            e.target.reset()
        })
    }
    return (
        <div>
            <form onSubmit={handleUpdateUser}>
                <input type="text" name='name'  placeholder='name' defaultValue={user.name}/>
                <br />
                <input type="email" name='email' placeholder='email' defaultValue={user.email} />
                <br />
                <input className='btn mt-2' type="submit" value="Update user" />
            </form>
        </div>
    );
};

export default Update;