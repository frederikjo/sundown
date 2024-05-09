import data from "../data/users.json";

export const getUsers = async () => {
  try {
    const users = data;
    return users;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return [];
  }
};

export const authenticateUser = async (
  email: string,
  password: string
) => {
  const users = await getUsers();
  const user = users.find(
    (u: any) => u.email === email && u.password === password
  );
  return user ? user : null;
};
