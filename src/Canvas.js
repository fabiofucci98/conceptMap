import { useState } from "react";
import moveHandlers from "./canvasMoveHandlers";
import canvasKeyPressHandlers from "./canvasKeyPressHandlers";

const Concept = ({ concept, mapOffset, handleConceptClick }) => {
  return (
    <div
      className="concept"
      style={{
        position: "absolute",
        left: `${concept.positionX - concept.width / 2 + mapOffset.x}px`,
        top: `${concept.positionY - concept.height / 2 + mapOffset.y}px`,
        width: `${concept.width}px`,
        height: `${concept.height}px`,
      }}
      onClick={(event) => handleConceptClick(event, concept.id)}
    >
      <p className="concept-name">{concept.name}</p>
    </div>
  );
};

const Canvas = () => {
  const [concepts, setConcepts] = useState([]);
  const [flags, setFlags] = useState({
    adding: false,
    sideBarVisible: false,
    moving: false,
    deleting: false,
  });
  const [mapOffset, setMapOffset] = useState({ x: 0, y: 0 });
  const sideBar = flags.sideBarVisible ? (
    <div className="side-bar"></div>
  ) : null;

  const handleConceptClick = (event, id) => {
    event.preventDefault();
    if (flags.deleting) {
      setConcepts(concepts.filter((concept) => concept.id !== id));
    }
  };

  return (
    <>
      <div
        onClick={(e) =>
          canvasKeyPressHandlers.handleCanvasClick(
            e,
            flags,
            setFlags,
            concepts,
            setConcepts,
            mapOffset
          )
        }
        onKeyDown={(e) =>
          canvasKeyPressHandlers.handleKeyDown(e, flags, setFlags)
        }
        onKeyUp={(e) => canvasKeyPressHandlers.handleKeyUp(e, flags, setFlags)}
        onMouseDown={(e) =>
          moveHandlers.handleMouseDown(e, flags, setFlags, mapOffset, concepts)
        }
        onMouseMove={(e) => {
          moveHandlers.handleMouseMove(e, flags, setMapOffset);
        }}
        onMouseUp={(e) =>
          moveHandlers.handleMouseUp(e, setMapOffset, flags, setFlags)
        }
        onMouseLeave={() =>
          setFlags({ ...flags, adding: false, moving: false })
        }
        className="canvas"
        tabIndex={0}
      >
        <div className="arrow"></div>
        {concepts.map((concept) => (
          <Concept
            key={concept.id}
            concept={concept}
            mapOffset={mapOffset}
            handleConceptClick={handleConceptClick}
          ></Concept>
        ))}
      </div>
      {sideBar}{" "}
    </>
  );
};

export default Canvas;
