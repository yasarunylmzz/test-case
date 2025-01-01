"use client";

import { useEffect, useState } from "react";
import {
  getUsers,
  deleteUser,
  createUser,
  updateUser,
} from "../../services/api/users";

import { User } from "../../types/users";

export default function Home() {
  const [data, setData] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    id: 0,
    name: "",
    surname: "",
    email: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await getUsers();
        setData(users);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSelectUser = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const newSelectedUsers = new Set(selectedUsers);
    if (e.target.checked) {
      newSelectedUsers.add(id);
    } else {
      newSelectedUsers.delete(id);
    }
    setSelectedUsers(newSelectedUsers);
  };

  const handleDelete = async () => {
    if (selectedUsers.size === 0) {
      console.log("No users selected");
      return;
    }

    try {
      const usersToDelete = Array.from(selectedUsers);
      await deleteUser(usersToDelete[0]);

      const updatedData = data.filter(
        (user) => !usersToDelete.includes(user.id)
      );
      setData(updatedData);
      setSelectedUsers(new Set());

      console.log("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleUpdate = () => {
    if (selectedUsers.size === 1) {
      const userToUpdate = data.find(
        (user) => user.id === Array.from(selectedUsers)[0]
      );
      if (userToUpdate) {
        setFormData({
          id: userToUpdate.id,
          name: userToUpdate.name,
          surname: userToUpdate.surname,
          email: userToUpdate.email,
        });
        setIsModalOpen(true);
      } else {
        console.log("User not found");
      }
    } else {
      console.log("Please select exactly one user for update");
    }
  };

  const handleModalSubmit = async () => {
    try {
      const updatedUser = await updateUser(formData);
      setData((prevData) =>
        prevData.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        )
      );
      setIsModalOpen(false);
      setFormData({ id: 0, name: "", surname: "", email: "" });
      console.log("User updated successfully");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid items-center justify-items-center min-h-screen">
      <table className="table-auto w-[50%] max-w-4xl border-collapse border border-gray-800 rounded-lg shadow-lg">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="px-4 py-2 border border-gray-700">Select</th>
            <th className="px-4 py-2 border border-gray-700">ID</th>
            <th className="px-4 py-2 border border-gray-700">Name</th>
            <th className="px-4 py-2 border border-gray-700">Surname</th>
            <th className="px-4 py-2 border border-gray-700">Created Date</th>
          </tr>
        </thead>
        <tbody className="bg-gray-700 text-black">
          {data.length > 0 ? (
            data.map((user) => (
              <tr key={user.id} className="hover:bg-gray-600">
                <td className="px-4 py-2 border border-gray-700">
                  <input
                    type="checkbox"
                    checked={selectedUsers.has(user.id)}
                    onChange={(e) => handleSelectUser(e, user.id)}
                  />
                </td>
                <td className="px-4 py-2 border border-gray-700">{user.id}</td>
                <td className="px-4 py-2 border border-gray-700">
                  {user.name}
                </td>
                <td className="px-4 py-2 border border-gray-700">
                  {user.surname}
                </td>
                <td className="px-4 py-2 border border-gray-700">
                  {user.created_at.split("T")[0]}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>No users found</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="flex gap-4">
        <button
          className="bg-green-700 p-2 rounded-md hover:bg-green-800"
          onClick={() => setIsModalOpen(true)}
        >
          Create
        </button>
        <button
          className="bg-yellow-700 p-2 rounded-md hover:bg-yellow-800"
          onClick={handleUpdate}
        >
          Update
        </button>
        <button
          className="bg-red-700 p-2 rounded-md hover:bg-red-800"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-12 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4 text-black">Create User</h2>
            <div className="mb-2">
              <label className="block text-sm font-medium text-black">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                className="border border-gray-500 text-black rounded-md p-2 w-full"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-black">
                Surname
              </label>
              <input
                type="text"
                value={formData.surname}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, surname: e.target.value }))
                }
                className="border border-gray-500 text-black rounded-md p-2 w-full"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-black">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                className="border border-gray-500 text-black rounded-md p-2 w-full"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                onClick={handleModalSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
