import React, { useState } from "react";

export const handleDragEnd = null;

export const handleDragStart = (
  event: React.DragEvent<HTMLTableCellElement>,
  index: number
) => {
  const dummyElement = document.createElement("div");
  event.dataTransfer.setData("text/plain", index.toString());
  event.dataTransfer.setDragImage(dummyElement, 0, 0);

  return index;
};

export const handleDragOver = (
  event: React.DragEvent<HTMLTableCellElement>,
  index: number
) => {
  event.preventDefault();
};

export const handleDrop = (
  headers: any[],
  event: React.DragEvent<HTMLTableCellElement>,
  index: number
) => {
  event.preventDefault();
  const dragIndex = event.dataTransfer.getData("text/plain");
  const newHeaders = [...headers];
  const [draggedHeader] = newHeaders.splice(Number(dragIndex), 1);
  newHeaders.splice(index, 0, draggedHeader);

  return newHeaders;
};
