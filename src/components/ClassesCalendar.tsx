import React, {useContext, useState, useEffect} from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { accountContext } from '../context/AccountContext';
import "./ClassesCalendar.css"

type event={
title:String,
start:Date,
end:Date
}

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
    const currentDate  = new Date();
    const dayStyleGetter = (date:Date) => {
        // Check if the date is the current date
        const isCurrentDate = moment(date).isSame(currentDate, 'day');
        const currentDateCellClass = isCurrentDate ? 'current-date-cell' : '';
        return {
          className: currentDateCellClass,
        };
      };
    const eightAM = moment().set({ hour: 8, minute: 0, second: 0, millisecond: 0 });
  const ninePM = moment().set({ hour: 22, minute: 0, second: 0, millisecond: 0 });
    const userDetails = useContext(accountContext) as any;
    const [userEvents, setUserEvents] = useState([]) as any;
    let events:event[] = [];
 useEffect(()=>{
    setUserEvents(userDetails[0].events)
 },[])

 const customFormats = {
    dayHeaderFormat: 'dddd, MMMM D, YYYY',
    timeGutterFormat: 'H:mm', 
    eventTimeRangeFormat: ({ start, end} :any) => {
      return `${moment(start).format('H:mm')} - ${moment(end).format('H:mm')}`;
    }};
    for (let i=0; i<userEvents.length; i++){
        const [month, day, year] = userEvents[i].date.split('/').map(Number);
        const [hour, minute] = userEvents[i].hour.split(':').map(Number);
        const dateObject = new Date(year, month - 1, day, hour, minute, 0);
    
events.push({
            title: `${userEvents[i].className} with ${userEvents[i].instructorName}`,
            start:dateObject,
            end:new Date(dateObject.getTime() + 60 * 60 * 1000)
        })
   
    }

  return (
    <div>
      
      <Calendar
        localizer={localizer}
         events={events}
        startAccessor="start"
        endAccessor="end"
        
        style={{ height: 500 }}
        
        views={['month', 'week', 'day']}
        dayPropGetter={dayStyleGetter}
        min={eightAM.toDate()} // Convert moment object to Date
        max={ninePM.toDate()} // Convert moment object to Date
        formats={customFormats} // Apply custom time formats
        
        step={60}
        timeslots={1}
      />
    </div>
  );
    }

export default MyCalendar;