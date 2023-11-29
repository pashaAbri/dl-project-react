import React from 'react';
import {CircularProgress, Grid, Typography, Alert, Paper} from "@mui/material";
import styled from "styled-components";

const Item = styled(Paper)(({theme}) => ({
  textAlign: 'center',
  padding: '5px',
}));

const TotalOrders = ({data}) => {
  const totalOrders = data.length;
  return <Typography variant="body1">{totalOrders}</Typography>;
}

const TotalSales = ({data}) => {
  const totalSales = data.reduce((sum, order) => {
    const orderTotal = Number(order.Total.replace("$", ""));
    return sum + orderTotal;
  }, 0);
  return <Typography variant="body1">${totalSales.toFixed(2)}</Typography>;
}

const AverageOrderValue = ({data}) => {
  const totalSales = data.reduce((sum, order) => {
    const orderTotal = Number(order.Total.replace("$", ""));
    return sum + orderTotal;
  }, 0);
  const averageOrderValue = data.length ? totalSales / data.length : 0;
  return <Typography variant="body1">${averageOrderValue.toFixed(2)}</Typography>;
}

export const ReceiptsStats = ({data, loading, error}) => {
  if (loading) {
    return (
      <Grid container spacing={2} justifyContent="center" margin="20px 0">
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
          <CircularProgress/>
        </div>
      </Grid>
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

  return (
    <Grid container spacing={2} justifyContent="center" margin="20px 0">
      <Grid item xs={12} md={12} lg={4}>
        <Item>
          <Typography variant="h6">Total Orders</Typography>
          <TotalOrders data={data}/>
        </Item>
      </Grid>
      <Grid item xs={12} md={12} lg={4}>
        <Item>
          <Typography variant="h6">Total Sales</Typography>
          <TotalSales data={data}/>
        </Item>
      </Grid>
      <Grid item xs={12} md={12} lg={4}>
        <Item>
          <Typography variant="h6">Average Order Value</Typography>
          <AverageOrderValue data={data}/>
        </Item>
      </Grid>
    </Grid>
  );
}

export default ReceiptsStats;
