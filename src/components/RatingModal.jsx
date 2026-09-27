import React, { useContext, useState } from "react";
import UserContext from "./UserContext";
import { postApiCall } from "../utils/apiCall";

const RatingModal = ({item}) => {
  const {user} = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(1);
  const ratingApi = async () => {
    const reqData = {
            "serviceId": item.serviceId,
            "rating": rating,
        }
    console.log("Rating", rating);
    try{
    const response = await postApiCall("service/addRating", reqData);
    alert(response.message);
    } catch (err) {
    console.log('Error sending data:', err);
    alert(err)
    }
  }

  return (
    <div className="p-2">
      {/* Open Modal Button */}
      <button
        onClick={() => setOpen(true)}
        className="rounded-lg bg-blue-600 px-5 py-2.5 text-white hover:bg-blue-700"
      >
        Add Rating
      </button>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setOpen(false)}
        >
          {/* Modal Content */}
          <div
            className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">
                Add Rating
              </h2>

              <button
                onClick={() => setOpen(false)}
                className="text-2xl text-gray-500 hover:text-gray-800"
              >
                &times;
              </button>
            </div>

            {/* Body */}

            {/* Footer */}
            <select
                onChange={(e)=> setRating(Number(e.target.value))}
                className="w-full bg-white rounded-md p-3 outline-none focus:ring-2 focus:ring-gray-700"
            >
                <option value="1">
                    1
                </option>
                <option value="2">
                    2
                </option>
                <option value="3">
                    3
                </option>
                <option value="4">
                    4
                </option>
                <option value="5">
                    5
                </option>
            </select>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setOpen(false)}
                className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={() => {ratingApi();setOpen(false);}}
                className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RatingModal;
