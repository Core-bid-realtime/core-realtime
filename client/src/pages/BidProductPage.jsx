import axios from "axios";
import Swal from "sweetalert2";
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import ModalPhotoBidProductPage from "../components/ModalPhotoBidProductPage";
import IndicatorBidBadge from "../components/IndicatorBidBadge";

import { useDispatch, useSelector } from "react-redux";
import { getWhoLogin } from "../store/appSlice";
import socket from "../socket";

import CountdownTimer from "../components/CountdownTimer";
import CardSideBidPage from "../components/CardSidebidPage";

const BidProductPage = () => {
  let chatBoxRef = useRef(null);
  let { productId } = useParams();
  let [product, setProduct] = useState({});
  let [allBid, setAllBid] = useState([]);
  let [loadingFetchProduct, setLoadingFetchProduct] = useState(true);
  let [loadingFetchAllBid, setLoadingFetchAllBid] = useState(true);

  let dispatch = useDispatch();
  let { whoLogin } = useSelector((state) => state.appReducer);

  const [isModalOpen, setModalOpen] = useState(false);

  let [newInputBid, setNewInputBid] = useState("");

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  async function fetchProductById() {
    try {
      let link = `${import.meta.env.VITE_BASE_URL}/product/${productId}`;
      let { data } = await axios({
        method: "get",
        url: link,
        headers: {
          Authorization: "Bearer " + localStorage.access_token,
        },
      });
      setProduct(data);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.response.data.message}`,
      });
    } finally {
      setLoadingFetchProduct(false);
    }
  }

  async function fetchAllBid() {
    try {
      let link = `${import.meta.env.VITE_BASE_URL}/bid/${productId}`;
      let { data } = await axios({
        method: "get",
        url: link,
        headers: {
          Authorization: "Bearer " + localStorage.access_token,
        },
      });
      if (chatBoxRef.current) {
        chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
      }
      setAllBid(data);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.response.data.message}`,
      });
    } finally {
      setLoadingFetchAllBid(false);
    }
  }

  async function sendBid() {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
    try {
      await axios({
        method: "post",
        url: `${import.meta.env.VITE_BASE_URL}/bid`,
        data: {
          ProductId: productId,
          bidAmount: newInputBid,
        },
        headers: {
          Authorization: "Bearer " + localStorage.access_token,
        },
      });
      socket.emit("bid:new", newInputBid);
      let compareBid = {
        newInputBid,
        productId,
      };
      socket.emit("currentBid:new", compareBid);
      setNewInputBid("");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.response.data.message}`,
      });
    }
  }

  useEffect(() => {
    socket.auth = {
      access_token: localStorage.access_token,
    };
    socket.connect();

    socket.on("bid:update", (getNewBid) => {
      setAllBid((current) => {
        return [...current, getNewBid];
      });
    });

    socket.on("currentBid:update", (newCurrentBid) => {
      console.log(newCurrentBid);
      setProduct((prevProduct) => {
        return {
          ...prevProduct,
          currentBid: newCurrentBid,
        };
      });
      if (chatBoxRef.current) {
        chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
      }
    });

    return () => {
      socket.off("bid:update");
      socket.off("currentBid:update");
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    dispatch(getWhoLogin());
    fetchProductById();
    fetchAllBid();
  }, []);

  function setCurrency(price) {
    return price.toLocaleString("id-ID", { style: "currency", currency: "IDR" });
  }

  function setDateFormat(value) {
    let date = new Date(value);
    let year = date.getFullYear();
    let month = `${date.getMonth() + 1}`.padStart(2, "0");
    let day = `${date.getDate()}`.padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  return (
    <>
      {loadingFetchProduct || loadingFetchAllBid ? (
        <div className="m-10">
          <div className="mockup-window border bg-base-200 p-10 flex flex-col items-center">
            <h2 className="font-bold flex justify-center font-serif mb-7 text-2xl text-primary-500">Loading...</h2>
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        </div>
      ) : (
        <section>
          <div className="m-10">
            <div className="mockup-window border bg-base-200 p-10 flex flex-col items-center">
              <h2 className="font-bold mb-7 text-2xl text-primary-500">{product.name}</h2>
              <CountdownTimer productId={productId} />
            </div>

            <div className="card border lg:card-side mt-4 shadow-xl">
              <figure>
                <CardSideBidPage openModal={openModal} product={product} setCurrency={setCurrency} />
              </figure>

              {isModalOpen && <ModalPhotoBidProductPage product={product} closeModal={closeModal} />}

              <div className="card-body bg-base-200">
                <IndicatorBidBadge product={product} setCurrency={setCurrency} />

                <div className="bg-base-300 rounded-xl">
                  <p className="text-base p-3 font-thin text-center">{product.name}</p>
                </div>
                <div className="chat-box rounded-xl bg-base-secondary border overflow-y-auto" ref={chatBoxRef}>
                  <div className="p-4 h-[500px]">
                    {allBid &&
                      allBid.map((bid, i) => (
                        <div key={i} className={`chat mb-2 ${bid.UserId === whoLogin.id ? "chat-end" : "chat-start"}`}>
                          <div className={`chat-bubble ${bid.UserId === whoLogin.id ? "chat-bubble-primary" : "chat-bubble-secondary"}`}>
                            <p className="font-semibold">From: {bid.User.fullname}</p>
                            <p>{setCurrency(bid.bidAmount)}</p>
                          </div>
                          <div className="chat-footer opacity-50">
                            {bid.UserId === whoLogin.id && <span>Delivered </span>}
                            {setDateFormat(bid.createdAt)}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                <div className="flex mt-1">
                  <input onChange={(e) => setNewInputBid(e.target.value)} value={newInputBid} onKeyPress={(e) => e.key === "Enter" && sendBid()} type="number" placeholder="Input your bid..." className="input input-bordered w-full" />
                  <button onClick={sendBid} className="btn bg-base-300 mb-3 ml-2 w-20 text-center">
                    Bid
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default BidProductPage;
