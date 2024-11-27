import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../AuthContext";

function Challenge() {
  // State for form data input
  const [formData, setFormData] = useState({
    national_inv: "",
    lead_time: "",
    sales_1_month: "",
    pieces_past_due: "",
    perf_6_month_avg: "",
    in_transit_qty: "",
    local_bo_qty: "",
    deck_risk: "",
    oe_constraint: "",
    ppap_risk: "",
    stop_auto_buy: "",
    rev_stop: "",
  });

  // State for prediction result
  const [prediction, setPrediction] = useState(null);

  // State for prediction history
  const [history, setHistory] = useState([]);

  // Access the authentication context
  const { authToken } = useContext(AuthContext);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to send input data to the backend and get the prediction
  const handlePredict = async () => {
    // Validation: Check if all required fields are filled
    const requiredFields = [
      "national_inv",
      "lead_time",
      "sales_1_month",
      "pieces_past_due",
      "perf_6_month_avg",
      "in_transit_qty",
      "local_bo_qty",
      "deck_risk",
      "oe_constraint",
      "ppap_risk",
      "stop_auto_buy",
      "rev_stop",
    ];

    // Find any fields that are empty
    const emptyFields = requiredFields.filter(
      (field) => !formData[field].toString().trim()
    );

    if (emptyFields.length > 0) {
      alert(
        `Please fill in all required fields: ${emptyFields
          .map((field) => field.replace(/_/g, " "))
          .join(", ")}`
      );
      return; // Stop execution if validation fails
    }

    try {
      // Prepare the payload for the backend
      const payload = {
        ...formData,
        national_inv: formData.national_inv || 0,
        lead_time: formData.lead_time || 0,
        sales_1_month: formData.sales_1_month || 0,
        pieces_past_due: formData.pieces_past_due || 0,
        perf_6_month_avg: formData.perf_6_month_avg || 0,
        in_transit_qty: formData.in_transit_qty || 0,
        local_bo_qty: formData.local_bo_qty || 0,
        deck_risk: formData.deck_risk || 0,
        oe_constraint: formData.oe_constraint || 0,
        ppap_risk: formData.ppap_risk || 0,
        stop_auto_buy: formData.stop_auto_buy || 0,
        rev_stop: formData.rev_stop || 0,
      };

      console.log(payload);

      const response = await axios.post(
        "http://localhost:5000/predict",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error("Error details:", error);

      // Improved logging for axios errors
      if (error.response) {
        // Backend responded with a status code other than 2xx
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);

        alert(
          "Prediction failed: " +
            (error.response.data.msg || "Unknown error from backend")
        );
      } else if (error.request) {
        // Request was made but no response received
        console.error("Request data:", error.request);
        alert("Prediction failed: No response from the backend.");
      } else {
        // Something else happened in setting up the request
        console.error("Error message:", error.message);
        alert("Prediction failed: " + error.message);
      }
    }
  };

  // Fetch prediction history when the component mounts
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get("http://localhost:5000/user-history", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        console.log(response.data);
        setHistory(response.data); // Update state with the fetched history
      } catch (error) {
        console.log(error);
      }
    };

    fetchHistory();
  }, [authToken, prediction]);

  console.log(history);
  return (
    <>
      <nav className="navbar bg-opacity-30 bg-black backdrop-blur-lg p-4 rounded-md shadow-lg flex justify-between">
        <div className="navbar-logo text-white font-bold text-lg">
          <a href="/">Backorder Vision</a>
        </div>
        <ul className="navbar-list flex space-x-6">
          <li className="navbar-item">
            <a
              href="/about"
              className="navbar-link text-white font-semibold hover:bg-orange-500 hover:text-black transition-all duration-300 transform hover:scale-105 px-4 py-2 rounded-lg no-underline"
            >
              About
            </a>
          </li>
        </ul>
      </nav>
      <div className="p-6 bg-gradient-to-r from-orange-400 to-orange-600 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-white">Backorder Prediction</h2>
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "National Inventory", name: "national_inv" },
              { label: "Lead Time", name: "lead_time" },
              { label: "Sales (1 Month)", name: "sales_1_month" },
              { label: "Pieces Past Due", name: "pieces_past_due" },
              { label: "Performance (6-Month Avg)", name: "perf_6_month_avg" },
              { label: "In-Transit Quantity", name: "in_transit_qty" },
              { label: "Local BO Quantity", name: "local_bo_qty" },
              { label: "Deck Risk (0 or 1)", name: "deck_risk" },
              { label: "OE Constraint (0 or 1)", name: "oe_constraint" },
              { label: "PPAP Risk (0 or 1)", name: "ppap_risk" },
              { label: "Stop Auto Buy (0 or 1)", name: "stop_auto_buy" },
              { label: "Rev Stop (0 or 1)", name: "rev_stop" },
            ].map(({ label, name }, index) => (
              <div key={index}>
                <label
                  htmlFor={name}
                  className="block text-white font-semibold"
                >
                  {label}
                </label>
                <input
                  id={name}
                  name={name}
                  placeholder={label}
                  value={formData[name]}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 rounded w-full bg-gradient-to-r from-gray-200 to-gray-300 text-black"
                />
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={handlePredict}
            className="bg-orange-500 text-white p-2 rounded hover:bg-orange-600 transition-all duration-300 font-bold"
          >
            Predict
          </button>
        </form>

        {/* Display Prediction Explanation */}
        {prediction !== null && (
          <div className="mt-4 text-white">
            <div className="font-bold">Prediction:</div> {prediction}
            <div className="mt-2">
              {prediction === "1" ? (
                <p>The object is likely to go on backorder.</p>
              ) : (
                <p>The object is not likely to go on backorder.</p>
              )}
            </div>
          </div>
        )}

<h2 className="text-2xl font-bold mt-6 text-white">Prediction History</h2>
        <table className="mt-2 w-full border-collapse">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="border-b border-r py-2 text-center">Deck Risk</th>
              <th className="border-b border-r py-2 text-center">In Transit Qty</th>
              <th className="border-b border-r py-2 text-center">Lead Time</th>
              <th className="border-b border-r py-2 text-center">Local BO Qty</th>
              <th className="border-b border-r py-2 text-center">National Inv</th>
              <th className="border-b border-r py-2 text-center">OE Constraint</th>
              <th className="border-b border-r py-2 text-center">Perf 6 Month Avg</th>
              <th className="border-b border-r py-2 text-center">Pieces Past Due</th>
              <th className="border-b border-r py-2 text-center">PPAP Risk</th>
              <th className="border-b border-r py-2 text-center">Rev Stop</th>
              <th className="border-b border-r py-2 text-center">Sales 1 Month</th>
              <th className="border-b border-r py-2 text-center">Stop Auto Buy</th>
              <th className="border-b py-2 text-center">Prediction</th>
            </tr>
          </thead>
          <tbody>
            {history
              .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
              .map((entry, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2 text-gray-300 border-r text-center">{entry.input_data.deck_risk}</td>
                  <td className="py-2 text-gray-300 border-r text-center">{entry.input_data.in_transit_qty}</td>
                  <td className="py-2 text-gray-300 border-r text-center">{entry.input_data.lead_time}</td>
                  <td className="py-2 text-gray-300 border-r text-center">{entry.input_data.local_bo_qty}</td>
                  <td className="py-2 text-gray-300 border-r text-center">{entry.input_data.national_inv}</td>
                  <td className="py-2 text-gray-300 border-r text-center">{entry.input_data.oe_constraint}</td>
                  <td className="py-2 text-gray-300 border-r text-center">{entry.input_data.perf_6_month_avg}</td>
                  <td className="py-2 text-gray-300 border-r text-center">{entry.input_data.pieces_past_due}</td>
                  <td className="py-2 text-gray-300 border-r text-center">{entry.input_data.ppap_risk}</td>
                  <td className="py-2 text-gray-300 border-r text-center">{entry.input_data.rev_stop}</td>
                  <td className="py-2 text-gray-300 border-r text-center">{entry.input_data.sales_1_month}</td>
                  <td className="py-2 text-gray-300 border-r text-center">{entry.input_data.stop_auto_buy}</td>
                  <td className="py-2 text-gray-300 text-center">{entry.prediction}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <footer className="footer text-center py-2 bg-gray-900">
        <p className="text-gray-300 text-sm">&copy; Backorder Vision - 2024. All rights reserved.</p>
      </footer>
    </>
  );
}

export default Challenge;
