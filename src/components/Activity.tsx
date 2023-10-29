import React, { useState, useContext } from "react";
import { Card, CardBody, CardTitle, Col } from "reactstrap";
import axiosClient from "../apiClients";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthProvider";
import {accountContext} from "../context/AccountContext"

export default function Activity({ activity }: { activity: any }) {
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [isActivity, setIsActivity] = useState(false)
  const navigate = useNavigate();
  const Auth = useAuthContext();
  const [userDetails, setUserDetails] = useContext(accountContext) as any
  const userId = window.localStorage.getItem("userId")

  const handleAddActivity = (activity: any) => {
    if (Auth.isLoggedIn) {
      sendDataToServer(activity.activityName);
      setIsButtonPressed(true);
    } else {
      navigate("/login");
    }
  };

  const sendDataToServer = async (activityName: any) => {
    const response = await axiosClient.post(
      "http://localhost:3000/get-activity", {userId}
    );
    if (response.data.activities.includes(activityName)) {
      setIsActivity(true)
      const activityMassage = document.getElementById(
        "activity-massage"
      ) as HTMLParagraphElement;
      activityMassage.innerHTML =
        "This activity is already in your list of activities";
    } else {
      setIsActivity(false)
      const activityMassage = document.getElementById(
        "activity-massage"
      ) as HTMLParagraphElement;
      activityMassage.innerHTML =
        "Activity added to your active activiities list";

      addActivity(activityName,userDetails);
    }
  };
  const addActivity = async (activityName: any, userDetails:any) => {
    await axiosClient.post("http://localhost:3000/add-activity", {activityName, userDetails});
    const response = await axiosClient.post('http://localhost:3000/getUserAccount', {userId});
    setUserDetails(response.data)
  };

  return (
    <>
      <Col sm={4}>
        <Card
        >
          <CardBody>
            <CardTitle style={{ fontSize: "12px", fontWeight: "bold" }}>
              <h2>{activity.activityName}</h2>
            </CardTitle>
          </CardBody>
          <img
            style={{ height: "300px", width: "300px" }}
            src={activity.activityImage}
            alt=""
          ></img>
          <button
            name="activityName"
            value={activity.activityName}
            id="add-activity"
            onClick={() => handleAddActivity(activity)}
          >
            Add activity
          </button>
          {isButtonPressed && isActivity && <p style={{fontSize:'15px',color:'red'}} id="activity-massage"></p> } 
          {isButtonPressed && !isActivity && <p style={{fontSize:'15px'}} id="activity-massage"></p> } 
        </Card>
      </Col>
    </>
  );
}
