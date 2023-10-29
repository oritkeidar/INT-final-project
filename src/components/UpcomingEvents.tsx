import React, { useContext, useState, useLayoutEffect, useEffect } from "react";
import { accountContext } from "../context/AccountContext";
import axiosClient from "../apiClients";
import "./UpcomingEvents.css";

export default function UpcomingEvents() {
  const [userDetails, setUserDetails] = useContext(accountContext) as any;
  const [allEvents, setAllEvents] = useState([]) as any;
  console.log(userDetails);
  const userId = window.localStorage.getItem("userId");
  const currentDate = new Date();
  const events: any = [];
console.log(userDetails)
 useEffect(()=>{
    setAllEvents(userDetails.events)
  },[userDetails])
console.log(allEvents)
  for (let i = 0; i < allEvents.length; i++) {
    const dateString = allEvents[i].date;
    const dateParts = dateString.split("/"); // Split the string into parts using '/'
    const year = parseInt(dateParts[2], 10); // Parse the year part as an integer
    const month = parseInt(dateParts[0], 10) - 1; // Parse the month part as an integer (subtract 1 because months are zero-based)
    const day = parseInt(dateParts[1], 10); // Parse the day part as an integer

    const hour = parseInt(allEvents[i].hour);
    const dateObject = new Date(year, month, day, hour);
    if (currentDate <= dateObject) {
      events.push(allEvents[i]);
    }
  }

  const sortedUpComingEvents = events.sort(
    (a: any, b: any) => parseInt(a.hour) - parseInt(b.hour)
  );

  const handleDeleteEvent = async (eventId: any) => {
    try{
      const response = await axiosClient.delete(
      `http://localhost:3000/delete-event/${userId}/${eventId}`
    );
    const result = await response.data;
    setUserDetails(result)
  }
  catch{
    console.log('error')
  }
    }  

  return (
    <>
      <table id="upcoming">
        <thead id= "upcoming-title">
          <tr>
            <th>Date</th>
            <th>hour</th>
            <th>activity</th>
            <th>with</th>
          </tr>
        </thead>
        {sortedUpComingEvents.map((event: any, index:any) => (
          <tbody style={{border:'1px solid black'}}>
            <tr key={index} id="upcoming-columns" >
              <td >{event.date}</td>
              <td>{event.hour}</td>
              <td>{event.className}</td>
              <td>{event.instructorName}</td>
              <td>
                <button onClick={()=>handleDeleteEvent(event._id)} style={{ color: "red" }}>
                  Delete event
                </button>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </>
  );
}
