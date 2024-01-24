function setCurrency(price) {
    let newPrice = Number(price)
    return newPrice.toLocaleString("id-ID", { style: "currency", currency: "IDR" })
  }

module.exports = setCurrency