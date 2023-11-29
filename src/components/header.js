import * as React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  AppBar,
  CssBaseline,
  Divider,
  Drawer,
  Toolbar,
  Typography,
  Button,
  List,
  ListItem,
  ListItemButton,
  IconButton,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const drawerWidth = 240;

function Header(props) {
  const {window, navItems} = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const navItemsToShow = navItems.filter((item) => item.showOnHeader);

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{textAlign: 'center'}}>
      <Typography variant="h6" sx={{my: 2}}>
        Welcome to GUAI
      </Typography>
      <Divider/>
      <List>
        {navItemsToShow.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton sx={{textAlign: 'center'}}>
              <ListItemText primary={item.name}/>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box>
      <CssBaseline/>
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{mr: 2, display: {sm: 'none'}}}
          >
            <MenuIcon/>
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{flexGrow: 1, display: {xs: 'none', sm: 'block'}}}
          >
            Welcome to GUAI
          </Typography>
          <Box sx={{display: {xs: 'none', sm: 'block'}}}>
            {navItemsToShow.map((item) => (
              <Button
                key={item.name}
                sx={{color: '#fff'}}
                href={item.path}
              >
                {item.name}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: {xs: 'block', sm: 'none'},
            '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

Header.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Header;
