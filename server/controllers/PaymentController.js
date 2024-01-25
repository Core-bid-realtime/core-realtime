/** @format */

const midtransClient = require("midtrans-client");
const { User, Bid, OrderBid, Product } = require("../models");
class PaymentController {
	static async getMidtransToken(req, res, next) {
		try {
			let snap = new midtransClient.Snap({
				isProduction: false,
				serverKey: process.env.MIDTRANS_SERVER_KEY,
			});

			let find = await OrderBid.findByPk(req.params.orderBidId);

			let lastOrder = await OrderBid.findOne({
				order: [["createdAt", "desc"]],
			});
			let lastId = lastOrder ? lastOrder.id + 1 : 1;
			let OrderBidUpdate = await find.update({
				orderId: "ORD-CORE-" + Date.now() + lastId,
			});
			let parameter = {
				transaction_details: {
					order_id: OrderBidUpdate.orderId,
					gross_amount: find.amount,
				},
				customer_details: {
					first_name: req.user.fullname,
					email: req.user.email,
				},
				item_details: [
					{
						id: "Core-Product",
						price: find.amount,
						quantity: 1,
						name: "Core Product",
						brand: "Core Product",
						category: "Buy Product",
					},
				],
			};
			let response = await snap.createTransaction(parameter);
			res.status(200).json(response);
		} catch (error) {
			next(error);
		}
	}

	static async getMidtransNotification(req, res, next) {
		try {
			let statusResponse = req.body;
			let orderId = statusResponse.order_id;
			let transactionStatus = statusResponse.transaction_status;
			let fraudStatus = statusResponse.fraud_status;

			let order = await OrderBid.findOne({
				where: {
					orderId: order,
				},
			});

			let successPayment = async () => {
				await order.update({
					where: {
						orderId: order,
					},
					status: "paid",
				});
			};

			if (transactionStatus == "capture") {
				if (fraudStatus == "accept") {
					await successPayment();
				}
			} else if (transactionStatus == "settlement") {
				await successPayment();
			} else if (
				transactionStatus == "cancel" ||
				transactionStatus == "deny" ||
				transactionStatus == "expire"
			) {
				await order.update({
					status: "failure",
				});
			}
			res.status(200).json({ message: "Payment Success" });
		} catch (error) {
			next(error);
		}
	}
}

module.exports = PaymentController;
