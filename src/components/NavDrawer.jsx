import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { NavLink } from "react-router-dom"

export const NavDrawer = ({ navLinks, setOpen }) => {
  return (
    <Box
      sx={{
        width: 250
      }}
    >
      <nav>
        <List>
          {navLinks.map(link => (
            <ListItem
              disablePadding
              key={link.text}
            >
              <ListItemButton
                component={NavLink}
                to={link.path}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>{link.icon}</ListItemIcon>
                <ListItemText primary={link.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </nav>
    </Box>
  )
}
