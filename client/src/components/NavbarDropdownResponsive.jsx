import React from 'react'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const NavbarDropdownResponsive = () => {
    let navigate = useNavigate()

    let logoutHandler = () => {
        Swal.fire({
            title: "Do you want to logout",
            showCancelButton: true,
            confirmButtonText: "Yes",
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('access_token')
                navigate('/login')
            }
        })
    }
    return (
        <>
            <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </div>
                <ul tabIndex={0} className="menu menu-sm dropdown-content z-[1] p-2 shadow bg-base-300 rounded-box w-52">
                    <li><a href="/" className="p-4 text-lg">Home</a></li>
                    <li><a className="p-4 text-lg">Auction</a>
                        <ul className="p-2">
                            <li><a href='/list'>List Auction</a></li>
                            <li><a href='/product'>Add Auction</a></li>
                        </ul></li>
                    <li><a href="/order" className="p-4 text-lg">Order</a></li>
                    <button className="sm:hidden items-center text-center btn bg-base-100 rounded-xl" onClick={logoutHandler}>Logout</button>
                </ul>
            </div>
        </>
    )
}

export default NavbarDropdownResponsive