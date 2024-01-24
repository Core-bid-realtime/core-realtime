/** @format */

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
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
			navigate("/");
		} catch (error) {
			console.log(error);
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: `${error.response.data.message}`,
			});
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
				Swal.fire({
					icon: "info",
					title: "Auction has Closed",
					text: "The auction has closed",
				});
				chooseTheWinner();
				clearInterval(timerInterval);
			}
		}, 1000);

		return () => {
			clearInterval(timerInterval);
		};
	}, [onTimerExpired, timeLimit]);

	return (
		<>
			{loadingTimeLimit ? (
				<h2 className='font-bold flex justify-center font-serif mb-7 text-2xl text-primary-500'>
					Loading...
				</h2>
			) : (
				<div className='grid grid-flow-col gap-5 text-center auto-cols-max'>
					<div className='flex flex-col'>
						<span className='countdown font-mono text-5xl'>
							<span style={{ "--value": timeLeft.days }}></span>
						</span>
						days
					</div>
					<div className='flex flex-col'>
						<span className='countdown font-mono text-5xl'>
							<span style={{ "--value": timeLeft.hours }}></span>
						</span>
						hours
					</div>
					<div className='flex flex-col'>
						<span className='countdown font-mono text-5xl'>
							<span style={{ "--value": timeLeft.minutes }}></span>
						</span>
						min
					</div>
					<div className='flex flex-col'>
						<span className='countdown font-mono text-5xl'>
							<span style={{ "--value": timeLeft.seconds }}></span>
						</span>
						sec
					</div>
				</div>
			)}
		</>
	);
};

export default CountdownTimer;
