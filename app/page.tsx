"use client";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import Modal from "./modal";

export default function Home() {
  const [invoices, setInvoices] = useState([]);
  const [creditNote, setCreditNote] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentCreditNote, setCurrentCreditNote] = useState([]);
  const [activeModal, setActiveModal] = useState(false);
  const handleClickOpen = (invoiceId: string) => {
    setOpen(true);
    setCurrentCreditNote(
      creditNote.filter((invoice: any) => invoice.reference === invoiceId)
    );
  };

  useEffect(() => {
    const getInvoices = async () => {
      try {
        const response = await fetch(
          "https://recruiting.api.bemmbo.com/invoices/pending",
          {
            method: "GET",
            redirect: "follow",
          }
        );
        const info = await response.json();

        const filteredInvoices = info.filter(
          (invoice: any) => invoice.type === "received"
        );

        const filteredCreditNotes = info.filter(
          (invoice: any) => invoice.type === "credit_note"
        );

        setInvoices(filteredInvoices);
        setCreditNote(filteredCreditNotes);
      } catch (error) {
        console.log(error);
      }
    };

    getInvoices();
  }, []);
  return (
    <div>
      <h3>Selecciona una factura</h3>
      <TableContainer
        component={Paper}
        sx={{ maxWidth: 650, alignItems: "center", margin: "auto" }}
      >
        <Table aria-label="simple table">
          <TableBody>
            {invoices.map((row: any) => (
              <TableRow
                onClick={() => {
                  handleClickOpen(row.id);
                }}
                hover
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">
                  {row.string_id}({row.organization_id})
                </TableCell>
                <TableCell align="center">{row.amount}</TableCell>
                <TableCell align="right">{row.type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      {open && currentCreditNote.length > 0 ? (
        <div>
          <TableContainer
            component={Paper}
            sx={{ maxWidth: 650, alignItems: "center", margin: "auto" }}
          >
            <h3>Selecciona una nota de crédito</h3>

            <Table aria-label="simple table">
              <TableBody>
                {currentCreditNote.map((row: any) => (
                  <TableRow
                    onClick={() => {}}
                    hover
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">
                      <input
                        type="checkbox"
                        className="checkbox-round"
                        name={row.id}
                      />
                    </TableCell>
                    <TableCell align="left">{row.organization_id}</TableCell>
                    <TableCell align="center">{row.amount}</TableCell>
                    <TableCell align="right">{row.type}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <br />
          <Box textAlign="center">
            <Button
              sx={{ backgroundColor: "purple" }}
              variant="contained"
              onClick={(e) => setActiveModal(true)}
            >
              Asignar
            </Button>
          </Box>

          {activeModal ? (
            <div onClick={(e) => setActiveModal(false)}>
              <Modal isOpen={true} />{" "}
            </div>
          ) : (
            <div></div>
          )}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
