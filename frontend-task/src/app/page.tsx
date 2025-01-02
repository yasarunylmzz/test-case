"use client";

import { useEffect, useState } from "react";
import {
  getUsers,
  deleteUser,
  createUser,
  updateUser,
} from "../../services/api/users";

import { User } from "../../types/users";
import UserTable from "../components/UserTable";
import UserModal from "../components/UserModal";

export default function Home() {
  const [data, setData] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState<boolean>(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
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
        setIsUpdateModalOpen(true);
      } else {
        console.log("User not found");
      }
    } else {
      console.log("Please select exactly one user for update");
    }
  };

  const handleCreateModalSubmit = async () => {
    try {
      const createdUser = await createUser(formData);
      setData((prevData) => {
        if (!Array.isArray(prevData)) {
          prevData = [];
        }
        return [...prevData, createdUser];
      });
      setIsCreateModalOpen(false);
      setFormData({ id: 0, name: "", surname: "", email: "" });
      console.log("User created successfully");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const handleUpdateModalSubmit = async () => {
    try {
      const updatedUser = await updateUser(formData);
      setData((prevData) =>
        prevData.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        )
      );
      setIsUpdateModalOpen(false);
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
    // Main Container
    <div className="grid items-center justify-items-center min-h-screen">
      {/* User Table */}
      <UserTable
        data={data}
        selectedUsers={selectedUsers}
        handleSelectUser={handleSelectUser}
      />
      {/* Buttons */}
      <div className="flex gap-4">
        <button
          className="bg-green-700 p-2 rounded-md hover:bg-green-800"
          onClick={() => setIsCreateModalOpen(true)}
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

      {/* Create Modal */}
      <UserModal
        isOpen={isCreateModalOpen}
        title="Create User"
        formData={formData}
        setFormData={setFormData}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateModalSubmit}
      />
      {/* Update Modal */}
      <UserModal
        isOpen={isUpdateModalOpen}
        title="Update User"
        formData={formData}
        setFormData={setFormData}
        onClose={() => setIsUpdateModalOpen(false)}
        onSubmit={handleUpdateModalSubmit}
      />
    </div>
  );
}
