let center = { x: 0, y: 0 };
let localOffset = { x: 0, y: 0 };

const handleMouseDown = (event, flags, setFlags, mapOffset, concepts) => {
  const conceptClicked = (concept) => {
    const [startX, stopX, startY, stopY] = [
      concept.positionX + mapOffset.x - concept.width / 2,
      concept.positionX + mapOffset.x + concept.width / 2,
      concept.positionY + mapOffset.y - concept.height / 2,
      concept.positionY + mapOffset.y + concept.height / 2,
    ];
    if (
      event.clientX > startX &&
      event.clientX < stopX &&
      event.clientY > startY &&
      event.clientY < stopY
    ) {
      return true;
    } else return false;
  };

  if (
    !flags.adding &&
    concepts.filter((concept) => conceptClicked(concept)).length === 0
  ) {
    setFlags({ ...flags, moving: true });
    center = { x: event.clientX, y: event.clientY };
    localOffset = { ...mapOffset };
  }
};
const handleMouseMove = (event, flags, setMapOffset) => {
  if (flags.moving) {
    setMapOffset({
      x: localOffset.x + event.clientX - center.x,
      y: localOffset.y + event.clientY - center.y,
    });
  }
};
const handleMouseUp = (event, setMapOffset, flags, setFlags) => {
  if (flags.moving && !flags.adding) {
    setFlags({ ...flags, moving: false });
    setMapOffset({
      x: localOffset.x + event.clientX - center.x,
      y: localOffset.y + event.clientY - center.y,
    });
    center = { x: 0, y: 0 };
  }
};

export default { handleMouseDown, handleMouseMove, handleMouseUp };
