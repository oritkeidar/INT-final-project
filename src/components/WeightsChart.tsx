import React, {useContext, useState} from 'react'
import { accountContext } from '../context/AccountContext'
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import WeightsLineChart from './WeightsLineChart'
import './WeightsChart.css'

Chart.register(CategoryScale);

export default function WeightsChart() {
    const userDetails = useContext(accountContext) as any;
    console.log(userDetails)
    const [userWeights, setUserWeights] = useState({
        labels: userDetails[0].weighings.map((data:any) => data.weighingDate), 
        datasets: [{
             label: "Weights",
        data: userDetails[0].weighings.map((data:any) => data.weight),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0"
        ],
        borderColor: "black",
        borderWidth: 2
      }
    ]
        }) as any;

  return (
    <div className='weights-chart'>
        <WeightsLineChart chartData={userWeights}/>
    </div>
  )
}
