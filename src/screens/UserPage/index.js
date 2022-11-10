import { filter } from "lodash";
import { sentenceCase } from "change-case";
import { useState } from "react";
import Dashboard from "../Dashboard";
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from "@mui/material";
// components
import Label from "./label/Label";
import Iconify from "./iconify";
// import Scrollbar from "../components/scrollbar";
// sections
import { UserListHead, UserListToolbar } from "./user";
// mock
import USERLIST from "./ganerateFakeData";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "time", label: "Time (UTC)", alignRight: false },
  { id: "activity", label: "Activity", alignRight: false },
  { id: "strategy", label: "Strategy", alignRight: false },
  { id: "asset", label: "Asset", alignRight: false },
  { id: "amount", label: "Amount", alignRight: false },
  { id: "buying", label: "Buying(USD)", alignRight: false },
  { id: "value", label: "Value(USD)", alignRight: false },
  { id: "return", label: "Return", alignRight: false },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query, isTradedTransactionOnly) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_user) => _user.asset.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  if (isTradedTransactionOnly) {
    return filter(array, (_user) => _user.returns === "completed");
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function UserPage() {
  // const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [isTradedTransactionOnly, setisTradedTransactionOnly] = useState(false);

  // const handleOpenMenu = (event) => {
  //   setOpen(event.currentTarget);
  // };

  // const handleCloseMenu = () => {
  //   setOpen(null);
  // };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // const handleSelectAllClick = (event) => {
  //   if (event.target.checked) {
  //     const newSelecteds = USERLIST.map((n) => n.name);
  //     setSelected(newSelecteds);
  //     return;
  //   }
  //   setSelected([]);
  // };

  // const handleClick = (event, name) => {
  //   const selectedIndex = selected.indexOf(name);
  //   let newSelected = [];
  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, name);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(
  //       selected.slice(0, selectedIndex),
  //       selected.slice(selectedIndex + 1)
  //     );
  //   }
  //   setSelected(newSelected);
  // };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(
    USERLIST,
    getComparator(order, orderBy),
    filterName,
    isTradedTransactionOnly
  );

  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Dashboard>
        <Container>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={5}
          >
            <Typography variant="h4" gutterBottom>
              User
            </Typography>
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              New User
            </Button>
          </Stack>

          <Card>
            <UserListToolbar
              numSelected={selected.length}
              filterName={filterName}
              onFilterName={handleFilterByName}
              tradedTransactionCheckbox={(v) => {
                setisTradedTransactionOnly(v);
              }}
            />

            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  // onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const {
                        id,
                        name,
                        role,
                        returns,
                        strategy,
                        time,
                        activity,
                        amount,
                        buying,
                        asset,
                        value,
                        company,
                        avatarUrl,
                        isVerified,
                      } = row;
                      const selectedUser = selected.indexOf(name) !== -1;

                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={selectedUser}
                        >
                          <TableCell padding="checkbox" align="center">
                            {index + 1}
                            {/* <Checkbox
                              checked={selectedUser}
                              onChange={(event) => handleClick(event, name)}
                            />  */}
                          </TableCell>

                          <TableCell padding="10px" component="th" scope="row">
                            {new Date(time).toUTCString()}
                            {/* <Stack
                              direction="row"
                              alignItems="center"
                              spacing={2}
                            >
                              <Avatar alt={name} src={avatarUrl} />
                              <Typography variant="subtitle2" noWrap>
                                {name}
                              </Typography>
                            </Stack> */}
                          </TableCell>

                          <TableCell align="left">{activity}</TableCell>
                          <TableCell align="left">{strategy}</TableCell>
                          <TableCell align="left">{asset}</TableCell>
                          <TableCell align="left">{amount}</TableCell>
                          <TableCell align="left">{buying}</TableCell>
                          <TableCell align="left">{value}</TableCell>

                          <TableCell align="left">
                            <Label
                              color={
                                (returns === "failed" && "error") ||
                                (returns === "pending" && "warning") ||
                                "success"
                              }
                              endIcon={
                                returns === "failed" ? (
                                  <Iconify
                                    icon={"entypo:circle-with-cross"}
                                    sx={{ mr: 2 }}
                                  />
                                ) : returns === "pending" ? (
                                  <Iconify
                                    icon={"carbon:warning-square-filled"}
                                    sx={{ mr: 2 }}
                                  />
                                ) : (
                                  <Iconify
                                    icon={"teenyicons:tick-circle-outline"}
                                    sx={{ mr: 2 }}
                                  />
                                )
                              }
                            >
                              {sentenceCase(returns)}
                            </Label>
                          </TableCell>

                          {/* <TableCell align="right">
                            <IconButton
                              size="large"
                              color="inherit"
                              onClick={handleOpenMenu}
                            >
                              <Iconify icon={"eva:more-vertical-fill"} />
                            </IconButton>
                          </TableCell> */}
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: "center",
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete
                            words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredUsers.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        </Container>

        {/* <Popover
          open={Boolean(open)}
          anchorEl={open}
          onClose={handleCloseMenu}
          anchorOrigin={{ vertical: "top", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          PaperProps={{
            sx: {
              p: 1,
              width: 140,
              "& .MuiMenuItem-root": {
                px: 1,
                typography: "body2",
                borderRadius: 0.75,
              },
            },
          }}
        >
          <MenuItem>
            <Iconify icon={"eva:edit-fill"} sx={{ mr: 2 }} />
            Edit
          </MenuItem>

          <MenuItem sx={{ color: "error.main" }}>
            <Iconify icon={"eva:trash-2-outline"} sx={{ mr: 2 }} />
            Delete
          </MenuItem>
        </Popover> */}
      </Dashboard>
    </>
  );
}
