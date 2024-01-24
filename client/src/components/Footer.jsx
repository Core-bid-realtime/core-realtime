import React from 'react'

const Footer = () => {
    return (
        <>
            <footer className="footer footer-center p-10 bg-base-300 text-base-content rounded">

                <nav className="grid grid-flow-col gap-4">
                    <a href="/" className="link link-hover">Home</a>
                    <a href="/" className="link link-hover">Add Auction</a>
                    <a href="/" className="link link-hover">Order</a>
                </nav>
                <nav>
                    <a href="/" className="font-serif">
                        <img
                            src="/logo.png"
                            alt="Logo"
                            style={{ width: '170px' }}
                        />
                    </a>
                </nav>
                <aside>
                    <p>Copyright © 2023 - Telang</p>
                </aside>
            </footer>
        </>
    )
}

export default Footer