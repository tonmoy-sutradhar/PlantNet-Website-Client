import PropTypes from "prop-types";
import { useState } from "react";
import DeleteModal from "../../Modal/DeleteModal";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
const SellerOrderDataRow = ({ orderData, refetch }) => {
  let [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);
  const { name, customer, price, plantId, quantity, address, status, _id } =
    orderData || {};

  const axiosSecure = useAxiosSecure();

  // seller and myOrder functionality same--##**
  // Handle Delete/cancel
  const handleDelete = async () => {
    try {
      // fetch delete request
      await axiosSecure.delete(`/orders/${_id}`);

      // increase quantity from db
      await axiosSecure.patch(`/plants/quantity/${plantId}`, {
        quantityToUpdate: quantity,
        status: "increase",
      });

      // After delete refresh the UI
      refetch();
    } catch (err) {
      console.log(console.log(err));
      toast.error(err.response.data);
    } finally {
      closeModal();
    }
  };

  // Handle Status change
  const handleStatus = async (newStatus) => {
    if (status === "pending") return;
    // console.log(newStatus);

    // Patch request to server--> for status change
    try {
      // change order status from db
      await axiosSecure.patch(`/orders/${_id}`, {
        status: newStatus,
      });
      refetch();
      toast.success("Order status update.");
    } catch (err) {
      console.log(console.log(err));
      toast.error("Order don't update");
    }
  };
  console.log(_id);

  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{name}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{customer?.email}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">${price}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{quantity}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{address}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{status}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center gap-2">
          <select
            required
            defaultValue={status}
            disabled={status === "Delivered"}
            onChange={(e) => handleStatus(e.target.value)}
            className="p-1 border-2 border-lime-300 focus:outline-lime-500 rounded-md text-gray-900 whitespace-no-wrap bg-white"
            name="category"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">Start Processing</option>
            <option value="Delivered">Deliver</option>
          </select>
          <button
            onClick={() => setIsOpen(true)}
            className="relative disabled:cursor-not-allowed cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
            ></span>
            <span className="relative">Cancel</span>
          </button>
        </div>
        <DeleteModal
          handleDelete={handleDelete}
          isOpen={isOpen}
          closeModal={closeModal}
        />
      </td>
    </tr>
  );
};

SellerOrderDataRow.propTypes = {
  order: PropTypes.object,
  refetch: PropTypes.func,
};

export default SellerOrderDataRow;
