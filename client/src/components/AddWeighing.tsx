import React, { useState, useContext } from "react";
import DatePicker from "react-datepicker";
// import { useAuthContext } from "../context/AuthProvider";
import { accountContext } from "../context/AccountContext";
import "./AddWeighing.css";
import "react-datepicker/dist/react-datepicker.css";
import axiosClient from "../apiClients";

type Weighing = {
  weighingDate: String;
  weight: Number;
  fatPercentage: Number;
};

export default function AddWeighing() {
  const [userDetails, setUserDetails] = useContext(accountContext) as any;
  const [selectedDate, setSelectedDate] = useState<Date>() as any;
  const [weight, setWeight] = useState<number>(70);
  const [fat, setFat] = useState<number>(15) as any;

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
  };
  const handleKgChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Ensure that the entered value is a number and update the weight state
    const newWeight = parseFloat(event.target.value);
    if (!isNaN(newWeight)) {
      setWeight(newWeight);
    }
  };

  const handleFatChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Ensure that the entered value is a number and update the fatPercentage state
    const newFatPercentage = parseFloat(event.target.value);
    if (!isNaN(newFatPercentage)) {
      setFat(newFatPercentage);
    }
  };

  const handleAddWeight = async () => {
    const month = selectedDate.getMonth() + 1;
    const day = selectedDate.getDate();
    const year = selectedDate.getFullYear();

    const formattedDate = `${month}/${day}/${year}`;

    const weighing: Weighing = {
      weighingDate: formattedDate,
      weight: weight,
      fatPercentage: fat,
    };
    const id = userDetails._id;
    await axiosClient
      .post(`http://localhost:3000/add-weight/${id}`, weighing)
      .then((response) => {
        const userWeighings = response.data.weighings;
        if (userWeighings) {
          setSelectedDate("");
         
        } else {
          console.error("Failed to add data to the server.");
        }
      })
      .catch((error) => {
        console.error(error);
        console.log("Error sending data to the server:" + error);
      });
      //  const data = await axiosClient.post('http://localhost:3000/getUserAccount', {id})
      //  setUserDetails(data.data)
      //  console.log(userDetails)
  };

  return (
    <div className="add-weighing">
      <DatePicker
        id="date-picker"
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="MM/dd/yyyy"
        placeholderText="Weighing date"
        required
      />
      <label>
        Enter your weight (Kg):
        <input
          id="weight-input"
          type="number"
          value={weight}
          onChange={handleKgChange}
          step="0.1" // Allow decimal values if needed
        />
      </label>
      <br />

      <label>
        Enter your fat percentage:
        <input
          id="weight-input"
          type="number"
          value={fat}
          onChange={handleFatChange}
          step="0.1" // Allow decimal values if needed
        />
        %
      </label>
      <br />
      <button onClick={handleAddWeight}>Add</button>
    </div>
  );
}
