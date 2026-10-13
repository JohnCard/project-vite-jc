import { Menu } from '@mui/icons-material'
import { AppBar, Box, Button, Drawer, IconButton, Toolbar, Typography } from '@mui/material'
import { NavLink } from 'react-router-dom'
import React, { useState } from 'react'
import { NavDrawer } from '../components/NavDrawer'

export const Nav = ({ navLinks }) => {
    const [open, setOpen] = useState(false)

  return  <>
        <AppBar
            position='static'
        >
            <Toolbar>
                <IconButton
                    color='inherit'
                    size='large'
                    sx={{
                        display: {
                            xs: 'flex',
                            sm: 'none'
                        }
                    }}
                    onClick={() => setOpen(true)}
                >
                    <Menu/>
                </IconButton>
                <Typography
                    variant='h6'
                    sx={{
                        flexGrow: 1
                    }}
                >News</Typography>
                <Box
                    sx={{
                        display: {
                            xs: 'none',
                            sm: 'flex'
                        }
                    }}
                >
                    {navLinks.map(link => (
                        <Button
                            color='inherit'
                            key={link.text}
                            component={NavLink}
                            to={link.path}
                        >{link.text}</Button>
                    ))}
                </Box>
            </Toolbar>
        </AppBar>
        <Drawer
            anchor='left'
            onClose={() => setOpen(false)}
            open={open}
        >
            <NavDrawer navLinks={navLinks} setOpen={setOpen} />
        </Drawer>
    </>
}
