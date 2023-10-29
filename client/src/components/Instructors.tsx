import React from 'react'
import instructors from '../context/InstructorsList'
import { CardGroup, Row } from 'reactstrap'
import { v4 as uuidv4 } from "uuid";
import './Instructors.css'

export default function Instructors() {

  
  return (
    <div className='row'>
       <CardGroup>
          <Row>
 {instructors.map((instructor) => {
        return <div key={uuidv4()}>
           <img style={{height:'300px', width:'300px'}} src={instructor.image} alt=''></img> 
           <h4>{instructor.instructorName}</h4>
            <p>{instructor.phone}</p>
            <p>{instructor.activities.join(", ")}</p>

        </div>
         })}
          </Row>
     
          </CardGroup>
        
     
 </div>
  )}
