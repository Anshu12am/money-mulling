// import React from "react";
// import ForceGraph2D from "react-force-graph-2d";

// const GraphView = ({ graphData }) => {
//   return (
//     <div className="w-full h-[600px] bg-gray-900 rounded-xl">
//       <ForceGraph2D
//         graphData={graphData}
        
//         // Show tooltip
//         nodeLabel={(node) =>
//           `Account: ${node.id}
//          Suspicious: ${node.suspicious ? "Yes" : "No"}
//          Ring: ${node.ring || "None"}`
//         }

//         // Color suspicious nodes
//         nodeColor={(node) =>
//           node.suspicious ? "red" : "#3b82f6"
//         }

//         // Bigger size for suspicious
//         nodeVal={(node) => (node.suspicious ? 8 : 4)}

//         // Arrow direction
//         linkDirectionalArrowLength={4}
//         linkDirectionalArrowRelPos={1}

//         // Click event
//         onNodeClick={(node) => {
//           alert(`Account: ${node.id}`);
//         }}
//       />
//     </div>
//   );
// };

// export default GraphView;
