import { useLoaderData } from 'react-router';

const UserDetails = () => {
    const user=useLoaderData();
    console.log(user)
    return (
        <div>
            <h1>user detail</h1>
        </div>
    );
};

export default UserDetails;