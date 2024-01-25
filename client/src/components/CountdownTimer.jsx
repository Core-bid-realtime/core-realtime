import React, { useEffect, useState } from "react";
import ConfettiExplosion from "react-confetti-explosion";
import { getTimeLimit } from "../store/appSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CountdownTimer = ({ productId, onTimerExpired }) => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let { timeLimit, loadingTimeLimit } = useSelector(
    (state) => state.appReducer
  );

  // State to control the visibility of ConfettiExplosion
  const [showConfetti, setShowConfetti] = useState(false);

  async function chooseTheWinner() {
    try {
      let link = import.meta.env.VITE_BASE_URL + `/products/${productId}`;
      await axios({
        method: "post",
        url: link,
        headers: {
          Authorization: "Bearer " + localStorage.access_token,
        },
      });
      // Navigate back to a specific page after 5 seconds
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    dispatch(getTimeLimit(productId));
  }, []);

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const limitTimeMillis = new Date(timeLimit.timeLimit).getTime();
    const difference = limitTimeMillis - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timerInterval = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      if (
        newTimeLeft.days === 0 &&
        newTimeLeft.hours === 0 &&
        newTimeLeft.minutes === 0 &&
        newTimeLeft.seconds === 0
      ) {
        // Use react-confetti-explosion instead of Swal.fire
        // Swal.fire({
        //   icon: "info",
        //   title: "Auction has Closed",
        //   text: "The auction has closed",
        // });
        setShowConfetti(true); // Set showConfetti to true when the auction closes
        chooseTheWinner();
        clearInterval(timerInterval);
      }
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, [onTimerExpired, timeLimit]);

  // Timer to hide ConfettiExplosion and navigate after 10 seconds
  useEffect(() => {
    if (showConfetti) {
      const confettiTimer = setTimeout(() => {
        setShowConfetti(false);
        navigate("/");
      }, 3000);

      return () => {
        clearTimeout(confettiTimer);
      };
    }
  }, [showConfetti]);

  return (
    <>
      {loadingTimeLimit ? (
        <h2 className="font-bold flex justify-center font-serif mb-7 text-2xl text-primary-500">
          Loading...
        </h2>
      ) : (
        <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
          <div className="flex flex-col">
            <span className="countdown font-mono text-5xl">
              <span style={{ "--value": timeLeft.days }}></span>
            </span>
            days
          </div>
          <div className="flex flex-col">
            <span className="countdown font-mono text-5xl">
              <span style={{ "--value": timeLeft.hours }}></span>
            </span>
            hours
          </div>
          <div className="flex flex-col">
            <span className="countdown font-mono text-5xl">
              <span style={{ "--value": timeLeft.minutes }}></span>
            </span>
            min
          </div>
          <div className="flex flex-col">
            <span className="countdown font-mono text-5xl">
              <span style={{ "--value": timeLeft.seconds }}></span>
            </span>
            sec
          </div>
        </div>
      )}
      {/* Use ConfettiExplosion when the auction closes */}
      {showConfetti && (
        <>
          <ConfettiExplosion
            style={{
              width: "3000",
              height: "3000",
              force: 0.8,
              duration: 3000,
              particleCount: 250,
            }}
          />
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 9999,
              textAlign: "center",
            }}
          >
            <h1 style={{ fontSize: "3rem", color: "#fff", animation: "glow 2s ease-in-out infinite alternate" }}>
              Auction was Closed
            </h1>
          </div>
        </>
      )}
    </>
  );
};

export default CountdownTimer;
