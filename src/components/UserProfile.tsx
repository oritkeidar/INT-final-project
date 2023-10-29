import React, { useContext, useEffect, useState} from "react";
import { Button, CardGroup, Container, Row, Col } from "reactstrap";
import { accountContext } from "../context/AccountContext";
import { useNavigate } from "react-router-dom";
import axiosClient from "../apiClients";
import './UserProfile.css'

export default function UserProfile() {
  const navigate = useNavigate();
  const [accountData,setAccountData] = useContext(accountContext) as any;
  const [userDetails, setUserDetails] = useState({}) as any;
  
    async function handleRemoveImage(){
      const userId = window.localStorage.getItem('userId')
      const response= await axiosClient.post("http://localhost:3000/delete-user-image", {userId})
      const newData = await response.data;
      setAccountData(newData)
    }

useEffect(()=>{
  setUserDetails(accountData)
},[accountData])

console.log(accountData)
console.log(userDetails)

const activities:any = accountData.activities
console.log(activities)
    const commaSeparatedActivities = activities.join(", ");

  return (
    <>
      <div id="user-details">
        <CardGroup>
          <Row>
<Col md={6}>
<img id= "profile-picture" style={{height:'350px', width:'350px'}}
src={`http://localhost:3000/images/${userDetails.image}`} alt=""></img>
          
  </Col>        
<Col md={6}>

{userDetails.image && <button id="delete-image" onClick={handleRemoveImage}>Delete profile picture</button>}
           <div className="details">
            <h3>first name: <span>{userDetails.firstName}</span></h3>
            <h3>last name: <span >{userDetails.lastName}</span></h3> 
            <h3>email: <span >{userDetails.userName}</span></h3> 
            <h3>Address: <span >{userDetails.address}</span></h3>
            <h3 id="activities-list">activities:<span >{commaSeparatedActivities}</span></h3>
             </div> 
            </Col>
          </Row>
        </CardGroup>
      </div>
      <button id="update-details" 
      onClick={()=>navigate('/update-user')}>
        Update details
      </button>

    </>
  );
}