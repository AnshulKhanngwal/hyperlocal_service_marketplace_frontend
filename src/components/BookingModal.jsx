import React, { useContext, useState } from "react";
import UserContext from "./UserContext";
import { postApiCall } from "../utils/apiCall";

const BookingModal = ({open, setOpen, item}) => {
  const {user} = useContext(UserContext);
  const [note, setNote] = useState("");
  const bookingApi = async () => {
    console.log("This is your item", item.providerId)
    const reqData = {
            "userId": user.id,
            "serviceId": item.id,
            "providerId": item.providerId,
            "customerNote": note,
            "ProviderNote": ""
        }
    try{
    const response = await postApiCall("booking/createBooking", reqData);
    console.log("Booking confirm data", response);
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
        Book
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
                Confirm Booking
              </h2>

              <button
                onClick={() => setOpen(false)}
                className="text-2xl text-gray-500 hover:text-gray-800"
              >
                &times;
              </button>
            </div>

            {/* Body */}
            <div className="mt-4">
              <p className="text-gray-600">
                Do you want to book this {item.category} service ?
              </p>
            </div>

            {/* Footer */}
            <input className="w-full border-1 p-2" type="text" placeholder="Customer Note" onChange={(e) => setNote(e.target.value)} />
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setOpen(false)}
                className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={() => {bookingApi();setOpen(false);}}
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

export default BookingModal;
