import React from "react";
import GraphView from "./GraphView";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      
      {/* HEADER */}
      <div className="px-8 py-6 border-b border-slate-800">
        <h1 className="text-2xl font-bold">
          Fraud Investigation Dashboard
        </h1>
        <p className="text-slate-400 mt-1">
          Money Muling Detection System
        </p>
      </div>

      <div className="p-8 space-y-10">

        {/* ================= STATS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Total Rings", value: "4" },
            { title: "Suspicious Accounts", value: "18" },
            { title: "Highest Risk", value: "95", color: "text-red-500" },
            { title: "Avg Risk", value: "76" }
          ].map((item, index) => (
            <div
              key={index}
              className="bg-slate-800 p-6 rounded-xl shadow"
            >
              <h3 className="text-sm text-slate-400">
                {item.title}
              </h3>
              <h2 className={`text-3xl mt-1 font-semibold ${item.color || ""}`}>
                {item.value}
              </h2>
            </div>
          ))}
        </div>

        {/* ================= FRAUD RINGS ================= */}
        <div className="bg-slate-800 p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">
            Fraud Rings
          </h2>

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
                {[
                  { id: "RING_001", pattern: "Cycle", members: 3, risk: 92 },
                  { id: "RING_002", pattern: "Fan-In", members: 11, risk: 81 },
                  { id: "RING_003", pattern: "Shell", members: 4, risk: 67 }
                ].map((ring, index) => (
                  <tr key={index} className="border-b border-slate-700">
                    <td className="py-3">{ring.id}</td>

                    <td>
                      <span className="bg-purple-600 px-3 py-1 rounded text-xs">
                        {ring.pattern}
                      </span>
                    </td>

                    <td>{ring.members}</td>

                    <td
                      className={
                        ring.risk >= 80
                          ? "text-red-500"
                          : ring.risk >= 60
                          ? "text-orange-400"
                          : "text-yellow-400"
                      }
                    >
                      {ring.risk}
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

        {/* ================= GRAPH ================= */}
        <div className="bg-slate-800 p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">
            Transaction Network Graph
          </h2>

          <div className="flex justify-center">
            <div className="w-full max-w-5xl h-[500px]">
              <GraphView />
            </div>
          </div>
        </div>

        {/* ================= SUSPICIOUS ACCOUNTS ================= */}
        <div className="bg-slate-800 p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">
            Suspicious Accounts
          </h2>

          <div className="space-y-4">
            {[
              { name: "ACC100", patterns: ["Cycle"], score: 87 },
              { name: "ACC500", patterns: ["Fan-In", "Fan-Out"], score: 78 },
              { name: "ACC702", patterns: ["Shell"], score: 65 }
            ].map((account, index) => (
              <div
                key={index}
                className="bg-slate-900 p-4 rounded-lg flex justify-between items-center"
              >
                <div>
                  <div className="font-semibold">{account.name}</div>

                  <div className="flex gap-2 mt-1">
                    {account.patterns.map((pattern, i) => (
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
                    account.score >= 80
                      ? "text-red-500 text-lg"
                      : account.score >= 60
                      ? "text-orange-400 text-lg"
                      : "text-yellow-400 text-lg"
                  }
                >
                  {account.score}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
