import React, { useState } from "react";

const initialPage = 1;

const users = [
  { id: 1, name: "Rahul Sharma", email: "rahul@gmail.com", role: "Customer" },
  { id: 2, name: "Amit Kumar", email: "amit@gmail.com", role: "Service Provider" },
  { id: 3, name: "Priya Singh", email: "priya@gmail.com", role: "Customer" },
  { id: 4, name: "Rohit Verma", email: "rohit@gmail.com", role: "Service Provider" },
  { id: 5, name: "Neha Gupta", email: "neha@gmail.com", role: "Customer" },
  { id: 6, name: "Vikas Yadav", email: "vikas@gmail.com", role: "Customer" },
  { id: 7, name: "Anjali Mehta", email: "anjali@gmail.com", role: "Service Provider" },
  { id: 8, name: "Karan Singh", email: "karan@gmail.com", role: "Customer" },
  { id: 9, name: "Pooja Sharma", email: "pooja@gmail.com", role: "Customer" },
  { id: 10, name: "Arjun Patel", email: "arjun@gmail.com", role: "Service Provider" },
  { id: 11, name: "Mohit Jain", email: "mohit@gmail.com", role: "Customer" },
  { id: 12, name: "Sneha Kapoor", email: "sneha@gmail.com", role: "Customer" },
];

const Services = () => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  // const currentPage = 1

  const rowsPerPage = 5;

  const lastIndex = currentPage * rowsPerPage;
  const firstIndex = lastIndex - rowsPerPage;

  const currentUsers = users.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(users.length / rowsPerPage);

  return (
    <div className="w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-600">

          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="px-6 py-4">ID1</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Role</th>
            </tr>
          </thead>

          <tbody>
            {currentUsers.map((user) => (
              <tr
                key={user.id}
                className="border-b hover:bg-gray-50"
              >
                <td className="px-6 py-4">
                  {user.id}
                </td>

                <td className="px-6 py-4 font-medium text-gray-900">
                  {user.name}
                </td>

                <td className="px-6 py-4">
                  {user.email}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      user.role === "Customer"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4">

        {/* Showing X to Y */}
        <p className="text-sm text-gray-600">
          Showing{" "}
          <span className="font-medium">
            {firstIndex + 1}
          </span>{" "}
          to{" "}
          <span className="font-medium">
            {Math.min(lastIndex, users.length)}
          </span>{" "}
          of{" "}
          <span className="font-medium">
            {users.length}
          </span>
        </p>

        {/* Buttons */}
        <div className="flex items-center gap-2">

          {/* Previous */}
          <button
            onClick={() =>
              setCurrentPage((prev) => prev - 1)
            }
            disabled={currentPage === 1}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>

          {/* Page Numbers */}
          {Array.from(
            { length: totalPages },
            (_, index) => index + 1
          ).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`rounded-md px-3 py-2 text-sm font-medium ${
                currentPage === page
                  ? "bg-black text-white"
                  : "border border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}

          {/* Next */}
          <button
            onClick={() =>
              setCurrentPage((prev) => prev + 1)
            }
            disabled={currentPage === totalPages}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>

        </div>
      </div>

    </div>
  );
}

export default Services;