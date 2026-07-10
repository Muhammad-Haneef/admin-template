// components/SubmitBtn.jsx

"use client";

import { useRouter } from "next/navigation";
import { Logout } from "@/helper/ServerSideActions";
import { FaSignOutAlt } from "react-icons/fa";
import { auth_endpoints } from "@/utils/auth_endpoints";
import { POST } from "@/helper/ServerSideActions";
import { handleResponse } from "@/helper/ClientSideActions";

export default function LogoutBtn({ label }) {
  const router = useRouter();
  
  const logout = async () => {
    try {
      // Call backend logout endpoint
      const response = await POST(auth_endpoints?.auth?.logout);

      if (response?.status === 200) {
        // Delete session cookie
        const logoutResult = await Logout();
        
        if (logoutResult?.success) {
          // Redirect to login page
          router.push("/login");
          router.refresh();
        } else {
          console.error("Failed to clear session");
        }
      } else {
        handleResponse(response);
      }
    } catch (err) {
      console.error("❌ Logout Error:", err);
    }
  };

  return (
    <button
      type="button"
      onClick={() => logout()}
      className="w-full px-4 py-2 bg-gray-100 text-black rounded-md flex justify-between items-center cursor-pointer border border-[#efefef]"
    >
      {label && <span>Logout</span>}
      <FaSignOutAlt className="ml-2" /> {/* Logout icon on the right */}
    </button>
  );
}
