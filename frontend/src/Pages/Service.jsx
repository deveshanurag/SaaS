import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import axios from "axios";

const Service = () => {
  const [userData, setUserData] = useState({ name: "", credits: 0 });
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [showTransactions, setShowTransactions] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (userInfo && userInfo.email) {
          const response = await axios.post("http://localhost:5000/api/users", {
            email: userInfo.email,
          });
          setUserData({
            name: response.data.name,
            credits: response.data.credits,
          });

          const transactionResponse = await axios.get(
            "http://localhost:5000/api/users/transactions",
            { params: { email: userInfo.email } }
          );
          setTransactions(transactionResponse.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to load user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleDownloadInvoice = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const response = await axios.get(
        "http://localhost:5000/api/users/download-invoice",
        {
          params: { email: userInfo.email },
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "invoice.pdf");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Failed to download invoice:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 flex flex-col items-center">
        {loading ? (
          <div className="text-xl font-bold mt-8">Loading...</div>
        ) : (
          <div className="w-full max-w-4xl px-8 mt-10">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-4xl font-extrabold text-purple-600">
                Welcome, {userData.name}!
              </h1>
              <p className="text-lg font-semibold text-green-700">
                Credits: {userData.credits}
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
              <textarea
                className="w-full p-4 border border-gray-300 rounded-lg mb-4"
                rows="5"
                placeholder="Type your text here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              ></textarea>
              <button className="w-full py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600">
                Process Text
              </button>
              {error && <p className="text-red-500 mt-4">{error}</p>}
              {result && (
                <div className="mt-6">
                  <h2 className="text-xl font-bold text-gray-800">Result:</h2>
                  <p>Result: {result.result}</p>
                  <p>Words: {result.wordCount}</p>
                  <p>Credits Deducted: {result.deductedCredits}</p>
                  <p>Remaining Credits: {result.remainingCredits}</p>
                </div>
              )}
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">
                  Transaction History
                </h2>
                <button
                  className="py-2 px-4 bg-indigo-500 text-white font-bold rounded-lg hover:bg-indigo-600"
                  onClick={() => setShowTransactions(!showTransactions)}
                >
                  {showTransactions ? "Hide Transactions" : "Show Transactions"}
                </button>
              </div>
              {showTransactions && transactions.length > 0 ? (
                <ul className="space-y-4">
                  {transactions.map((transaction, index) => (
                    <li
                      key={transaction._id}
                      className="p-4 bg-gray-100 rounded-lg"
                    >
                      <h3 className="font-semibold text-gray-700">
                        Transaction {index + 1}
                      </h3>
                      <p>Text: {transaction.text}</p>
                      <p>Result: {transaction.result}</p>
                      <p>CPU Usage: {transaction.cpuUsage}%</p>
                      <p>RAM Usage: {transaction.ramUsage}%</p>
                      <p>Credits Deducted: {transaction.deductedCredits}</p>
                    </li>
                  ))}
                </ul>
              ) : showTransactions ? (
                <p>No transactions found.</p>
              ) : null}
              <button
                onClick={handleDownloadInvoice}
                className="mt-4 py-3 w-full bg-green-500 text-white font-bold rounded-lg hover:bg-green-600"
              >
                Download Invoice
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Service;
