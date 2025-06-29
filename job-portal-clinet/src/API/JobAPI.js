export const JobsCreatedByPromise=(email,accessToken)=>{
    return fetch(`https://job-portal-server-seven-omega.vercel.app/jobs/applications?email=${email}`,{
        headers:{
            authorization:`Bearer ${accessToken}`
        }
    }).then(res=>res.json())
}