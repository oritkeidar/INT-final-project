import React from 'react'
import { Link } from 'react-router-dom'
import './Contacts.css'

export default function Contacts() {
  return (
    <div className='contacts'>
      <h4>Email: info@wealth-health.co.il</h4>
      <h4>Phone: 03-7392589</h4>
      <h4>Address: Bugrashov 84, Tel Aviv</h4>
      <h2>Visit us on website :<Link to={""}>www.wealth-health.co.il</Link></h2>
    </div>
  )
}
