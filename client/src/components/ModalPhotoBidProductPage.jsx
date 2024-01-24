import React from 'react'

const ModalPhotoBidProductPage = ({ closeModal, product }) => {
    return (
        <>
            <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-75 flex items-center justify-center">
                <div className="relative mx-auto max-w-3xl w-[500px]">
                    <button onClick={closeModal} className="absolute top-4 right-4 text-black text-xl">&times;</button>
                    <img src={product.imageUrl} alt="Large Product" className="rounded-xl" />
                </div>
            </div>
        </>
    )
}

export default ModalPhotoBidProductPage