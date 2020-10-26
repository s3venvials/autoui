import React, { useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  typography: {
    marginTop: "4em",
  },
  alert: {
    margin: "0.5em"
  }
});

export default function TestRunnerTable(props) {
  const classes = useStyles();
  const [tests, setTests] = useState([]);
  const [disabled, isDisabled] = useState(false);
  const socket = io("http://localhost:5001");
  const [err, setErr] = useState("");

  useEffect(() => {
    axios
      .get("/api/tests")
      .then((res) => {
        setTests([...res.data]);
      })
      .catch((error) => {
        setErr(error.toString());
      });
  }, []);

  socket.on("code", function (code) {
    if (code === 0) {
      isDisabled(false);
    } else {
      setErr("There was an issue processing your request");
    }
    isRunning(false);
  });

  const isRunning = (value) => props.isRunning(value);

  const handleTestRun = (fileName) => {
    axios
      .post("/api/run", { fileName })
      .then((res) => {
        isRunning(true);
        isDisabled(true);
      })
      .catch((error) => {
        setErr(error.toString());
      });
  };

  return (
    <>
      <Typography variant="h5" className={classes.typography}>
        Test Runner
      </Typography>

      {err && <Alert severity="error" className={classes.alert}>{err}</Alert>}

      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Test Name</TableCell>
              <TableCell>Run Test</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tests.map((item, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{item}</TableCell>
                  <TableCell>
                    <Button
                      disabled={disabled}
                      onClick={() => handleTestRun(item)}
                      variant="outlined"
                      color="primary"
                    >
                      Run
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
