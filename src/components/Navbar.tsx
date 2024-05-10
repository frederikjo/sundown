import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@mui/material";
import { useUser } from "@/UserContext";

const Navbar: React.FC = () => {
  const { setUser } = useUser();
  return (
    <nav className="bg-starry flex items-center justify-between p-4 text-white bg-gray-600 shadow-md">
      <div className="flex items-center gap-4">
        <Link href="/dashboard">
          <Image
            src="/logo.svg"
            alt="LOGO"
            className="w-[38px] p-0 m-0 rounded-md"
            width="50"
            height="50"
          />
        </Link>
        <Link href="/" passHref>
          <span className="mr-4 cursor-pointer">Home</span>
        </Link>
        <Link href="/create-space-report" passHref>
          <span className="cursor-pointer">Create a new report</span>
        </Link>
      </div>
      <div>
        <Button
          onClick={() => setUser(null)}
          variant="contained"
          size="small"
          className="bg-[#797E86] hover:bg-[#5F6368]"
        >
          Log out
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
