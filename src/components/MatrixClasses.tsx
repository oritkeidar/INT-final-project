import React, { useState, useEffect, useLayoutEffect, useContext } from "react";
import { accountContext } from "../context/AccountContext";
import axiosClient from "../apiClients";
import "./MatrixClasses.css";

interface SportClass {
  day: string;
  hour: string;
  className: string;
  classInstructor: string;
}
const sportClasses: SportClass[] = [
  {
    day: "Sun",
    hour: "8:00",
    className: "Yoga",
    classInstructor: "Shai Danon",
  },
  {
    day: "Sun",
    hour: "9:00",
    className: "Pilates",
    classInstructor: "Shiri Shavit",
  },
  {
    day: "Sun",
    hour: "10:00",
    className: "Kickbox",
    classInstructor: "Nir Azuri",
  },
  {
    day: "Sun",
    hour: "11:00",
    className: "Swimming",
    classInstructor: "Ziv Barabi",
  },
  {
    day: "Sun",
    hour: "12:00",
    className: "Spinning",
    classInstructor: "Bar Shimhoni",
  },
  {
    day: "Sun",
    hour: "13:00",
    className: "Body Shape",
    classInstructor: "Galit Cohen",
  },
  {
    day: "Sun",
    hour: "14:00",
    className: "Pilates Equipment",
    classInstructor: "Danit Aharon",
  },
  {
    day: "Sun",
    hour: "15:00",
    className: "Aerobic Dance",
    classInstructor: "Dana Ozeri",
  },
  {
    day: "Sun",
    hour: "16:00",
    className: "Body Attack",
    classInstructor: "Dana Ozeri",
  },
  {
    day: "Sun",
    hour: "17:00",
    className: "Body Pump",
    classInstructor: "Meir Ezra",
  },
  {
    day: "Sun",
    hour: "18:00",
    className: "Belly Dance",
    classInstructor: "Galit Cohen",
  },
  {
    day: "Sun",
    hour: "19:00",
    className: "Holistic Stratching",
    classInstructor: "Saar Kohavi",
  },
  {
    day: "Sun",
    hour: "20:00",
    className: "Shaping & Toning",
    classInstructor: "Saar Kohavi",
  },
  {
    day: "Sun",
    hour: "21:00",
    className: "TRX",
    classInstructor: "Shai Danon",
  },
  {
    day: "Mon",
    hour: "8:00",
    className: "Core Fitness",
    classInstructor: "Ziv Barabi",
  },
  {
    day: "Mon",
    hour: "9:00",
    className: "Dynamic Shape",
    classInstructor: "Guy Shemesh",
  },
  {
    day: "Mon",
    hour: "10:00",
    className: "Fit Ball",
    classInstructor: "Danit Aharon",
  },
  {
    day: "Mon",
    hour: "11:00",
    className: "Pilates Equipment",
    classInstructor: "Danit Aharon",
  },
  {
    day: "Mon",
    hour: "12:00",
    className: "Spinning",
    classInstructor: "Meir Ezra",
  },
  {
    day: "Mon",
    hour: "13:00",
    className: "Yoga",
    classInstructor: "Shiri Shavit",
  },
  {
    day: "Mon",
    hour: "14:00",
    className: "Shaping & Toning",
    classInstructor: "Dana Ozeri",
  },
  {
    day: "Mon",
    hour: "15:00",
    className: "Body Combat",
    classInstructor: "Meir Ezra",
  },
  {
    day: "Mon",
    hour: "16:00",
    className: "Kickbox",
    classInstructor: "Hanan Zehavi",
  },
  { day: "Mon", hour: "17:00", className: "TRX", classInstructor: "Nir Azuri" },
  {
    day: "Mon",
    hour: "18:00",
    className: "Belly Dance",
    classInstructor: "Galit Cohen",
  },
  {
    day: "Mon",
    hour: "19:00",
    className: "Aerobic Dance",
    classInstructor: "Shiri Shavit",
  },
  {
    day: "Mon",
    hour: "20:00",
    className: "Swimming",
    classInstructor: "Hanan Zehavi",
  },
  {
    day: "Mon",
    hour: "21:00",
    className: "Pilates",
    classInstructor: "Shiri Shavit",
  },
  {
    day: "Tue",
    hour: "8:00",
    className: "Yoga",
    classInstructor: "Shai Danon",
  },
  {
    day: "Tue",
    hour: "9:00",
    className: "Body Shape",
    classInstructor: "Bar Shimhon",
  },
  {
    day: "Tue",
    hour: "10:00",
    className: "Fit Ball",
    classInstructor: "Danit Aharon",
  },
  {
    day: "Tue",
    hour: "11:00",
    className: "Holistic Stratching",
    classInstructor: "Saar Kohavi",
  },
  {
    day: "Tue",
    hour: "12:00",
    className: "Spinning",
    classInstructor: "Guy Shemesh",
  },
  {
    day: "Tue",
    hour: "13:00",
    className: "Shaping & Toning",
    classInstructor: "Dana Ozeri",
  },
  {
    day: "Tue",
    hour: "14:00",
    className: "Body Combat",
    classInstructor: "Guy Shemesh",
  },
  {
    day: "Tue",
    hour: "15:00",
    className: "Aerobic Dance",
    classInstructor: "Shiri Shavit",
  },
  { day: "Tue", hour: "16:00", className: "TRX", classInstructor: "Nir Azuri" },
  {
    day: "Tue",
    hour: "17:00",
    className: "Kickbox",
    classInstructor: "Nir Azuri",
  },
  {
    day: "Tue",
    hour: "18:00",
    className: "Body Attack",
    classInstructor: "Meir Ezra",
  },
  {
    day: "Tue",
    hour: "19:00",
    className: "Spinning",
    classInstructor: "Guy Shemesh",
  },
  {
    day: "Tue",
    hour: "20:00",
    className: "Zumba",
    classInstructor: "Dana Ozeri",
  },
  {
    day: "Tue",
    hour: "21:00",
    className: "Belly Dance",
    classInstructor: "Galit Cohen",
  },
  {
    day: "Wed",
    hour: "8:00",
    className: "Swimming",
    classInstructor: "Galit Cohen",
  },
  {
    day: "Wed",
    hour: "9:00",
    className: "Fit Ball",
    classInstructor: "Danit Aharon",
  },
  {
    day: "Wed",
    hour: "10:00",
    className: "Body Shape",
    classInstructor: "Galit Cohen",
  },
  {
    day: "Wed",
    hour: "11:00",
    className: "Body Combat",
    classInstructor: "Meir Ezra",
  },
  {
    day: "Wed",
    hour: "12:00",
    className: "Dynamic Shape",
    classInstructor: "Guy Shemesh",
  },
  {
    day: "Wed",
    hour: "13:00",
    className: "Pilates",
    classInstructor: "Shiri Shavit",
  },
  {
    day: "Wed",
    hour: "14:00",
    className: "Shaping & Toning",
    classInstructor: "Dana Ozeri",
  },
  {
    day: "Wed",
    hour: "15:00",
    className: "Belly Dance",
    classInstructor: "Galit Cohen",
  },
  {
    day: "Wed",
    hour: "16:00",
    className: "Aerobic Dance",
    classInstructor: "Shiri Shavit",
  },
  {
    day: "Wed",
    hour: "17:00",
    className: "Body Pump",
    classInstructor: "Guy Shemesh",
  },
  {
    day: "Wed",
    hour: "18:00",
    className: "Zumba",
    classInstructor: "Danit Aharon",
  },
  {
    day: "Wed",
    hour: "19:00",
    className: "Pilates Equipment",
    classInstructor: "Danit Aharon",
  },
  {
    day: "Wed",
    hour: "20:00",
    className: "TRX",
    classInstructor: "Shai Danon",
  },
  {
    day: "Wed",
    hour: "21:00",
    className: "Holistic Stratching",
    classInstructor: "Saar Kohavi",
  },
  { day: "Thu", hour: "8:00", className: "TRX", classInstructor: "Shai Danon" },
  {
    day: "Thu",
    hour: "9:00",
    className: "Kickbox",
    classInstructor: "Hanan Zehavi",
  },
  {
    day: "Thu",
    hour: "10:00",
    className: "Body Combat",
    classInstructor: "Guy Shemesh",
  },
  {
    day: "Thu",
    hour: "11:00",
    className: "Swimming",
    classInstructor: "Ziv Barabi",
  },
  {
    day: "Thu",
    hour: "12:00",
    className: "Zumba",
    classInstructor: "Dana Ozeri",
  },
  {
    day: "Thu",
    hour: "13:00",
    className: "Pilates Equipment",
    classInstructor: "Danit Aharon",
  },
  {
    day: "Thu",
    hour: "14:00",
    className: "Body Attack",
    classInstructor: "Meir Ezra",
  },
  {
    day: "Thu",
    hour: "15:00",
    className: "Pilates",
    classInstructor: "Shiri Shavit",
  },
  {
    day: "Thu",
    hour: "16:00",
    className: "Yoga",
    classInstructor: "Shiri Shavit",
  },
  {
    day: "Thu",
    hour: "17:00",
    className: "Body Pump",
    classInstructor: "Guy Shemesh",
  },
  {
    day: "Thu",
    hour: "18:00",
    className: "Core Fitness",
    classInstructor: "Ziv Barabi",
  },
  {
    day: "Thu",
    hour: "19:00",
    className: "Aerobic Dance",
    classInstructor: "Dana Ozeri",
  },
  {
    day: "Thu",
    hour: "20:00",
    className: "Shaping & Toning",
    classInstructor: "Dana Ozeri",
  },
  {
    day: "Thu",
    hour: "21:00",
    className: "Spinning",
    classInstructor: "Meir Ezra",
  },
  {
    day: "Fri",
    hour: "8:00",
    className: "Holistic Stratching",
    classInstructor: "Saar Kohavi",
  },
  {
    day: "Fri",
    hour: "8:00",
    className: "Body Shape",
    classInstructor: "Guy Shemesh",
  },
  {
    day: "Fri",
    hour: "9:00",
    className: "Dynamic Shape",
    classInstructor: "Guy Shemesh",
  },
  {
    day: "Fri",
    hour: "10:00",
    className: "Yoga",
    classInstructor: "Shiri Shavit",
  },
  {
    day: "Fri",
    hour: "11:00",
    className: "Zumba",
    classInstructor: "Dana Ozeri",
  },
  {
    day: "Fri",
    hour: "12:00",
    className: "Pilates",
    classInstructor: "Shai Danon",
  },
  {
    day: "Fri",
    hour: "13:00",
    className: "Belly Dance",
    classInstructor: "Galit Cohen",
  },
  {
    day: "Fri",
    hour: "14:00",
    className: "Pilates Equipment",
    classInstructor: "Danit Aharon",
  },
  {
    day: "Fri",
    hour: "15:00",
    className: "Kickbox",
    classInstructor: "Nir Azuri",
  },
  {
    day: "Fri",
    hour: "16:00",
    className: "Aerobic Dance",
    classInstructor: "Shiri Shavit",
  },
];

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
const hoursOfDay = Array.from({ length: 14 }, (_, i) => i + 8);

const MatrixTable: React.FC = () => {
  const [messages, setMessages] = useState<{ [key: string]: string | null }>(
    {}
  );

  const currentDate = new Date();
  const currentDay = new Date().toLocaleDateString("en-US", {
    weekday: "short",
  });
  const currentDayIndex = currentDate.getDay(); // 0 for Sunday, 1 for Monday, and so on
  const nextSundayDate = new Date(currentDate);
  if (currentDayIndex !== 0) {
    nextSundayDate.setDate(currentDate.getDate() + (7 - currentDayIndex));
  }
  const initialDates: String[] = [];
  const [userDetails, setUserDetails] = useContext(accountContext) as any;
  console.log(userDetails)

  // Calculate initial dates for the table
  for (let i = 0; i < currentDayIndex; i++) {
    const date = new Date(nextSundayDate);
    date.setDate(nextSundayDate.getDate() + i);
    initialDates.push(date.toLocaleDateString("en-US"));
  }

  let j = 0;
  for (let i = currentDayIndex; i < 6; i++) {
    const date = new Date();
    date.setDate(date.getDate() + j);
    initialDates.push(date.toLocaleDateString("en-US"));
    j = j + 1;
  }

  const [dates, setDates] = useState<String[]>(initialDates) as any;

  useEffect(() => {
    setDates(initialDates);
  }, []);

  let include = false;

  const handleAddEvent = async (
    data: SportClass,
    date: string,
    cellKey: string
  ) => {
    // Send data to the server
    const userId = window.localStorage.getItem("userId");
    const formatDate = (dateString: string): string => {
      const date = new Date(dateString);
      const options: any = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      };
      return date.toLocaleDateString("en-US", options);
    };
    let eventData = {
      date: formatDate(date),
      hour: data.hour,
      className: data.className,
      instructorName: data.classInstructor,
    };

    const currentDate = new Date();
    const dayNow = currentDate.getDay();
    let day = data.day;
    let dayOfEvent = 0;
    if (!userDetails.activities.includes(data.className)) {
      const messageText =
        "You are not allowed to book this class. Add activity";
      setMessages({ ...messages, [cellKey]: messageText });
    }
    if (userDetails.activities.includes(data.className)) {
      if (day === "Sun") dayOfEvent = 0;
      else if (day === "Mon") dayOfEvent = 1;
      else if (day === "Tue") dayOfEvent = 2;
      else if (day === "Wed") dayOfEvent = 3;
      else if (day === "Thu") dayOfEvent = 4;
      else dayOfEvent = 5;
      if (
        dayOfEvent === dayNow &&
        parseInt(data.hour, 10) < currentDate.getHours()
      ) {
        const messageText = "Event time has passed";
        setMessages({ ...messages, [cellKey]: messageText });
      } else if (
        (userDetails.activities.includes(data.className) &&
          dayOfEvent !== dayNow) ||
        (userDetails.activities.includes(data.className) &&
          dayOfEvent === dayNow &&
          parseInt(data.hour, 10) > currentDate.getHours())
      ) {
        for (let i = 0; i < userDetails.events.length; i++) {
          if (
            userDetails.events[i].date === eventData.date &&
            userDetails.events[i].hour === eventData.hour &&
            userDetails.events[i].className === eventData.className &&
            userDetails.events[i].instructorName === eventData.instructorName
          ) {
            include = true;
          }
        }
        if (include) {
          const messageText = "You have booked for this event already";
          setMessages({ ...messages, [cellKey]: messageText });
        } else {
           await axiosClient.post(
            "http://localhost:3000/add-event",
            { eventData, userId }
          );

          const response =  await axiosClient.post(
            "http://localhost:3000/getUserAccount",
            { userId }
          );
          const messageText = `Booked event: ${date}, ${data.className} with ${data.classInstructor}`;
          setMessages({ ...messages, [cellKey]: messageText });
          const dataFromServer = await response.data;
          setUserDetails(dataFromServer);
        }
      }
    }
  };

  return (
    <div className="classes-table">
      <table>
        <thead id = 'table-head'>
          <tr >
            <th style={{width:'40px'}} >Time</th>
            {daysOfWeek.map((day, index) => (
              <th
                key={index}
                style={{
                  backgroundColor: day === currentDay ? "yellow" : "black",
                  color: day === currentDay ? "black" : "white",
                }}
              >
                {day}
                <br />
                {dates[index]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hoursOfDay.map((hour) => (
            <tr
              key={hour}
              style={{width:'50px',
                backgroundColor:
                  hour % 2 === 0 ? "lightslategray" : "lightgrey",
              }}
            >
              <th>{`${hour}:00`}</th>
              {daysOfWeek.map((day, dayIndex) => {
                const classData = sportClasses.find(
                  (item) => item.day === day && item.hour === `${hour}:00`
                );
                const cellKey = `${day}-${hour}`;
                return (
                  <td key={cellKey}>
                    {classData && (
                      <div>
                        <p>
                          {classData.className} - {classData.classInstructor}
                        </p>
                        <button
                          id="book-event"
                          onClick={() =>
                            handleAddEvent(classData, dates[dayIndex], cellKey)
                          }
                        >
                          Add Event
                        </button>
                        {messages[cellKey] && (
                          <div className="message">{messages[cellKey]}</div>
                        )}
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MatrixTable;
