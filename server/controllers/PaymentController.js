/** @format */

const midtransClient = require("midtrans-client");
const { User, Bid, OrderBid, Product } = require("../models");
const { v4: uuidv4 } = require("uuid");

class PaymentController {
	static async initiateMidtrans(req, res, next) {
		try {
			const { productsId } = req.params;
			const products = await Product.findByPk(productsId);
			console.log(products);

			const snap = new midtransClient.Snap({
				isProduction: false,
				serverKey: process.env.MIDTRANS_SERVER_KEY,
			});

			const orderBidId = req.params.orderBidId;
			const orderBid = await OrderBid.findByPk(orderBidId);

			if (!orderBid) {
				return res.status(404).json({ message: "Order not found" });
			}

			const orderId = uuidv4();
			await orderBid.update({ orderId });

			const transactionDetails = {
				order_id: orderId,
				gross_amount: orderBid.amount,
			};

			const customerDetails = {
				first_name: req.user.fullname,
				email: req.user.email,
			};

			const itemDetails = [
				{
					id: orderId,
					price: orderBid.amount,
					quantity: 1,
					name: `${products.name}`,
					brand: "Core",
					category: "Buy Product",
				},
			];

			const detailTransaction = {
				transaction_details: transactionDetails,
				customer_details: customerDetails,
				item_details: itemDetails,
			};

			const response = await snap.createTransaction(detailTransaction);
			res.status(200).json(response);
		} catch (error) {
			next(error);
		}
	}

	static async notificationInitiate(req, res, next) {
		try {
			const statusResponse = req.body;
			const orderId = statusResponse.order_id;
			const transactionStatus = statusResponse.transaction_status;
			const fraudStatus = statusResponse.fraud_status;

			console.log(
				`Received transaction notification. Order ID: ${orderId}. Transaction status: ${transactionStatus}. Fraud status: ${fraudStatus}`
			);

			const order = await OrderBid.findOne({ where: { orderId: orderId } });

			const handlePaymentSuccess = async () => {
				await order.update({ status: "paid" });
			};

			if (transactionStatus === "capture") {
				if (fraudStatus === "accept") {
					await handlePaymentSuccess();
				}
			} else if (transactionStatus === "settlement") {
				await handlePaymentSuccess();
			} else if (
				transactionStatus === "cancel" ||
				transactionStatus === "deny" ||
				transactionStatus === "expire"
			) {
				await order.update({ status: "failure" });
			}

			res.status(200).json({ message: "Payment Success" });
		} catch (error) {
			next(error);
		}
	}
}

module.exports = PaymentController;
