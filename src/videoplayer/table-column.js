import React, { Component } from "react";
import { TableHead, TableRow, TableCell } from "@material-ui/core";
import "./videoplayer.css";

class TableColumn extends Component {
  state = {};
  render() {
    const { columnNames } = this.props;
    return (
      <TableHead>
        <TableRow>
          {columnNames.map((columnName) => {
            return (
              <TableCell className="cell-column-style">{columnName}</TableCell>
            );
          })}
        </TableRow>
      </TableHead>
    );
  }
}

export default TableColumn;
