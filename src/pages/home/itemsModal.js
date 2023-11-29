import * as React from 'react';
import {
  Backdrop,
  Box,
  Modal,
  Fade,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper
} from '@mui/material';
import styled from "styled-components";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #fefefe',
  boxShadow: 24,
  p: 4,
};

const StyledTableCell = styled(TableCell)(() => ({
  cursor: 'pointer',
  '&:hover': {
    color: 'blue',
  },
}));

function ItemsModal({items, open, handleClose}) {
  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{backdrop: Backdrop}}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography id="modal-title" variant="h6" component="h2">
            Purchased Items
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{minWidth: 300}} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Item</TableCell>
                  <TableCell align="right">Price ($)</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((item, index) => (
                  <TableRow
                    key={index}
                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                    onClick={() => handleClose(item)}
                    hover={true}
                  >
                    <StyledTableCell component="th" scope="row">{item.Item}</StyledTableCell>
                    <StyledTableCell align="right">{item.ItemPrice}</StyledTableCell>
                    <StyledTableCell align="right">{item.Quantity}</StyledTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Fade>
    </Modal>
  );
}

export default ItemsModal;
