import React from "react";

const UserInfo: React.FC = () => {
  const token = localStorage.getItem("token");

  console.log(token);

  return (
    <div>
      <h2>User Information</h2>
      {/* Display user's name, avatar, etc. */}
    </div>
  );
};

export default UserInfo;
