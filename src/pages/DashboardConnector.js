import React, { useState, useEffect } from "react";

import { makeStyles, Button, IconButton } from "@material-ui/core";
import { DateTimePicker } from "@material-ui/pickers";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { Dashboard } from "../components/Dashboard";
import { LayoutConnector } from "../views";
import { FormatDate, FormatDateTime } from "../helper/FormatDate";
import { AssignPro } from "../components/AssignPro";
import api, { handleError } from "../api";
import { useSnackbar } from "notistack";
import AddIcCallIcon from '@material-ui/icons/AddIcCall';


const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    marginBottom: theme.spacing(10),
  },
  datePicker: {
    width: '135px',
  },
  fixedHeight: {
    height: 240,
  },
  paperModal: {
    width: 700,
    maxWidth: "90vw",
    maxHeight: "90%",
    margin: "auto",
    marginTop: "60px",
    overflowY: "auto",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: "20px",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  button: {
    width: 'auto',
    fontSize: 12,
    paddingLeft: 2,
    paddingRight: 2,
  },
}));


export const DashboardConnector = () => {
  const classes = useStyles();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();


  const [open, setOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState([]);
  const [modalName, setModalName] = useState('');

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(null);

  const handleOpen = (ticket, name) => {
    setOpen(true);
    setSelectedTicket(ticket);
    setModalName(name);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    api
      .get(`ticket/ticket-list/?page=${page}`)
      .then((data) => {
        setTickets(data.results);
        // TODO: pageSize from backend
        setPageSize(Math.floor(data.count / 10));
      })
      .catch((err) => enqueueSnackbar(err.message, { variant: "error" }))
      .finally(() => setLoading(false));
  }, [open, page]);

  const dateParams = { selectedTicket, handleClose, modalName };
  const modalParams = { open, onModalClose: handleClose };

  return (
    <Dashboard
      Layout={LayoutConnector}
      classes={classes}
      tickets={tickets}
      loading={loading}
      pagination={{ pageSize, setPage }}
      modals={[
        {
          title: modalName,
          content: <AssignPro {...dateParams} />,
          ...modalParams,
        },
      ]}
      list={{
        title: "All Tickets",
        headers: [
          "Ticket ID",
          "Owner",
          "Create Date",
          "Appointment Date",
          "Phone Number",
          'Intake Call Date',
          'Intake Call',
          "Assign Pro",
        ],
        body: [
          (t) => t.id,
          (t) => `${t.owner.first_name} ${t.owner.last_name}`,
          (t) => FormatDate(t.created_at),
          (t) =>
            t?.appointment_date ? FormatDateTime(t.appointment_date) : "-",
          (t) => t.phone_number,
          (t) => (
            !t?.intake_call_date ?
              <Button
                onClick={() => handleOpen(t, 'Intake Call Date')}
                variant="outlined"
                color='primary'
                value="intake"
                className={classes.button}
              >
                Set Date
              </Button>
              :
              <DateTimePicker
                className={classes.datePicker}
                value={t?.intake_call_date}
                readOnly={t?.intake_call_date}
                format="DD/MM/yyyy HH:mm"
              />
          ),
          (t) => (
            t?.is_intake_call ?
              <CheckCircleIcon color='secondary' />
              :
              <IconButton onClick={() => handleOpen(t, 'Intake Call Done')}>
                < AddIcCallIcon color='primary' />
              </IconButton>
          ),
          (t) => (
            <Button
              onClick={() => handleOpen(t, 'Assign Pro')}
              variant="outlined"
              color={t?.pro ? "secondary" : "primary"}
              value="Choose"
              className={classes.button}
            >
              {t?.pro ? "Pro Assigned" : "Assign Pro"}
            </Button>
          ),
        ],
      }}
    />
  );
};
