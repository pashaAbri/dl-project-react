import * as React from "react";
import {useNavigate} from "react-router-dom";
import {
  Alert,
  CircularProgress,
  Grid,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import ItemsModal from "./itemsModal";

function formatDate(dateString) {
  const options = {year: 'numeric', month: '2-digit', day: '2-digit'};
  return new Date(dateString).toLocaleDateString(undefined, options);
}

function createData(orderId, customerId, name, date, items, total) {
  return {
    id: orderId,
    customerId,
    name,
    date: formatDate(date),
    items,
    items_count: items.length,
    total
  };
}

const ReceiptsTable = ({data, loading, error}) => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedItems, setSelectedItems] = React.useState([]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <CircularProgress />
      </div>
    );
  }
  if (error) {
    return (
      <Grid container spacing={2} justifyContent="center" margin="20px 0">
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
          <Alert severity="error">{error}</Alert>
        </div>
      </Grid>
    );
  }

  const rows = data ? data.map((d) => createData(d.OrderId, d.CustomerId, d.CustomerName, d.Date, d.Items, d.Total)) : [];

  const navigateToCustomerDetails = (customerId) => {
    navigate(`/customer/${customerId}`, {state: {data: data}});
  };

  const navigateToItemDetails = (itemName) => {
    navigate(`/item/${itemName}`, {state: {data: data}});
  };

  const handleOpenModal = (items) => {
    setSelectedItems(items);
    setModalOpen(true);
  };

  const handleCloseModal = (item) => {
    setSelectedItems([]);
    setModalOpen(false);
    if (item.Item) navigateToItemDetails(item.Item);
  };

  return (
    <TableContainer component={Paper} elevation={3} sx={{ padding: 2 }}>
      <Table sx={{minWidth: 650}} aria-label="simple table" data-testid="receipts-table">
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell align="center">Date</TableCell>
            <TableCell align="center">Items (count)</TableCell>
            <TableCell align="right">Total ($)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{'&:last-child td, &:last-child th': {border: 0}}}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell>
                <Link
                  component="button"
                  onClick={() => navigateToCustomerDetails(row.customerId)}
                >
                  {row.name}
                </Link>
              </TableCell>
              <TableCell align="center">{row.date}</TableCell>
              <TableCell align="center">
                <Link
                  component="button"
                  onClick={() => handleOpenModal(row.items)}
                >
                  {row.items_count}
                </Link>
              </TableCell>
              <TableCell align="right">{row.total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ItemsModal items={selectedItems} open={modalOpen} handleClose={handleCloseModal}/>
    </TableContainer>
  );
}

export default ReceiptsTable;
