/** @format */

import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddAuction = () => {
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		name: "",
		description: "",
		imageUrl: "",
		currentBid: 0,
		timeLimit: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formattedTimeLimit = new Date(formData.timeLimit).toISOString();

		try {
			await axios.post(
				import.meta.env.VITE_BASE_URL + "/products",
				{
					...formData,
					timeLimit: formattedTimeLimit,
				},
				{
					headers: { Authorization: "Bearer " + localStorage.access_token },
				}
			);

			Swal.fire({
				title: "Success!",
				icon: "success",
			});

			navigate("/");
		} catch (error) {
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: `${error.response.data.message}`,
			});
		}
	};

	return (
		<>
			<div className='mb-16 p-6'>
				<div className='mockup-window border bg-base-300 p-10 flex flex-col items-center'>
					<h2 className='font-bold mb-7 text-2xl text-primary-500'>
						Add Your Auction
					</h2>
				</div>
				<form className='max-w-md mt-10 mx-auto' onSubmit={handleSubmit}>
					<div className='relative z-0 w-full mb-5 group'>
						<input
							type='text'
							name='name'
							id='name'
							className='block py-2.5 px-0 w-full text-sm text-base-content bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
							placeholder=' '
							value={formData.name}
							onChange={handleChange}
							required
						/>
						<label
							htmlFor='name'
							className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
							Name
						</label>
					</div>
					<div className='relative z-0 w-full mb-5 group'>
						<input
							type='text'
							name='description'
							id='description'
							className='block py-2.5 px-0 w-full text-sm text-base-content bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
							placeholder=' '
							value={formData.description}
							onChange={handleChange}
							required
						/>
						<label
							htmlFor='description'
							className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
							Description
						</label>
					</div>
					<div className='relative z-0 w-full mb-5 group'>
						<input
							type='text'
							name='imageUrl'
							id='imageUrl'
							className='block py-2.5 px-0 w-full text-sm text-base-content bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
							placeholder=' '
							value={formData.imageUrl}
							onChange={handleChange}
							required
						/>
						<label
							htmlFor='imageUrl'
							className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
							Image Url
						</label>
					</div>
					<div className='relative z-0 w-full mb-5 group'>
						<input
							type='number'
							name='currentBid'
							id='currentBid'
							className='block py-2.5 px-0 w-full text-sm text-base-content bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
							placeholder=' '
							value={formData.currentBid}
							onChange={handleChange}
							required
						/>
						<label
							htmlFor='currentBid'
							className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
							Minimum of Bid
						</label>
					</div>
					<div className='relative z-0 w-full mb-5 group'>
						<input
							type='datetime-local'
							name='timeLimit'
							value={formData.timeLimit}
							id='timeLimit'
							className='block py-2.5 px-0 w-full text-sm text-base-content  bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
							placeholder=' '
							onChange={handleChange}
							required
						/>
						<label
							htmlFor='timeLimit'
							className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
							Time Limit
						</label>
					</div>

					<button
						type='submit'
						className='text-base bg-base-300 hover:bg-base-200 font-medium rounded-lg  w-full sm:w-auto px-5 py-2.5 text-center'>
						Submit
					</button>
				</form>
			</div>
		</>
	);
};

export default AddAuction;
