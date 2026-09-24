import React, { useState, useEffect, useContext  } from "react";
import { getApiCall } from "../utils/apiCall";
import UserContext from "./UserContext";

const initialPage = 1;

const Booking = () => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [tableData, setTableData] = useState([]);
  const [category, setCategory] = useState("ALL");
  const {user} = useContext(UserContext);
  const rowsPerPage = 10;
  console.log("User in bookings", user)

  const lastIndex = currentPage * rowsPerPage;
  const firstIndex = lastIndex - rowsPerPage;

  const currentUsers = tableData && tableData.slice(firstIndex, lastIndex);

  const totalPages = tableData && Math.ceil(tableData.length / rowsPerPage);

  const getData = async () =>{
    try{
      console.log("Token in frontend Booking:", localStorage.getItem("token"));
      const response = await getApiCall("booking/getBookings?category=" + category);
      const res = response?.data?.data;
      console.log("Res Data", res)
      setTableData(res);
      } catch (err) {
      console.log('Error sending data:', err);
      }
  }

  useEffect(()=>{
    getData();
  }, [category])

  return (
    <div className="w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="flex flex-row justify-between p-4 bg-gray-100">
        <h2 className="text-2xl font-bold">Bookings</h2>
        {(user && user.role === "ADMIN") &&
        (<select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        >
          <option value="ALL">ALL</option>
          <option value="TUTOR">TUTOR</option>
          <option value="ELECTRICIAN">ELECTRICIAN</option>
          <option value="PLUMBER">PLUMBER</option>
        </select>)
        }
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-600">

          <thead className="bg-gray-200 text-xs uppercase text-gray-700">
            <tr>
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">Service</th>
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Provider</th>
              <th className="px-6 py-4">Customer Note</th>
              <th className="px-6 py-4">Provider Note</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Booking Date</th>
            </tr>
          </thead>

          <tbody>
            {currentUsers && currentUsers.map((item) => (
              <tr
                key={item.id}
                className="border-b hover:bg-gray-50"
              >
                <td className="px-6 py-4">
                  {item.id}
                </td>

                <td className="px-6 py-4 font-medium text-gray-900">
                  {item?.service?.category}
                </td>

                <td className="px-6 py-4">
                  {item.userId}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      item.role === "Customer"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {item.providerId}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {item.customerNote}
                </td>
                <td className="px-6 py-4">
                  {item.providerNote}
                </td>
                <td className="px-6 py-4">
                  {item.status}
                </td>
                <td className="px-6 py-4">
                  {item.bookingDate}
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
            {Math.min(lastIndex, tableData && tableData.length)}
          </span>{" "}
          of{" "}
          <span className="font-medium">
            {tableData && tableData.length}
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

export default Booking;