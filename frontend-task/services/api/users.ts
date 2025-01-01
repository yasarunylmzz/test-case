const API_BASE_URL = "http://localhost:3030/api/users";

export const getUsers = async () => {
  const response = await fetch(`${API_BASE_URL}/get`);
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return await response.json();
};

export const deleteUser = async (id: number) => {
  const response = await fetch(`${API_BASE_URL}/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.error || "Failed to delete user");
  }

  return await response.json();
};

export const createUser = async (data: {
  name: string;
  surname: string;
  email: string;
}) => {
  const response = await fetch(`${API_BASE_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    try {
      const errorResponse = await response.json();
      throw new Error(errorResponse.error || "Failed to create user");
    } catch (e) {
      throw new Error("Failed to parse error response");
    }
  }

  return await response.json();
};

export const updateUser = async (data: {
  id: number;
  name: string;
  surname: string;
  email: string;
}) => {
  const response = await fetch(`${API_BASE_URL}/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.error || "Failed to update user");
  }

  return await response.json();
};
