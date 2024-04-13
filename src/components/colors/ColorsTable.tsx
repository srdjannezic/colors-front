import { useState, useMemo, useEffect } from "react";
import { useTable, useSortBy, Cell } from "react-table";
import {
  Box,
  Table,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Paper,
} from "@mui/material";
import {
  Edit,
  Delete,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";
import ColorTypes from "../../types/types";
import ColorsFilter from "./ColorsFilter";

interface TableProps<Data extends object> {
  data: Data[];
  setOpenAddOrEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  setColor: React.Dispatch<React.SetStateAction<ColorTypes | null>>;
}

const ColorsTable = <Data extends ColorTypes>({
  data,
  setOpenAddOrEditModal,
  setOpenDeleteModal,
  setColor,
}: TableProps<Data>) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [colors, setColors] = useState([{}]);

  const columns: any = useMemo(
    () => [
      { Header: "Color Name", accessor: "name" },
      { Header: "Color Hex", accessor: "hex" },
    ],
    []
  );

  useEffect(() => {
    let localColors = data;
    if (searchTerm) {
      localColors = localColors.filter(
        (row: any) =>
          row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          row.hex.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setColors(localColors);
  }, [data, searchTerm]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: colors }, useSortBy);

  return (
    <Box sx={{ marginBottom: "40px" }}>
      <ColorsFilter setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
      <TableContainer component={Paper}>
        <Table {...getTableProps()} sx={{ minWidth: 650 }}>
          <TableHead>
            {headerGroups.map((headerGroup: any) => (
              <TableRow {...headerGroup.getHeaderGroupProps()} key="header">
                {headerGroup.headers.map((column: any) => (
                  <TableCell
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={column.id}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        fontWeight: "bold",
                      }}
                    >
                      {column.render("Header")}
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <KeyboardArrowDown />
                        ) : (
                          <KeyboardArrowUp />
                        )
                      ) : (
                        <KeyboardArrowDown />
                      )}
                    </Box>
                  </TableCell>
                ))}
                <TableCell key="actions" />
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()} key="body">
            {rows?.map((row: any) => {
              prepareRow(row);

              return (
                <TableRow {...row.getRowProps()} key={row.id}>
                  {row.cells.map((cell: Cell<Data>) => (
                    <TableCell {...cell.getCellProps()} key={cell.column.id}>
                      {cell.column.id === "hex" ? (
                        <Box
                          sx={{
                            backgroundColor: cell.value,
                            display: "inline-block",
                            padding: "5px 10px",
                            borderRadius: "12px",
                            color: "#fff",
                            border: "1px solid #000 ",
                          }}
                        >
                          {cell.render("Cell")}
                        </Box>
                      ) : (
                        cell.render("Cell")
                      )}
                    </TableCell>
                  ))}
                  <TableCell key="actions">
                    <Box display="flex" gap="5px" justifyContent="center">
                      <Edit
                        color="primary"
                        sx={{ cursor: "pointer" }}
                        onClick={() => {
                          setColor(row.original);
                          setOpenAddOrEditModal(true);
                        }}
                      />
                      <Delete
                        sx={{ color: "red", cursor: "pointer" }}
                        onClick={() => {
                          setColor(row.original);
                          setOpenDeleteModal(true);
                        }}
                      />
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ColorsTable;
