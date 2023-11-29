import * as React from 'react';
import {Alert, CircularProgress, Grid, Paper} from '@mui/material';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList} from 'recharts';

function formatDate(dateString) {
  const options = { month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

function TotalOrdersBarChart({data, loading, error}) {
  if (loading) {
    return (
      <Grid container alignItems="center" justifyContent="center">
        <CircularProgress/>
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

  const chartData = data.reduce((acc, d) => {
    const date = formatDate(d.Date);
    const total = parseFloat(d.Total.replace('$', ''));

    const existingDateData = acc.find(e => e.name === date);
    if (existingDateData) {
      existingDateData.total += total;
    } else {
      acc.push({name: date, total});
    }

    return acc;
  }, []);

  return (
    <Paper elevation={3} sx={{padding: 2}} data-testid="orders-chart">
      <ResponsiveContainer width="100%" height={500}>
        <BarChart data={chartData} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="name"/>
          <YAxis tickFormatter={(t) => `$${t}`}/>
          <Tooltip/>
          <Legend/>
          <Bar dataKey="total" name="Total Sales" fill="#1976d2">
            <LabelList dataKey="total" position="top" formatter={(value) => `$${value}`}/>
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
}

export default TotalOrdersBarChart;
