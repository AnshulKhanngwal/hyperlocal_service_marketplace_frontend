import React, { useState } from "react";

const BookingModal = ({open}) => {
  const [isOpen, setIsOpen] = useState(open);

  return (
    <div className="p-10">
      {/* Open Modal Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-lg bg-blue-600 px-5 py-2.5 text-white hover:bg-blue-700"
      >
        Open Modal
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setIsOpen(false)}
        >
          {/* Modal Content */}
          <div
            className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">
                Modal Title
              </h2>

              <button
                onClick={() => setIsOpen(false)}
                className="text-2xl text-gray-500 hover:text-gray-800"
              >
                &times;
              </button>
            </div>

            {/* Body */}
            <div className="mt-4">
              <p className="text-gray-600">
                This is a simple modal built with React and Tailwind CSS.
              </p>
            </div>

            {/* Footer */}
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={() => setIsOpen(false)}
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
