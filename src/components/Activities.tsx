import React, { useEffect, useState } from "react";
import { CardGroup, Row, Input } from "reactstrap";
import Activity from "./Activity";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import "./Activities.css";


export default function Activities() {
  const [activitiesData, setActivitiesData] = useState([{}]);
  const [inputText, setInputText] = useState("");
  const [filteredData, setFilteredData] = useState([{}]);


  async function getActivitiesFromServer() {
    //get the activities list from the server
    const response = await axios.get(`http://localhost:3000/getActivities/`, {
      method: "GET",
      withCredentials: true,
    });

    const activities =await response.data;
    //adding the posts to the context
    if (activities) {
      setActivitiesData(activities); //setting the state
    }
  }

  useEffect(() => {
    getActivitiesFromServer();
  }, []);

 
  // sort activities by activiy name

  activitiesData.sort((a: any, b: any) =>
    a.activityName > b.activityName ? 1 : -1
  );

  const handleInputChange = (e: any) => {
    const text = e.target.value;
    setInputText(text);
    const filtered = activitiesData.filter((item: any) =>
      item.activityName.toLowerCase().includes(inputText.toLowerCase())
    );
    setFilteredData(filtered);
    if (!inputText) setFilteredData(activitiesData);
  };


  return (
    <>
      <Input style={{
          height: "35px",
          width: "500px",
        
          border: "0.5px solid gray",
          marginTop: "150px"
        }}
        type="text"
        placeholder="Search for activity"
        value={inputText}
        onChange={handleInputChange}
      ></Input>

      <CardGroup className="row" style={{margin:'0px'}}>
        <Row>
          {!inputText
            ? activitiesData.map((activity: any, index:any) => (
                <ul key={index}>
                  <li key={activity.activityName}>
                    <Activity  activity={activity} />
                  </li>
                </ul>
              ))
            : filteredData.map((activity: any, index:any) => (
                <ul>
                  <li key={index}>
                    <Activity  activity={activity} />
                  </li>
                </ul>
              ))}
        </Row>
      </CardGroup>
   
    </>
  );
}
