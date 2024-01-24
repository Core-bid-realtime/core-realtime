import React from 'react'
import { Link } from 'react-router-dom'

const CardHome = ({ auction }) => {
  function setCurrency(price) {
    return price.toLocaleString("id-ID", { style: "currency", currency: "IDR" })
  }
  return (
    <>
      <div className="card w-80 shadow-xl bg-base-300 p-5 rounded-3xl relative">
        <img src={auction.imageUrl} alt="picture" className='rounded-3xl h-80' />
        <div className="overlay-content absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center text-white">
          <p className="text-md mb-14 text-center font-semibold bg-base-300 p-3 rounded-3xl">{setCurrency(auction.currentBid)}</p>
          <Link to={'/bid/' + auction.id} className="btn text-base bg-base-300 hover:bg-base-100 rounded-xl">Bid</Link>
        </div>
        <h2 className="text-md text-center text-base-secondary p-7 font-thin">{auction.name}</h2>
      </div>
    </>
  )
}

export default CardHome