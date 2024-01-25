/** @format */

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProductsWinBid } from "../store/appSlice";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import axios from "axios";

const OrderUserPage = () => {
	let dispatch = useDispatch();
	let { dataProductsWin, loadingProductsWinBid } = useSelector(
		(state) => state.appReducer
	);

	const navigate = useNavigate();

	const navigateToProfile = () => {
		navigate("/order");
	};

	useEffect(() => {
		dispatch(getProductsWinBid());
	}, [dispatch]);

	function setCurrency(price) {
		return price.toLocaleString("id-ID", {
			style: "currency",
			currency: "IDR",
		});
	}

	async function handlePayment(orderBidId) {
		try {
			let { data } = await axios({
				method: "post",
				url:
					import.meta.env.VITE_BASE_URL +
					`/payment/midtrans/token/${orderBidId}`,
				headers: {
					Authorization: "Bearer " + localStorage.access_token,
				},
			});
			window.snap.pay(data.token, {
				onSuccess: async function (result) {
					console.log("Payment Success:", result);
					try {
						const response = await axios.post(
							"http://localhost:3000/payment/midtrans/notification",
							result,
							{
								headers: {
									Authorization: `Bearer ${localStorage.getItem(
										"access_token"
									)}`,
								},
							}
						);
						console.log(response.data);
						navigateToProfile();
					} catch (error) {
						console.log(error);
					}
				},
				onPending: function (result) {
					// console.log( "Payment Pending:", result );
					Swal.fire({
						icon: "info",
						title: "Payment Pending",
						text: `${result}`,
					});
					navigateToProfile();
				},
				onError: function (result) {
					// console.log("Payment Error:", result);
					Swal.fire({
						icon: "error",
						title: "Payment Error",
						text: `${result}`,
					});
				},
			});
		} catch (error) {
			// console.log(error);
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: `${error.response.data.message}`,
			});
		}
	}

	return (
		<>
			<section className='m-10'>
				{loadingProductsWinBid ? (
					<div className='m-10'>
						<div className='mockup-window border bg-base-200 p-10 flex flex-col items-center'>
							<h2 className='font-bold flex justify-center font-serif mb-7 text-2xl text-primary-500'>
								Loading...
							</h2>
							<span className='loading loading-spinner loading-lg'></span>
						</div>
					</div>
				) : dataProductsWin.length === 0 ? (
					<div className='mockup-window border bg-base-300 p-10 flex flex-col items-center'>
						<h2 className='font-bold mb-7 text-2xl text-primary-500'>
							Order is empty...
						</h2>
					</div>
				) : (
					<div>
						<div className='mockup-window border bg-base-300 p-10 flex flex-col items-center'>
							<h2 className='font-bold mb-7 text-2xl text-primary-500'>
								Your Order
							</h2>
						</div>
						<div className='overflow-x-auto'>
							<table className='min-w-full divide-y mt-8 rounded-xl bg-base-300'>
								<thead className='bg-base-300 text-center'>
									<tr className=' text-center'>
										<th
											scope='col'
											className='px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider'>
											orderId
										</th>
										<th
											scope='col'
											className='px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider'>
											Name and Product
										</th>
										<th
											scope='col'
											className='px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider'>
											Status
										</th>
										<th
											scope='col'
											className='px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider'>
											amount
										</th>
										<th
											scope='col'
											className='px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider'>
											Actions
										</th>
									</tr>
								</thead>
								<tbody className='bg-base-200'>
									{dataProductsWin &&
										dataProductsWin.map((product) => {
											return (
												<tr key={product.id} className='text-center'>
													<td className='px-6 py-4 whitespace-nowrap'>
														<div className='text-sm text-base-content'>
															{product.orderId}
														</div>
													</td>
													<td className='px-6 py-4 whitespace-nowrap'>
														<div>{product.name}</div>
													</td>
													<td className='px-6 py-4 whitespace-nowrap'>
														<span className='px-2 inline-flex text-xs p-2 font-semibold rounded-full bg-base-300 text-base-content'>
															{product.status}
														</span>
													</td>
													<td className='px-6 py-4 whitespace-nowrap '>
														{setCurrency(product.amount)}
													</td>
													<td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
														{product.status !== "paid" ? (
															<button
																onClick={() => handlePayment(product.id)}
																className='ml-2 text-base-content hover:bg-base-100 bg-base-300 w-[50px] h-[30px] rounded-lg'
																disabled={product.status === "paid"}>
																Pay
															</button>
														) : (
															product.status === "paid"
														)}
													</td>
												</tr>
											);
										})}
								</tbody>
							</table>
						</div>
					</div>
				)}
			</section>
		</>
	);
};

export default OrderUserPage;
