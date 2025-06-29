import React, { use, useState } from 'react';

const Users = ({userPromise}) => {
    const initialUsers=use(userPromise)
    const [users,setUsers]=useState(initialUsers)
    console.log(users)
    const handleAddUser=(e)=>{
        e.preventDefault()
        const name=e.target.name.value
        const email=e.target.email.value
        const user={name,email}
        console.log(user)
        fetch('http://localhost:3000/users',{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(user)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log('data after post',data)
            const newUsers=[...users,data];
            setUsers(newUsers)
            e.target.reset()
        })
    }
    return (
        
        <div>
            <form onSubmit={handleAddUser} action="">
                <input name='name' type="text" />
                <br />
                <input type="email" name="email" id="" />
                <br />
                <input type="submit" value="Add user" />
            </form>
            <div>
                {
                users.map(user=><p key={user.id}>{user.name} :  {user.email}</p>)
            }
            </div>
        </div>
    );
};

export default Users;