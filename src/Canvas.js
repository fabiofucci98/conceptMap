import { useEffect, useState } from "react";

const Concept = ({ concept }) => {
  return (
    <div
      className="concept"
      style={{
        position: "absolute",
        left: `${concept.position_x}px`,
        top: `${concept.position_y}px`,
      }}
    >
      <p className="concept-name">{concept.name}</p>
    </div>
  );
};

const Canvas = () => {
  const [concepts, setConcepts] = useState([]);

  const [state, setState] = useState(null);

  const generateId = () => {
    const maxId =
      concepts.length > 0
        ? Math.max(...concepts.map((concept) => concept.id))
        : 0;
    return maxId + 1;
  };

  const handleKeyDown = (event) => {
    if (event.ctrlKey && event.key.toLowerCase() === "a") {
      setState("add");
    }
  };

  const handleKeyUp = (event) => {
    if (state === "add" && event.ctrlKey && event.key.toLowerCase() === "a") {
      setState(null);
    }
  };

  const addConcept = (event) => {
    setConcepts(
      concepts.concat({
        name: "concept",
        id: generateId(),
        position_x: event.clientX,
        position_y: event.clientY,
      })
    );
  };

  const handleCanvasClick = (event) => {
    event.preventDefault();
    if (state === "add") {
      setState(null);
      addConcept(event);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  });

  return (
    <>
      <div onClick={handleCanvasClick} className="canvas">
        {concepts.map((concept) => (
          <Concept key={concept.id} concept={concept}></Concept>
        ))}
      </div>
    </>
  );
};

export default Canvas;
