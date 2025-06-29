export const myApplicationPromise =(email,accessToken)=>{
    return fetch(`https://job-portal-server-seven-omega.vercel.app/applications?email=${email}`,{
        headers:{
            authorization:`Bearer ${accessToken}`
        }
    }).then(res=>res.json())
}