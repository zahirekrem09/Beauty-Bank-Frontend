import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import {
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CardContent,
} from "@material-ui/core";

import { FormatDateTime } from "../helper/FormatDate";

const useStyles = makeStyles((theme) => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 800,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(10),
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(10),
      padding: theme.spacing(3),
    },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const TicketDetail = ({ selectedTicket }) => {
  // constants
  const classes = useStyles();

  return (
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TableContainer>
              <Table
                className={classes.table}
                aria-label="a dense table"
                size="small"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>{`${selectedTicket?.owner.username.charAt(0).toUpperCase() +
                      selectedTicket?.owner.username.slice(1)
                      }'s Ticket`}</TableCell>
                    //TODO: Burasi nasil duzeltilecek
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell> TicketID</TableCell>
                    <TableCell align="left">{selectedTicket?.id}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell> Appointment Date</TableCell>
                    <TableCell align="left">
                      {selectedTicket?.appointment_date &&
                        FormatDateTime(selectedTicket?.appointment_date)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <Grid item xs={12}>
              <CardContent style={{ alignItems: "center" }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Professional Info</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
              </CardContent>
            </Grid>

            {Number(selectedTicket.ticket_status) >= 2 ? (
              <TableContainer>
                <Table
                  className={classes.table}
                  aria-label="a dense table"
                  size="small"
                >
                  <TableBody>
                    <TableRow>
                      <TableCell>Full Name</TableCell>
                      <TableCell align="left">{`${selectedTicket?.pro_detail?.first_name} ${selectedTicket?.pro_detail?.last_name}`}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Company Name</TableCell>
                      <TableCell align="left">
                        {selectedTicket?.pro_detail?.company_name}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Phone Number</TableCell>
                      <TableCell align="left">
                        {selectedTicket?.pro_detail?.phone_number}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Email</TableCell>
                      <TableCell align="left">
                        {selectedTicket?.pro_detail?.email}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Zip Address</TableCell>
                      <TableCell align="left">
                        {selectedTicket?.pro_detail?.zip_address}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Address</TableCell>
                      <TableCell align="left">
                        {selectedTicket?.pro_detail?.address
                          ? selectedTicket?.pro_detail?.address
                          : "--"}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            ) : null}

            <Grid item xs={12}>
              <CardContent style={{ alignItems: "center" }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Connector Info</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
              </CardContent>
            </Grid>

            {Number(selectedTicket.ticket_status) >= 1 ? (
              <TableContainer>
                <Table
                  className={classes.table}
                  aria-label="a dense table"
                  size="small"
                >
                  <TableBody>
                    <TableRow>
                      <TableCell>Full Name</TableCell>
                      <TableCell align="left">{`${selectedTicket?.connector_detail?.first_name} ${selectedTicket?.connector_detail?.last_name}`}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Phone Number</TableCell>
                      <TableCell align="left">
                        {selectedTicket?.connector_detail?.phone_number}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Email</TableCell>
                      <TableCell align="left">
                        {selectedTicket?.connector_detail?.email}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            ) : null}
          </Grid>
        </Grid>
      </Paper>
    </main>
  );
};

export { TicketDetail };
