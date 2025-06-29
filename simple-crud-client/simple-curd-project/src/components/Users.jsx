import React, { use, useState } from 'react';
import { Link } from 'react-router';

const Users = ({userPromise}) => {
   const initialiUsres=use(userPromise);
   console.log(initialiUsres);
   const [users,setUsers]=useState(initialiUsres)

 const handleAddUsers=(e)=>{
 e.preventDefault()
 const name=e.target.name.value;
 const email=e.target.email.value;
 const newUser={name,email}
 console.log(newUser);
//  create user in the db
 fetch('http://localhost:3000/users',{
    method:'POST',
    headers:{
        'content-type':'application/json'
    },
    body:JSON.stringify(newUser)
 })
 .then(res=>res.json())
 .then(data=>{
    console.log('data after add in DB',data)
    if(data.insertedId){
        newUser._id=data.insertedId;
        const newUsres=[...users,newUser]
        setUsers(newUsres);
        alert('user data added')
        e.target.reset()
    }
 })}
 const handleDeletUser=(id)=>{
    console.log('Delete',id)
    fetch(`http://localhost:3000/users/${id}`,{method:'DELETE'})
    .then(res=>res.json())
    .then(data=>{
        if(data.deletedCount){
            const reaminngUsers=users.filter(user=>user._id!==id)
            setUsers(reaminngUsers)
            alert('User has been deleted')
            console.log('data after delete',data)
        }
    })
 }
    return (
        <div >
                <h1>user:{users.length}</h1>
                <form className='space-y-2' onSubmit={handleAddUsers}>
                    <input className='outline-transparent' type="text" name="name" placeholder='Name'/>
                    <br />
                    <input className='outline-transparent' type="email" name="email" placeholder='Email'/>
                    <br />
                    <input className='btn' type="submit" value="Add user" />
                </form>
                {/* show users */}
                <div className='mt-4'>
                    {
                        users.map(user=>
                        <p key={user._id}>
                            {user.name} : {user.email}
                            <Link to={`/users/${user._id}`}>Details</Link>
                            <Link to={`/update/${user._id}`}>Edit</Link>
                            <button onClick={()=>handleDeletUser(user._id)} className='ml-2'>x</button>
                            </p>)
                    }
                </div>
        </div>
    );
};

export default Users;