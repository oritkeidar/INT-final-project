import React, { useContext, useEffect, useState } from "react";
import { accountContext } from "../context/AccountContext";
import { useNavigate } from "react-router-dom";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import UpcomingEvents from "./UpcomingEvents";
import "./UserAccount.css";
import "react-datepicker/dist/react-datepicker.css";
import axiosClient from "../apiClients";
import MatrixClasses from "../components/MatrixClasses";
import MyCalendar from "./ClassesCalendar";
import AddWeighing from "./AddWeighing";
// import 'bootstrap/dist/css/bootstrap.min.css';

Chart.register(CategoryScale);

export default function UserAccount() {
  const accountData = useContext(accountContext) as any;
  const [userActivities, setUserActivities] = useState([]);
  const [isActivitiesEmpty, setIsActivitiesEmpty] = useState(false);
  const [isShowClassesTable, setIsShowClassesTable] = useState(false);
  const [isShowUpcomingEvents, setIsShowUpcomingEvents] = useState(false);
  const [isOpenCalendar, setIsOpenCalendar] = useState(false);
  const [isAddWeighingPressed, setIsAddWeighingPressed] = useState(false);
  const [userWeights, setUserWeights] = useState([]) as any;
  const userId = window.localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    
    setUserActivities(accountData[0].activities);
    if (accountData[0].activities.length===0){
      setIsActivitiesEmpty(true)
    }
  }, [accountData]);


  useEffect(() => {
    setUserWeights(accountData[0].weighings);
  }, [accountData]);

  useEffect(() => {
    setUserWeights({
      labels: userWeights.map((data: any) => data.weighingData),
      datasets: [
        {
          label: "Weights",
          data: userWeights.map((data: any) => data.weight),
          backgroundColor: [
            "rgba(75,192,192,1)",
            "#50AF95",
            "#f3ba2f",
            "#2a71d0",
          ],
          borderColor: "black",
          borderWidth: 2,
        },
      ],
    });
  }, []);


  const handleDeleteActivity = async (activityName: any) => {
    await axiosClient.post("http://localhost:3000/delete-activity", {
      userId,
      activityName,
    });

    const response = await axiosClient.post(
      "http://localhost:3000/getUserAccount",
      { userId }
    );
    const user = response.data;
      setUserActivities(user.activities);
        if (user.activities.length===0){
      setIsActivitiesEmpty(true)
        }
  

  
  };

  const handleClassesVisabilty = () => {
    if (!isShowClassesTable) setIsShowClassesTable(true);
    else {
      setIsShowClassesTable(false);
    }
  };

  const handelUpComingEvents = () => {
    if (!isShowUpcomingEvents) {
      setIsShowUpcomingEvents(true);
    } else {
      setIsShowUpcomingEvents(false);
    }
  };

  const handleOpenCalendar = () => {
    if (!isOpenCalendar) {
      setIsOpenCalendar(true);
    } else {
      setIsOpenCalendar(false);
    }
  };
  const handleButtonPressed = () => {
    if (!isAddWeighingPressed) {
      setIsAddWeighingPressed(true);
    } else setIsAddWeighingPressed(false);
  };

  return (
    <>
      <div id="container">
        {isActivitiesEmpty && <p id="empty">Your activities list is empty</p>}
        {!isActivitiesEmpty && (
          <ul id="user-activities-list">
            <p style={{ fontWeight: "bold", fontSize: "20px" }}>
              You have signed in for the activities below:
            </p>
            {userActivities.map((item: any) => (
              <li key={item}>
                {item}
                <button
                  onClick={() => handleDeleteActivity(item)}
                  id="delete-activity"
                >
                  Delete activity
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button id="add-more-activities" onClick={() => navigate("/activities")}>
        Add activity
      </button>
      {!isShowClassesTable ? (
        <button id="Classes-system" onClick={handleClassesVisabilty}>
          Show weekly classes system
        </button>
      ) : (
        <button id="Classes-system" onClick={handleClassesVisabilty}>
          Hide weekly classes system
        </button>
      )}

      {isShowClassesTable ? <MatrixClasses /> : ""}

      {!isShowUpcomingEvents ? (
        <button id="upcoming-events" onClick={handelUpComingEvents}>
          Upcoming events
        </button>
      ) : (
        <button id="upcoming-events" onClick={handelUpComingEvents}>
          Hide upcoming events
        </button>
      )}
      {isShowUpcomingEvents ? <UpcomingEvents /> : ""}

      {!isOpenCalendar ? (
        <button id="calendar" onClick={handleOpenCalendar}>
          Open calendar
        </button>
      ) : (
        <button id="calendar" onClick={handleOpenCalendar}>
          Close calendar
        </button>
      )}
      {isOpenCalendar ? <MyCalendar /> : ""}
      <button id="Add-weighing" onClick={handleButtonPressed}>
        Add weighing
      </button>
      {isAddWeighingPressed ? <AddWeighing /> : ""}
      <button
        id="weights-line-chart"
        onClick={() => navigate("/weights-chart")}
      >
        Show Weights trend line chart
      </button>
    </>
  );
}
