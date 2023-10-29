import React from "react";
import logo from "../images/fitness.png"
import "./Home.css";

export default function Home() {
  return (
    <div className="home-container">
      <header className="App-Header">
        <img className="App-logo" src={logo} alt="" />
        <p className="App-data">Wealth health world ! ! !</p>
      </header>
      <p className="final">
        Our company has a cross-continental reputation. We have branches
        throughout Europe and Asia and will soon launch the first branch in
        California, USA. Join us today to achieve your goal !
      </p>
      <img className="background-image"
            src="https://pilates.kassai.co.il/app/uploads/2023/05/PILATIS-283-scaled.jpg"
            alt=""
          ></img>
      <div className="element">
        <div className="left-container">
          <p className="start">
            It's time you start take a good care of yourself
          </p>
          <h2>You are not turning any younger!! </h2>
          <h4 style={{ color: "red" }}>
            Join us now to a world full of <b>Fun! Fit! Energy!</b>
          </h4>
          
          <p>You can work out individual or with groups</p>
          <p>
            You can customize the workout to your level and set workout plan
            where you can rise your level via progress
          </p>
          
        </div>
      </div>

      <div className="element">
        <div className="right-container">
          <img
            style={{ height: "400px", width: "600px", alignItems: "left" }}
            src="https://www.acubody.net/wp-content/uploads/2021/09/Fitness-Day.jpg"
            alt=""
          ></img>
          <p>
            Just choose the right excercise for you. It's simple as that. In one
            place you get all the exercise types.
          </p>
          <img
            style={{ height: "485px", width: "600px" }}
            src="https://media.istockphoto.com/id/827891858/photo/hip-hop-dancers-having-training.jpg?s=612x612&w=0&k=20&c=tfUs1-mhSJruyIqsiAzQdrGlRejw6yj4VkQVfWVGZEU="
            alt="s"
          ></img>
          <p>
            No matter what is the reason you want to exercise, whether to lose
            weight, for health or just for fun, you've come to the right place
          </p>
         
          <img
            style={{ height: "500px", width: "600px" }}
            src="https://dta0yqvfnusiq.cloudfront.net/burns43043213/2019/10/Kickboxing-is-the-Perfect-Full-Body-Workout-5db98bcbde358.jpg"
            alt=""
          ></img>
          <p>
            you are not yet part of our team of champions??? it's time to
            recalculate your path!
          </p>

           <img
        style={{ height: "450px", width: "600px" }}
        src="https://commondatastorage.googleapis.com/offeringtree.com/production/uploads/graphic/graphic/ae779ecf-f2af-407c-b443-ecf8f296b132/half_size_1686733234970_offering_image.jpg?1686733248"
        alt=""
      ></img>
        </div>
      </div>

      
    </div>
    
  );
}
