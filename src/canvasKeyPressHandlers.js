import helperFunctions from "./helperFunctions";

const handleKeyDown = (event, flags, setFlags) => {
  if (!flags.adding && event.ctrlKey && event.code === "KeyA") {
    setFlags({ ...flags, adding: true });
  }
  if (event.ctrlKey && event.code === "KeyV") {
    setFlags({ ...flags, sideBarVisible: !flags.sideBarVisible });
  }
  if (!flags.deleting && event.shiftKey && event.code === "KeyD") {
    setFlags({ ...flags, deleting: true });
  }
};

const handleKeyUp = (event, flags, setFlags) => {
  if (event.key === "Control" || event.code === "KeyA") {
    setFlags({ ...flags, adding: false });
  }
  if (event.key === "Shift" && event.code === "KeyD") {
    setFlags({ ...flags, deleting: false });
  }
};

const handleCanvasClick = (
  event,
  flags,
  setFlags,
  concepts,
  setConcepts,
  mapOffset
) => {
  event.preventDefault();
  if (flags.adding) {
    setFlags({ ...flags, adding: false });
    setConcepts(
      concepts.concat({
        name: "concept",
        id: helperFunctions.generateId(concepts),
        positionX: event.clientX - mapOffset.x,
        positionY: event.clientY - mapOffset.y,
        width: 100,
        height: 100,
      })
    );
  }
};

export default { handleKeyDown, handleKeyUp, handleCanvasClick };
