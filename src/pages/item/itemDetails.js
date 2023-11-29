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
  Grid,
  Button,
  Link,
} from '@mui/material';
import ItemsModal from '../home/itemsModal'; // Import ItemsModal component

const ItemDetails = () => {
  const {name} = useParams();
  const {state} = useLocation();
  const navigate = useNavigate();
  const data = state.data;

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);

  const handleOpenModal = (items) => {
    setItems(items);
    setOpen(true);
  };

  const handleCloseModal = (item) => {
    setOpen(false);
    if (item.Item) navigateToItemDetails(item.Item)
  };

  const navigateToCustomerDetails = (customerId) => {
    navigate(`/customer/${customerId}`, {state: {data: data}});
  };

  const navigateToItemDetails = (itemName) => {
    navigate(`/item/${itemName}`, {state: {data: data}});
  };

  const itemOrders = data.flatMap(order =>
    order.Items.filter(item => item.Item === name)
      .map(item => ({...order, itemQuantity: item.Quantity}))
  );

  const totalOrdered = itemOrders.reduce((total, order) => total + parseInt(order.itemQuantity), 0);

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={12} sm={10} md={8} lg={6}>
        <Typography variant="h4" align="center">Item: {name}</Typography>
        <Typography variant="h6" align="center">Total {name}(s) Ordered: {totalOrdered}</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell align="center">Customer</TableCell>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Total {name}(s) Ordered</TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {itemOrders.map((order) => (
                <TableRow key={order.OrderId}>
                  <TableCell component="th" scope="row">
                    {order.OrderId}
                  </TableCell>
                  <TableCell align="center">
                    <Link
                      component="button"
                      onClick={() => navigateToCustomerDetails(order.CustomerId)}
                    >
                      {order.CustomerName}
                    </Link>
                  </TableCell>
                  <TableCell align="center">{new Date(order.Date).toLocaleString()}</TableCell>
                  <TableCell align="center">{order.itemQuantity}</TableCell>
                  <TableCell align="center">
                    <Button color="primary" onClick={() => handleOpenModal(order.Items)}>Details</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <ItemsModal items={items} open={open} handleClose={handleCloseModal}/>
      </Grid>
    </Grid>
  );
};

export default ItemDetails;
