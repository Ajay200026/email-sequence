import React, { useCallback, useRef } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";

const initialNodes = [
  {
    id: "0",
    type: "input",
    data: {
      label: (
        <>
          Node
          <div className="node-icons">
            <span
              role="img"
              aria-label="Delete"
              onClick={() => handleDeleteNode("1")}
            >
              ❌
            </span>
            <span
              role="img"
              aria-label="Save"
              onClick={() => handleSaveNode("1")}
            >
              💾
            </span>
            <span
              role="img"
              aria-label="Edit"
              onClick={() => handleEditNode("1")}
            >
              ✏️
            </span>
            <span
              role="img"
              aria-label="Add"
              onClick={() => handleAddNode("1")}
            >
              ➕
            </span>
          </div>
        </>
      ),
    }, // Include icon
    position: { x: 0, y: 50 },
  },
];

let id = 1;
const getId = () => `${id++}`;

const Canvas = () => {
  const reactFlowWrapper = useRef(null);
  const connectingNodeId = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition } = useReactFlow();

  const handleNodeDelete = (nodeId) => {
    setNodes((nodes) => nodes.filter((node) => node.id !== nodeId));
    // Optionally remove connected edges here (refer to documentation)
  };

  const onConnect = useCallback((params) => {
    // reset the start node on connections
    connectingNodeId.current = null;
    setEdges((eds) => addEdge(params, eds));
  }, []);

  const onConnectStart = useCallback((_, { nodeId }) => {
    connectingNodeId.current = nodeId;
  }, []);

  const onConnectEnd = useCallback(
    (event) => {
      if (!connectingNodeId.current) return;

      const targetIsPane = event.target.classList.contains("react-flow__pane");

      if (targetIsPane) {
        // we need to remove the wrapper bounds, in order to get the correct position
        const id = getId();
        const newNode = {
          id,
          position: screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
          }),
          data: { label: `Node ${id}` },
          origin: [0.5, 0.0],
        };

        setNodes((nds) => nds.concat(newNode));
        setEdges((eds) =>
          eds.concat({ id, source: connectingNodeId.current, target: id })
        );
      }
    },
    [screenToFlowPosition]
  );

  const renderNode = ({ data }) => {
    const Icon = data.deleteIcon; // Access the delete icon
    return (
      <div className="node-wrapper">
        {/* Render your custom node content */}
        <span>{data.label}</span>
        <Icon onClick={() => handleNodeDelete(data.id)} />{" "}
        {/* Icon with deletion */}
      </div>
    );
  };

  return (
    <div className="wrapper w-[500px] h-[1000px]" ref={reactFlowWrapper}>
      {/* Other React Flow components */}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectStart={onConnectStart}
        onConnectEnd={onConnectEnd}
        fitView
        fitViewOptions={{ padding: 2 }}
        nodeOrigin={[0.5, 0]}
      />
    </div>
  );
};

export default () => (
  <ReactFlowProvider>
    <Canvas />
  </ReactFlowProvider>
);
