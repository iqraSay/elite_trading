import React, { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import { getUsers } from "../../Firebase";

const UserManager = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [usernameFilter, setUsernameFilter] = useState("");
  const [emailFilter, setEmailFilter] = useState("");
  const [mobileFilter, setMobileFilter] = useState("");

  // Fetch users on mount
  useEffect(() => {
    getUsers().then((fetchedUsers) => {
      // Ensure that fetched users have the expected structure
      const sanitizedUsers = fetchedUsers.map((user) => ({
        username: user.username || "",
        email: user.email || "",
        mobile: user.mobile || "",
      }));
      setUsers(sanitizedUsers);
      setFilteredUsers(sanitizedUsers); // Initialize filtered users to show all
    });
  }, []);

  // Handle filtering
  useEffect(() => {
    const filtered = users.filter((user) => {
      return (
        user.username.toLowerCase().includes(usernameFilter.toLowerCase()) &&
        user.email.toLowerCase().includes(emailFilter.toLowerCase()) &&
        user.mobile.includes(mobileFilter)
      );
    });
    setFilteredUsers(filtered);
  }, [usernameFilter, emailFilter, mobileFilter, users]);

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-grow p-4 h-screen">
        <h1 className="text-brown-900 text-2xl mb-4">User Manager</h1>

        {/* Filter inputs */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Filter by Username"
            className="mr-4 p-2 rounded bg-yellow-300 text-brown-900 placeholder-brown-900 mb-2"
            value={usernameFilter}
            onChange={(e) => setUsernameFilter(e.target.value)}
          />
          <input
            type="text"
            placeholder="Filter by Email"
            className="mr-4 p-2 rounded bg-yellow-300 text-brown-900 placeholder-brown-900 mb-2"
            value={emailFilter}
            onChange={(e) => setEmailFilter(e.target.value)}
          />
          <input
            type="text"
            placeholder="Filter by Mobile"
            className="mr-4 p-2 rounded bg-yellow-300 text-brown-900 placeholder-brown-900 mb-2"
            value={mobileFilter}
            onChange={(e) => setMobileFilter(e.target.value)}
          />
        </div>

        {/* User table */}
        <div className="overflow-x-auto shadow-2xl">
          <table className="min-w-full bg-gradient-to-br from-white to-yellow-200 text-brown-900 rounded-3xl shadow-2xl border-none">
            <tr className="bg-brown-900 text-yellow-500 h-12 text-xl">
              <th className="px-4 py-2 rounded-tl-3xl border-none">Sr. No</th>
              <th className="px-4 py-2 border-none">Username</th>
              <th className="px-4 py-2 border-none">Email</th>
              <th className="px-4 py-2 rounded-tr-3xl border-none">Mobile</th>
            </tr>

            {filteredUsers.map((user, index) => (
              <tr key={index} className="hover:bg-yellow-500 border-none">
                <td className="border-none px-4 py-2 text-center">
                  {index + 1}
                </td>
                <td className="border-none px-4 py-2 text-center">
                  {user.username}
                </td>
                <td className="border-none px-4 py-2 text-center">
                  {user.email}
                </td>
                <td className="border-none px-4 py-2 text-center">
                  {user.mobile}
                </td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManager;
