import React from 'react'

const CardSideBidPage = ({openModal, product}) => {
    return (
        <>
            <div className="card w-[400px] shadow-xl bg-base-300 p-5 relative cursor-pointer">
                <img src={product.imageUrl} alt="picture" className='rounded-3xl h-96' />
                <button onClick={openModal} className="btn mt-10 text-base bg-base-200 hover:bg-base-100 rounded-xl">See Product</button>
                <h1 className="text-md text-center text-base-secondary p-7 mt-3 font-thin">{product.name}</h1>
                <p className="text-lg mb-8 text-center font-bold">Current Bid : {(product.currentBid)}</p>
                <p className="font-thin mb-12 text-justify">Description : {product.description}</p>
            </div>
        </>
    )
}

export default CardSideBidPage