import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { confirmStaffActivation } from "../../../../../Services/APIs/EndPoints/Auth/StaffActivation";

const StaffActivationConfirm: React.FC = () => {
  const { uid, token } = useParams<{ uid: string; token: string }>();
  const [status, setStatus] = useState("Memverifikasi...");

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await confirmStaffActivation(uid!, token!);
        setStatus(res.data.detail || "Aktivasi berhasil!");
      } catch (err: any) {
        setStatus(err.response?.data?.detail || "Aktivasi gagal");
      }
    };
    verify();
  }, [uid, token]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-6 shadow rounded bg-white max-w-sm text-center">
        <h1 className="text-xl font-bold mb-4">Staff Activation</h1>
        <p>{status}</p>
      </div>
    </div>
  );
};

export default StaffActivationConfirm;
