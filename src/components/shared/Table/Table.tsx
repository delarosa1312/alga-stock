import React, { useState } from "react";
import "./Table.scss";
import organizeData from "../../../utils/organizeDataForTable";
import {
  handleDragEnd,
  handleDragOver,
  handleDragStart,
  handleDrop,
} from "../../../utils/draggableCollumnForTable";
import Button from "../Button/Button";

export interface TableHeader {
  key: string;
  value: string;
  right?: boolean;
}

export declare interface TableProps {
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

  return (
    <table className="AppTable">
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th
              key={header.key}
              draggable
              onDragStart={(event) =>
                setDraggingIndex(handleDragStart(event, index))
              }
              onDragOver={(event) => handleDragOver(event, index)}
              onDragEnd={(event) => setDraggingIndex(handleDragEnd)}
              onDrop={(event) => {
                setHeaders(handleDrop(headers, event, index));
                setDraggingIndex(handleDragEnd);
              }}
              className={`${header.right ? "right" : ""} ${
                index === draggingIndex ? "dragging" : ""
              }`}
            >
              {header.value}
            </th>
          ))}
          {props.enableActions && <th className="right">Actions</th>}
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
              {props.enableActions && (
                <td className="actions right">
                  {props.onEdit && (
                    <Button onClick={() => props.onEdit && props.onEdit(row)}>
                      Edit
                    </Button>
                  )}
                  {props.onDetail && (
                    <Button
                      onClick={() => props.onDetail && props.onDetail(row)}
                    >
                      Detail
                    </Button>
                  )}
                  {props.onDelete && (
                    <Button
                      onClick={() => props.onDelete && props.onDelete(row)}
                    >
                      Delete
                    </Button>
                  )}
                </td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
