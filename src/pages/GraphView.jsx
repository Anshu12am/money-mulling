import React from "react";
import ForceGraph2D from "react-force-graph-2d";

export default function GraphView() {
  const graphData = {
    nodes: [
      { id: "ACC100" },
      { id: "ACC200" },
      { id: "ACC300", suspicious: true },
      { id: "ACC400", suspicious: true },
      { id: "ACC500" },
      { id: "ACC600" }
    ],
    links: [
      { source: "ACC100", target: "ACC200" },
      { source: "ACC200", target: "ACC300" },
      { source: "ACC300", target: "ACC400" },
      { source: "ACC400", target: "ACC500" },
      { source: "ACC300", target: "ACC600" }
    ]
  };

  return (
    <div className="w-full h-full bg-slate-950 rounded-xl overflow-hidden">
      <ForceGraph2D
        graphData={graphData}
        width={900}     // control width
        height={500}    // control height
        backgroundColor="#020617"
        nodeLabel="id"

        // Disable interactions
        enableZoomInteraction={false}
        enablePanInteraction={false}
        enableNodeDrag={false}

        cooldownTicks={100}

        linkDirectionalParticles={2}
        linkDirectionalParticleSpeed={0.003}

        nodeCanvasObject={(node, ctx, globalScale) => {
          const label = node.id;
          const fontSize = 12 / globalScale;
          ctx.font = `${fontSize}px Sans-Serif`;

          ctx.fillStyle = node.suspicious ? "#ef4444" : "#3b82f6";
          ctx.beginPath();
          ctx.arc(node.x, node.y, 6, 0, 2 * Math.PI);
          ctx.fill();

          ctx.fillStyle = "white";
          ctx.fillText(label, node.x + 8, node.y + 3);
        }}
      />
    </div>
  );
}
