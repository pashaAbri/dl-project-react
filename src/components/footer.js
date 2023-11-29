import React from 'react';
import BottomNavigation from "@mui/material/BottomNavigation"
import {BottomNavigationAction, Paper} from "@mui/material";
import {Home} from "@mui/icons-material";

export default function Footer() {
    return (
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
        >
          <BottomNavigationAction label="Home" href="/" icon={<Home />} />
        </BottomNavigation>
      </Paper>
    )
}