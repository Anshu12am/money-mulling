import React, { useEffect, useState } from "react";
import GraphView from "./GraphView";
import axios from "axios"; // Using axios for HTTP requests

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true); // optional loading state
  const [error, setError] = useState(null); // optional error handling

  useEffect(() => {
    // Replace this URL with your backend endpoint
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/dashboard");
        setData(response.data);
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading analysis...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  const { summary, fraud_rings, suspicious_accounts } = data;

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* HEADER */}
      <div className="px-8 py-6 border-b border-slate-800">
        <h1 className="text-2xl font-bold">Fraud Investigation Dashboard</h1>
        <p className="text-slate-400 mt-1">Money Muling Detection System</p>
      </div>

      <div className="p-8 space-y-10">
        {/* ================= STATS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Total Rings", value: summary.total_rings },
            { title: "Suspicious Accounts", value: summary.total_accounts },
            { title: "Highest Risk", value: summary.highest_risk, color: "text-red-500" },
            { title: "Avg Risk", value: summary.avg_risk }
          ].map((item, index) => (
            <div key={index} className="bg-slate-800 p-6 rounded-xl shadow">
              <h3 className="text-sm text-slate-400">{item.title}</h3>
              <h2 className={`text-3xl mt-1 font-semibold ${item.color || ""}`}>
                {item.value}
              </h2>
            </div>
          ))}
        </div>

        {/* ================= FRAUD RINGS ================= */}
        <div className="bg-slate-800 p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Fraud Rings</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b border-slate-700 text-slate-400 text-sm">
                <tr>
                  <th className="py-2">Ring ID</th>
                  <th className="py-2">Pattern</th>
                  <th className="py-2">Members</th>
                  <th className="py-2">Risk</th>
                  <th className="py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {fraud_rings.map((ring, index) => (
                  <tr key={index} className="border-b border-slate-700">
                    <td className="py-3">{ring.ring_id}</td>
                    <td>
                      <span className="bg-purple-600 px-3 py-1 rounded text-xs">
                        {ring.pattern_type}
                      </span>
                    </td>
                    <td>{ring.member_accounts.length}</td>
                    <td
                      className={
                        ring.risk_score >= 80
                          ? "text-red-500"
                          : ring.risk_score >= 60
                          ? "text-orange-400"
                          : "text-yellow-400"
                      }
                    >
                      {ring.risk_score}
                    </td>
                    <td>
                      <button className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm">
                        Highlight
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ================= SUSPICIOUS ACCOUNTS ================= */}
        <div className="bg-slate-800 p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Suspicious Accounts</h2>
          <div className="space-y-4">
            {suspicious_accounts.map((account, index) => (
              <div
                key={index}
                className="bg-slate-900 p-4 rounded-lg flex justify-between items-center"
              >
                <div>
                  <div className="font-semibold">{account.account_id}</div>
                  <div className="flex gap-2 mt-1">
                    {account.detected_patterns.map((pattern, i) => (
                      <span
                        key={i}
                        className="bg-blue-600 px-2 py-1 text-xs rounded"
                      >
                        {pattern}
                      </span>
                    ))}
                  </div>
                </div>
                <div
                  className={
                    account.suspicion_score >= 80
                      ? "text-red-500 text-lg"
                      : account.suspicion_score >= 60
                      ? "text-orange-400 text-lg"
                      : "text-yellow-400 text-lg"
                  }
                >
                  {account.suspicion_score}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= GRAPH ================= */}
        <div className="bg-slate-800 p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Transaction Network Graph</h2>
          <div className="flex justify-center">
            <div className="w-full max-w-5xl h-[500px]">
              <GraphView transactions={suspicious_accounts} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
