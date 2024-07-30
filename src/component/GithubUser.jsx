import React,{useEffect, useState} from "react";



const GithubUser=()=>{
    
 const [user, setUser]=useState('')
 const [showuser, setShowuser]=useState('')
 const [error, setError] = useState('');

    const fetchGithubusers= async()=>{
         if (!user) {
           return alert('Please enter a username')
           }
        const giturl=`https://api.github.com/users/${user}`
        try {
            const response =await fetch(giturl);
            const finduser = await response.json()
            // console.log(finduser);
            // setShowuser(finduser)
           
            if (finduser.message === "Not Found") {
                setError('User not found');
                setShowuser(null);
                
              } else {
                console.log(finduser);
                setShowuser(finduser);
                setError('');
                
              }
          
           
        } catch (error) {
            console.log(error);
            setError('An error occurred. Please try again.');
               setShowuser(null);
        }
       
    };
  
    const handlesub=(e)=>{
        e.preventDefault();
        fetchGithubusers(user)
    }
    const handleclr=()=>{
      setShowuser('')
      setError('')
      setUser('')
    }
    
    return(
        <>
        <main className="bg-neutral-800 h-[100vh] laptop:flex gap-2 laptop:gap-10 flex flex-col  items-center laptop:py-10 ">
        <div>
            <h1  className="laptop:font-extrabold laptop:text-6xl 
            font-bold text-2xl laptop:p-5 p-9 py-3  rounded bg-zinc-700
             text-white ">Github Profile Finder</h1>
                <div  className="">
                
                  <p className="text-center text-red-300 "> Created by NATRAK_DEV <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span></span></p>
                  </div>
        </div>
        <form onSubmit={handlesub}>
            <input type="text" 
            placeholder="Find a Github user" 
            className="laptop:w-[41vw] w-[97vw] h-[8vh] rounded px-2 bg-zinc-700 text-white text-xl outline-none"
            onChange={((e)=>setUser(e.target.value))} 
            value={user}/>
            {/* <button>Submit</button> */}
            </form>
            {error && (
          <div className="text-red-500 mt-4">
            {error}
          </div>
        )}
            {showuser&&(

           <div className="laptop:flex  flex flex-col items-center laptop:flex-row laptop:gap-10 rounded bg-zinc-700 laptop:w-[41vw] w-[96vw] justify-center laptop:p-10 p-3  laptop:mt-0">
           <img src={showuser.avatar_url} alt="ava" className="rounded-full h-[20vh]" />
            <div className="text-white laptop:flex  laptop:text-start items-center text-center  gap-5 laptop:flex-col laptop:items-start justify-center ">
               <p className="text-xl font-extrabold">{showuser.login}</p>   
           <div className="laptop:flex laptop:gap-5 flex-col flex   ">
             <h1 className="font-bold text-xl laptop:text-xl">{`User Id : ${showuser.id}`} </h1>
             <div className=" laptop:flex flex flex-row  gap-10 laptop:gap-10">
             <h1 className="font-bold text-xl laptop:text-xl">{`${showuser.followers} Followers`} </h1>
             <h1 className="font-bold text-xl laptop:text-xl" >{`${showuser.following} Following`}</h1>
            
             </div>
             <h1 className="font-bold text-xl  laptop:text-xl">{`${showuser.public_repos} Repos`}</h1>
             <div>
             <h1 className="font-bold laptop:text-xl">{`Profile created on: ${new Date(showuser.created_at).toLocaleDateString()}`}</h1>
             
             <h1 className="font-bold laptop:text-xl text-amber-600">{` Profile updated on ${new Date(showuser.updated_at).toLocaleDateString()}`}</h1>
             </div>
             <div className="laptop:flex gap-5 flex items-center justify-center laptop:items-start laptop:justify-start">
             <a href={showuser.html_url} target="_blank"><button className="bg-black font-bold p-2 rounded">Go to Profile</button></a>
             <button className="bg-red-600 p-2 rounded font-bold" onClick={handleclr}>Clear</button>
             </div>
              </div>
                  </div>
                  </div>
            )}
            {/* <div><p>API can be exceeded , rate limit exceeded</p></div> */}
           </main>
    </>
    )
}
export default GithubUser