import React from 'react'

const IndicatorBidBadge = (product) => {
    return (
        <>
            <div className="indicator mb-3">
                <div className="indicator-item indicator-botto bg-base-100m">
                    <span className="indicator-item badge rounded-lg badge-secondary text-purple-300 p-3 bg-base-100">Best Offer!</span>
                </div>
                <div className="card border">
                    <div className="card-body">
                        <h1 className="card-title">Bid : {(product.currentBid)}</h1>
                    </div>
                </div>
            </div>
        </>
    )
}

export default IndicatorBidBadge