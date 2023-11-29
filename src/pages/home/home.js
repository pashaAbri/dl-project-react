import * as React from 'react';
import {Box, Grid} from "@mui/material";
import {useFetchData} from "../../services/fetchData";

import ReceiptsTable from "./receiptsTable";
import ReceiptsStats from './receiptsStats';
import TotalOrdersBarChart from './totalOrdersBarChart';

function Home() {
  // const url = "http://localhost:8080/receipts";
  const url = "https://api.theguai.com/receipts";
  const {data, loading, error} = useFetchData(url);

  return (
    <>
      <Grid container spacing={2} justifyContent="center">
        <ReceiptsStats data={data} loading={loading} />
      </Grid>
      <Grid container spacing={2} justifyContent="center" sx={{ display: 'flex', alignItems: 'stretch' }}>
        <Grid item xs={12} md={12} lg={6}>
          <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            <ReceiptsTable data={data} loading={loading} error={error}/>
          </Box>
        </Grid>
        <Grid item xs={12} md={12} lg={6}>
          <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            <TotalOrdersBarChart data={data} loading={loading} error={error}/>
          </Box>
        </Grid>
      </Grid>
    </>

  );
}

export default Home