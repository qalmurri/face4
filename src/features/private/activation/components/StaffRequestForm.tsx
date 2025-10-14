import React, { useState } from "react";
import { requestStaffActivation } from "../../../../APIs/authApi";

const RequestStaffActivation: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleRequest = async () => {
    try {
      setLoading(true);
      setMessage("");
      const res = await requestStaffActivation();
      setMessage(res.data.detail || "Email aktivasi telah dikirim");
    } catch (err: any) {
      setMessage(err.response?.data?.detail || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 shadow rounded bg-white">
      <h1 className="text-xl font-bold mb-4">Aktivasi Staff</h1>
      <p className="mb-4">
        Klik tombol di bawah untuk menerima email aktivasi staff.
      </p>
      <button
        onClick={handleRequest}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400">
        {loading ? "Mengirim..." : "Kirim Email Aktivasi"}
      </button>
      {message && <p className="mt-4 text-sm">{message}</p>}
    </div>
  );
};

export default RequestStaffActivation;
