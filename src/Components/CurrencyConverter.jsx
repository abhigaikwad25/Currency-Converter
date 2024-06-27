import React, { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import { IoMdSwap } from "react-icons/io";

const CurrencyConverter = () => {
  //https://api.frankfurter.app/currencies
  // https://api.frankfurter.app/latest?amount=1&from=USD&to=INR

  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [converting, setConverting] = useState(false);
  
  const fetchcurrencies = async () => {
    try {
      const res = await fetch("https://api.frankfurter.app/currencies");
      const data = await res.json();

      setCurrencies(Object.keys(data)); 
    } catch (error) {
      console.error("Error Fetching", error);
    }
  };

  useEffect(() => {
    fetchcurrencies();
  }, []);

  const currencyConverter = async () => {
    if (!amount) return;
    setConverting(true);
    try {
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`
      );
      const data = await res.json();

      setConvertedAmount(data.rates[to] + " " + to);
    } catch (error) {
      console.error("Error Fetching", error);
    } finally {
      setConverting(false);
    }
  };

  const swapCurrencies = () => {
    setFrom(to);
    setTo(from);
  };
  return (
    <div className="max-w-xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md">
      <h2 className="mb-5 font-semibold text-gray-700 text-2xl">
        Currency Converter
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3">
        <Dropdown
          
          currencies={currencies}
          title="From : "
          currency={from}
          setCurrency={setFrom}
        />

        <div className="flex justify-center -mb-5 sm:mb-0">
          <button
            onClick={swapCurrencies}
            className="bg-gray-200 p-2 m-5 hover:bg-gray-300 cursor-pointer rounded-full"
          >
            <IoMdSwap className="text-xl text-gray-700" />
          </button>
        </div>

        <Dropdown
          currencies={currencies}
          title="To : "
          currency={to}
          setCurrency={setTo}
        />
      </div>

      <div className="mt-4">
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor="amount"
        >
          Amount :{" "}
        </label>

        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          className="w-full p-2 border mt-1 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div className="flex mt-6 justify-end">
        <button
          onClick={currencyConverter}
          className={`px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
        ${converting ? "animate-pulse" : ""}`}
        >
          Convert
        </button>
      </div>

      {convertedAmount && (
        <div className="mt-4 text-right text-green-600 text-lg font-medium">
          Converted Amount : {convertedAmount}
        </div>
      )}
    </div>
  );
};

export default CurrencyConverter;
