import React, {useState} from 'react';
import {useParams, useLocation, useNavigate} from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Grid
} from '@mui/material';
import ItemsModal from '../home/itemsModal'; // Don't forget to import the ItemsModal

const CustomerDetails = () => {
  const {id} = useParams();
  const {state} = useLocation();
  const navigate = useNavigate();
  const data = state.data;

  // State for managing the open/closed state of the modal and the items to display
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);

  const handleOpenModal = (items) => {
    setItems(items);
    setOpen(true);
  };

  const handleCloseModal = (item) => {
    setOpen(false);
    if (item.Item) navigateToItemDetails(item.Item);
  };

  const navigateToItemDetails = (itemName) => {
    navigate(`/item/${itemName}`, {state: {data: data}});
  };

  // Filter the data to only include receipts from the customer with the current ID
  const customerData = data.filter(order => order.CustomerId === Number(id));
  const customerName = customerData[0]?.CustomerName;

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={12} sm={10} md={8} lg={6}>
        {customerData.length &&
          <>
            <Typography variant="h4" align="center">Customer: {customerName}</Typography>
            <Typography variant="h6" align="center">Customer ID: {id}</Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Order ID</TableCell>
                    <TableCell align="center">Date</TableCell>
                    <TableCell align="center">Total ($)</TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {customerData.map((order) => (
                    <TableRow key={order.OrderId}>
                      <TableCell component="th" scope="row">
                        {order.OrderId}
                      </TableCell>
                      <TableCell align="center">{new Date(order.Date).toLocaleString()}</TableCell>
                      <TableCell align="center">{order.Total}</TableCell>
                      <TableCell align="center">
                        <Button color="primary" onClick={() => handleOpenModal(order.Items)}>Details</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <ItemsModal items={items} open={open} handleClose={handleCloseModal} />
          </>
        }
      </Grid>
    </Grid>
  );
};

export default CustomerDetails;
