import { Button, Box, AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useState } from "react";

function TopBar(){
    const navigate = useNavigate();
    
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    const handleSpeech = () => {
        setAnchorEl(null);
        navigate("/speech");
    }
    const handleTranslate = () => {
        setAnchorEl(null);
        navigate("/translate");
    }
    const handleReturn = () => {
      setAnchorEl(null);
      navigate("/");
    }
  
    return (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="sticky">
            <Toolbar sx={{justifyContent: 'center',}}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={handleClick}
                >
                  <MenuIcon />
              </IconButton>
              <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
        <MenuItem onClick={handleSpeech}>Book2Speech</MenuItem>
        <MenuItem onClick={handleTranslate}>Translate!</MenuItem>
              </Menu>
              <div justifyContent='center'>
                  <Button variant="text" onClick={handleReturn}>
                    <Typography variant="h3" component="div" sx={{ flexGrow: 1, textAlign:"center", color:"white" }}>
                      Access Book
                    </Typography>
                    </Button>
              </div>
          </Toolbar>
        </AppBar>
      </Box>

    )
}
export default TopBar;