import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { Email, Link } from "@mui/icons-material";

export default function StickyHeadTable({
  dataBrokers,
  setCurrDataBroker,
  queryString,
  setShowModal,
  markComplete,
}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  interface Column {
    id: "website" | "optout" | "removal" | "size";
    label: string;
    minWidth?: number;
    align?: "right";
  }

  const columns: Column[] = [
    { id: "website", label: "Website", minWidth: 170 },
    { id: "optout", label: "Opt Out Link", minWidth: 100 },
    {
      id: "removal",
      label: "Removal Instructions",
      minWidth: 170,
      align: "left",
    },
    {
      id: "size",
      label: "Complete?",
      minWidth: 170,
      align: "left",
    },
  ];

  const getOptOutContent = (broker) => {
    if (broker.optoutlink.search(/^http[s]?:\/\//) !== -1) {
      return (
        <Button
          href={broker.optoutlink}
          rel={"noreferrer"}
          startIcon={<Link />}
          target={"_blank"}
          type="button"
          variant="outlined"
        >
          Link
        </Button>
      );
    } else if (
      broker.optoutlink.search(
        /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi
      ) !== -1
    ) {
      return (
        <Button
          href={`mailto:` + broker.optoutlink}
          rel={"noreferrer"}
          startIcon={<Email />}
          target={"_blank"}
          type="button"
          variant="outlined"
        >
          Email
        </Button>
      );
    } else {
      return "Follow Instructions";
    }
  };

  const instructionButtonClick = (broker) => {
    const currentBrokerIndex = dataBrokers.findIndex(
      (dataBroker) => dataBroker.companyname === broker.companyname
    );

    setCurrDataBroker(currentBrokerIndex);
    setShowModal(true);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 560 }} className="broker-table">
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {dataBrokers
              .sort((a, b) => a.companyname.localeCompare(b.companyname))
              .filter((broker) =>
                broker.companyname
                  .toLowerCase()
                  .includes(queryString.toLowerCase())
              )
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((broker) => (
                <TableRow key={broker.id}>
                  <TableCell>{broker.companyname}</TableCell>

                  <TableCell>{getOptOutContent(broker)}</TableCell>

                  <TableCell>
                    <Button
                      key={broker.companyname}
                      onClick={() => instructionButtonClick(broker)}
                      type="button"
                      variant="outlined"
                    >
                      {`${broker.companyname} Instructions`}
                    </Button>
                  </TableCell>

                  <TableCell>
                    <Button
                      key={broker.optoutcomplete}
                      onClick={() => markComplete(broker)}
                      startIcon={
                        broker.optoutcomplete ? <CheckIcon /> : <CloseIcon />
                      }
                      type="button"
                      variant="outlined"
                    >
                      {broker.optoutcomplete ? "Complete" : "Incomplete"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={dataBrokers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
