import React from "react";

interface UserModalProps {
  isOpen: boolean;
  title: string;
  formData: { id: number; name: string; surname: string; email: string };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      id: number;
      name: string;
      surname: string;
      email: string;
    }>
  >;
  onClose: () => void;
  onSubmit: () => void;
}
// UserModal component
const UserModal: React.FC<UserModalProps> = ({
  isOpen,
  title,
  formData,
  setFormData,
  onClose,
  onSubmit,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-12 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4 text-black">{title}</h2>
        <div className="mb-2">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-black"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            className="border border-gray-500 text-black rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-2">
          <label
            htmlFor="surname"
            className="block text-sm font-medium text-black"
          >
            Surname
          </label>
          <input
            id="surname"
            type="text"
            value={formData.surname}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, surname: e.target.value }))
            }
            className="border border-gray-500 text-black rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-black"
          >
            Email
          </label>
          <input
            id="email"
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
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            onClick={onSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
