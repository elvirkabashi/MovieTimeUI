import { useEffect, useState } from "react";
import { getUserInfo } from "../utils/Cookies"


function UserProfile() {
    const [userInfo, setUserInfo] = useState();

    useEffect(() => {
        const fetchUserInfo = async () => {
          const user = await getUserInfo();
          setUserInfo(user);
        };
    
        fetchUserInfo();
      }, [userInfo]);
  return (
    <div className="container text-white my-5" style={{maxWidth:'700px'}}>
        <p>UserId: {userInfo && userInfo.userId}</p>
        <h2>UserName: {userInfo && userInfo.userName}</h2>
        <h4>Email: {userInfo && userInfo.email}</h4>
        
    </div>
  )
}

export default UserProfile