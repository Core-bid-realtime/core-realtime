import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardHome from "../components/CardHome";
import Testimony from "../components/Testimony";
import { fetchHome } from "../../store/appSlice";

const HomePage = () => {
  const dispatch = useDispatch();
  const { dataHome, loadingHome } = useSelector((state) => state.appReducer);
  const itemsPerPage = 7; // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchHome());
  }, [dispatch]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dataHome?.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil((dataHome?.length || 1) / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to the first page when performing a new search
  };

  // Filter items based on search term
  const filteredItems = dataHome?.filter((auction) =>
    auction.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {loadingHome ? (
        <div className="m-10">
          <div className="mockup-window border bg-base-200 p-10 flex flex-col items-center">
            <h2 className="font-bold flex justify-center font-serif mb-7 text-2xl text-primary-500">
              Loading...
            </h2>
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        </div>
      ) : (
        <section className="bg-base-100 p-10 mt-10 min-h-screen">
          <div className="container">
            <h1 className="text-center text-5xl shadow-text animate-logo font-bold font-poppins text-base-content">
              Let's Auction, Get Your Sneakers!
            </h1>
          </div>
          <div className="mt-8 flex justify-center">
            <input
              type="text"
              placeholder="Search Here..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="input input-bordered w-80 text-base"
            />
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-10">
            {filteredItems &&
              filteredItems
                .slice(indexOfFirstItem, indexOfLastItem)
                .map((auction) => (
                  <CardHome key={auction.id} auction={auction} />
                ))}
          </div>
          <div className="flex justify-center mt-6 space-x-2">
            {/* Pagination controls */}
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                className={`btn btn-sm ${
                  currentPage === index + 1 ? "btn-active" : "btn-secondary"
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </section>
      )}
      <h1 className="mt-20 text-4xl font-bold text-center text-orange-400">
        TESTIMONY CUSTOMER'S
      </h1>
      <Testimony />
    </>
  );
};

export default HomePage;
