import "./App.css";
import React from "react";
import ModalComponent from "./components/ModalComponent";
import TableComponent from "./components/TableComponent";
import { useState, useEffect } from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import {
  Checkbox,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@mui/material";

function App() {
  const [currDataBroker, setCurrDataBroker] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [dataBrokers, setDataBrokers] = useState([]);
  const [queryString, setQueryString] = useState("");
  const [checked, setChecked] = React.useState(false);

  const clickingTheCloseButton = () => {
    setShowModal(false);
  };

  const reloadBrokerData = async () => {
    const getURL = `http://localhost:4000/brokers`;
    const response = await fetch(getURL);
    const resultingData = await response.json();
    setDataBrokers(resultingData);
  };

  useEffect(() => {
    reloadBrokerData();
  }, []);

  const markComplete = async (broker) => {
    const putURL = `http://localhost:4000/brokers/${broker.id}/toggle`;
    const response = await fetch(putURL, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    });
    const resultingData = await response.json();
    console.log(resultingData);
    reloadBrokerData();
  };

  const filterResults = () => {
    setChecked(!checked);
    checked
      ? reloadBrokerData()
      : setDataBrokers(
          [...dataBrokers].filter((broker) => broker.optoutcomplete === false)
        );
  };

  return (
    <div className="App">
      <div>
        <h1>Data Broker Opt Out Checklist</h1>
        <FormControl>
          <InputLabel htmlFor="outlined-adornment-amount">Search...</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value={queryString}
            onChange={(e) => setQueryString(e.target.value)}
            label="Amount"
          />
        </FormControl>
        <Checkbox
          checked={checked}
          onChange={filterResults}
          inputProps={{ "aria-label": "controlled" }}
          type="checkbox"
        />
        Only Show Incomplete
      </div>
      <TableComponent
        dataBrokers={dataBrokers}
        setCurrDataBroker={setCurrDataBroker}
        queryString={queryString}
        setShowModal={setShowModal}
        markComplete={markComplete}
      />
      {currDataBroker ? (
        <ModalComponent
          currBroker={currDataBroker}
          showModal={showModal}
          onClickingTheCloseAlertDialogSlide={clickingTheCloseButton}
        />
      ) : null}
    </div>
  );
}

export default App;
