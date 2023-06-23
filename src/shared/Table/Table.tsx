import React from "react";
import "./Table.scss";

const Table = () => {
  return (
    <table className="AppTable">
      <thead>
        <tr>
          <th className="left">Product</th>
          <th className="center">Price</th>
          <th className="right">Stock</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="left">Cookie</td>
          <td>$1.25</td>
          <td className="right">23</td>
        </tr>
        <tr>
          <td className="left">Milk</td>
          <td>$0.93</td>
          <td className="right">10</td>
        </tr>
        <tr>
          <td className="left">Cookie</td>
          <td>$1.25</td>
          <td className="right">23</td>
        </tr>
        <tr>
          <td className="left">Milk</td>
          <td>$0.93</td>
          <td className="right">10</td>
        </tr>
        <tr>
          <td className="left">Cookie</td>
          <td>$1.25</td>
          <td className="right">23</td>
        </tr>
        <tr>
          <td className="left">Milk</td>
          <td>$0.93</td>
          <td className="right">10</td>
        </tr>
        <tr>
          <td className="left">Cookie</td>
          <td>$1.25</td>
          <td className="right">23</td>
        </tr>
        <tr>
          <td className="last-left">Milk</td>
          <td>$0.93</td>
          <td className="last-right">10</td>
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
