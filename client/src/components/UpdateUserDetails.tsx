import React, { useContext, useState, useEffect } from "react";
import { Form, Input, Button, CardGroup, Container, Row } from "reactstrap";
import { v4 as uuidv4 } from "uuid";
import { accountContext } from "../context/AccountContext";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../apiClients";
import UserAccount from "./UserAccount";

export default function UpdateUserDetails() {
  const navigate = useNavigate();
  const [accountData, setAccountData]= useContext(accountContext) as any;
  const [userDetails, setUserDetails] = useState({}) as any
  const [image, setImage] = useState() as any;
  const userId= window.localStorage.getItem("userId")

  function uploadImage(event: any) {
    setImage(event.target.files[0]);
    console.log(image);
  }

  async function updateDetails(event: any)  {
    event.preventDefault()
    // const id = window.localStorage.getItem("userId")
    const data = new FormData();
    data.append("image", image);
    data.append("firstName", event.target.firstName.value);
    data.append("lastName", event.target.lastName.value);
    data.append("email", event.target.email.value);
    data.append("address", event.target.address.value);
    

    await axiosClient
      .post(`http://localhost:3000/update-user/${userDetails._id}`, data);
      const response =await axiosClient.post("http://localhost:3000/getUserAccount", {userId})
const datadb = await response.data
console.log(datadb)
      setAccountData(datadb)
       navigate('/getUserProfile')
  
  }
 useEffect(()=>{
  setUserDetails(accountData)
 },[accountData])

  return (
    <>
      <Container className="d-flex align-items-center justify-content-center">
        <Form
          className="container"
          style={{
            width: "250px",
            height: "300px",
            alignItems: "stretch",
            marginLeft: "630px",
            marginTop: "200px",
            justifyContent: "space-between",
          }}
          // ref={formElenemt}
          onSubmit={updateDetails}
        >
          <Input type="file" name="image" multiple onChange={uploadImage} />

          <h4>
            First name: {" "}
            <Input
              id="firstName"
              type="text"
              name="firstName"
              placeholder={userDetails.firstName}
            />
          </h4>
          <h4>
            Last name: {" "}
            <Input
              id="lastName"
              type="text"
              name="lastName"
              placeholder={userDetails.lastName}
            />
          </h4>
          <h4>
            Your Email: {" "}
            <Input
              id="userName"
              type="text"
              name="email"
              placeholder={userDetails.userName}
            />
          </h4>
          <h4>
            Your address: {" "}
            <Input
              id="address"
              type="text"
              name="address"
              placeholder={userDetails.address}
            />
          </h4>

          <Button
            style={{
              height: "30px",
              backgroundColor: "#80e24f",
              fontWeight: "bold",
            }}
            type="submit"
          >
            Update details
          </Button>
        </Form>
      </Container>
    </>
  );
}
