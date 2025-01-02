import React from "react";
import { User } from "../../types/users";

interface UserTableProps {
  data: User[];
  selectedUsers: Set<number>;
  handleSelectUser: (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => void;
}
// UserTable component
const UserTable: React.FC<UserTableProps> = ({
  data,
  selectedUsers,
  handleSelectUser,
}) => {
  return (
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
        {Array.isArray(data) && data.length > 0 ? (
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
              <td className="px-4 py-2 border border-gray-700">{user.name}</td>
              <td className="px-4 py-2 border border-gray-700">
                {user.surname}
              </td>
              <td className="px-4 py-2 border border-gray-700">
                {new Date(user.created_at).toLocaleDateString()}
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
  );
};

export default UserTable;
