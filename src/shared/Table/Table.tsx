import React, { useState } from "react";
import "./Table.scss";
import organizeData from "../../utils/organizeDataForTable";
export interface TableHeader {
  key: string;
  value: string;
  right?: boolean;
}

declare interface TableProps {
  headers: TableHeader[];
  data: any[];

  enableActions?: boolean;

  onDelete?: (item: any) => void;
  onDetail?: (item: any) => void;
  onEdit?: (item: any) => void;
}

const Table: React.FC<TableProps> = (props) => {
  const [headers, setHeaders] = useState(props.headers);
  const [organizedData, indexedHeaders] = organizeData(props.data, headers);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);

  const handleDragStart = (
    event: React.DragEvent<HTMLTableCellElement>,
    index: number
  ) => {
    const dummyElement = document.createElement("div");
    event.dataTransfer.setData("text/plain", index.toString());
    event.dataTransfer.setDragImage(dummyElement, 0, 0);

    setDraggingIndex(index);
  };

  const handleDragOver = (
    event: React.DragEvent<HTMLTableCellElement>,
    index: number
  ) => {
    event.preventDefault();
  };

  const handleDragEnd = () => {
    setDraggingIndex(null);
  };

  const handleDrop = (
    event: React.DragEvent<HTMLTableCellElement>,
    index: number
  ) => {
    event.preventDefault();
    const dragIndex = event.dataTransfer.getData("text/plain");
    const newHeaders = [...headers];
    const [draggedHeader] = newHeaders.splice(Number(dragIndex), 1);
    newHeaders.splice(index, 0, draggedHeader);
    setHeaders(newHeaders);
    setDraggingIndex(null);
  };

  return (
    <table className="AppTable">
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th
              key={header.key}
              draggable
              onDragStart={(event) => handleDragStart(event, index)}
              onDragOver={(event) => handleDragOver(event, index)}
              onDragEnd={handleDragEnd}
              onDrop={(event) => handleDrop(event, index)}
              className={`${header.right ? "right" : ""} ${
                index === draggingIndex ? "dragging" : ""
              }`}
            >
              {header.value}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {organizedData.map((row, i) => {
          return (
            <tr key={i}>
              {Object.keys(row).map((item, i) =>
                item !== "$original" ? (
                  <td
                    key={row.$original.id + i}
                    className={indexedHeaders[item].right ? "right" : ""}
                  >
                    {row[item]}
                  </td>
                ) : null
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
