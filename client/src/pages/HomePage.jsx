import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import CardHome from "../components/CardHome";
import Testimony from "../components/Testimony";
import { fetchHome } from "../../store/appSlice";

const HomePage = () => {
  let dispatch = useDispatch();
  let { dataHome, loadingHome } = useSelector((state) => state.appReducer);

  useEffect(() => {
    dispatch(fetchHome());
  }, []);
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
            <h1 className="text-center text-xl font-bold font-serif text-base-content">
              Let's Auction!
            </h1>
          </div>
          <div className="mt-16 flex flex-wrap justify-center gap-10">
            {dataHome &&
              dataHome.map((auction) => {
                return <CardHome key={auction.id} auction={auction} />;
              })}
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
