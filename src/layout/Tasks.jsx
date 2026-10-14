import { Box, Button, Checkbox, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { Task } from '../components/Task'
import axios from 'axios'
import { useSnackbar  } from 'notistack'

const token = import.meta.env.VITE_TOKEN
// const fakeResolve = () => new Promise(resolve => setTimeout(resolve, 3000))
const baseUrl = 'http://127.0.0.1:8000/'
const initialTask = {
  name: '',
  description: '',
  due_date: '',
  priority: 'Normal',
  user: '',
  checked: false
}

export const Tasks = () => {
  const [loading, setLoading] = useState(true)
  const [usersLoading, setUsersLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [tasks, setTasks] = useState([])
  const [users, setUsers] = useState([])
  const [userId, setUserId] = useState('')
  const [method, setMethod] = useState('')
  const [task, setTask] = useState(initialTask)
  const [taskDialog, setTaskDialog] = useState(false)
  const [title, setTitle] = useState('Failed tasks data request!')
  const { enqueueSnackbar } = useSnackbar()

  const deleteTask = (id) => {
    axios.delete(baseUrl+'tasks/task/'+id, {
      headers: {
        Authorization: `Token ${token}`
      }
    })
    setTasks(prev => prev.filter(task => task.id != id))
    enqueueSnackbar('Successful delete method!', {
      variant: 'error',
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'right'
      }
    })
  }

  const getTask = async (id) => {
    const response = await fetch(baseUrl+'tasks/task-retrieve/'+id, {
      headers: {
        'Authorization': `Token ${token}`
      }
    })
    const data = await response.json()
    let due_date = new Date(data.due_date)
    due_date = due_date.toLocaleString('en-US', {
      dateStyle: 'long',
      timeStyle: 'short'
    })
    setTask({...data, due_date: due_date})
  }

  const openDialog = (methodName, id) => {
    setMethod(methodName)
    setUserId(id)
    if(id != '') {
      let idTask = {...tasks.find(task => task.id == id)}
      console.log(idTask.due_date)
      setTask({...idTask, user: idTask.user.id})
    }
    setOpen(true)
  }

  const openTaskDialog = (id) => {
    getTask(id)
    setTaskDialog(true)
  }

  const closeDialog = (dialogCloseMethod) => {
    dialogCloseMethod(false)
    setTask(initialTask)
  }

  const handleSubmit = e => {
    e.preventDefault()

    let body = JSON.stringify(task)
    fetch(baseUrl+'tasks/task/'+userId, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: body
    })
      .then(response => response.json())
      .then(data => {
        switch (method){
          case 'put':
            setTasks(prev => prev.map(task => task.id == userId ? {...task, ...data} : task))
            break
          case 'post':
            setTasks(prev => [...prev, data])
            break
        }
        console.log(data)
        enqueueSnackbar(`successful ${method} method!`, {
          variant: 'success',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right'
          }
        })
      })
      .catch(error => console.error(error))
      .finally(() => {
        setOpen(false)
        setTask(initialTask)
      })
  }

  const fetchTasks = () => {
    axios
    .get(baseUrl+'tasks/tasks', {
      headers: {
        Authorization: `Token ${token}`
      }
    })
    .then( async (response) => {
      const results = await response.data.results
      setTasks(results)
      setTitle('Jira simulator')
      enqueueSnackbar('Successfully tasks data loaded and set!', {
        variant: 'success',
        anchorOrigin: {
          horizontal: 'right',
          vertical: 'top'
        }
      })
    })
    .catch(error => console.error(error))
    .finally(() => {
      setLoading(false)
    })
  }

  const getUsers = () => {
    axios
      .get(baseUrl+'accounts/username-list', {
        headers: {
          Authorization: `Token ${token}`
        }
      })
        .then(async (response) => {
          const results = await response.data
          setUsers(results)
        })
        .catch(error => console.error(error))
        .finally(() => setUsersLoading(false))
  }

  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
    fetchTasks()
  }, [])

  return <Container
      maxWidth='xl'
      sx={{
        mt: 4
      }}
    >
      <Dialog open={open} onClose={() => closeDialog(setOpen)}>
        <DialogTitle>Create/Update Task</DialogTitle>
        <DialogContent>
          <Box
            component='form'
            onSubmit={handleSubmit}
            id='user-form'
            sx={{
              display: 'grid',
              gap: 1,
              width: '40ch'
            }}
          >
            <InputLabel id='name-label'>Nombre</InputLabel>
            <TextField
              id='name'
              name='name'
              label='name'
              labelid='name-label'
              value={task.name}
              onChange={e => setTask(prev => ({...prev, name: e.target.value}))}
            />
            <InputLabel id='description-label'>Descripción</InputLabel>
            <TextField
              id='description'
              name='description'
              label='description'
              labelid='description-label'
              value={task.description}
              onChange={e => setTask(prev => ({...prev, description: e.target.value}))}
            />
            <InputLabel id='due-date-label'>Due date</InputLabel>
            <TextField
              //todo additional params
              id='due-date'
              name='due-date'
              label='due-date'
              //* required params
              type='datetime-local'
              labelid='due-date-label'
              // slotProps: permite configurar elementos internos del TextField.
              // inputLabel: hace referencia a la etiqueta (label="Fecha y hora").
              // shrink: true: obliga a que la etiqueta permanezca arriba, en lugar de colocarse dentro del campo.
              slotProps={{
                inputLabel: { shrink: true }
              }}
              value={task.due_date.replace('Z', '')}
              onChange={e => setTask(prev => ({...prev, due_date: e.target.value}))}
            />
            <FormControlLabel control={<Checkbox checked={task.checked} onChange={e => setTask(prev => ({...prev, checked: e.target.checked}))} />} label='Check task' />
            <InputLabel id='user-label'>Usuario</InputLabel>
            <Select
              //todo additional params
              id='user'
              name='user'
              label='user'
              //* required params
              labelid='user-label'
              // variant='standard'
              value={task.user}
              onChange={e => setTask(prev => ({...prev, user: e.target.value}))}
            >
              {users.map(user => <MenuItem key={user.id} value={user.id}>{user.username}</MenuItem>)}
              {/* {users.map(user => <MenuItem key={user.id} value={{id: user.id, username: user.username}}>{user.username}</MenuItem>)} */}
            </Select>
            <InputLabel id='priority-label'>Nivel de prioridad</InputLabel>
            <Select
              id='priority'
              name='priority'
              label='priority'
              labelid='priority-label'
              value={task.priority}
              onChange={e => setTask(prev => ({...prev, priority: e.target.value}))}
            >
              <MenuItem value='Low'>Baja</MenuItem>
              <MenuItem value='Normal'>Normal</MenuItem>
              <MenuItem value='Medium'>Media</MenuItem>
              <MenuItem value='High'>Alta</MenuItem>
              <MenuItem value='Immediate'>Inmediata</MenuItem>
            </Select>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            form='user-form'
            type='submit'
          >
            Enviar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        aria-describedby='dialog-task'
        aria-labelledby='dialog-task'
        aria-description='dialog-task-descriptive'
        role='dialog'
        open={taskDialog}
        onClose={() => closeDialog(setTaskDialog)}
      >
        <DialogTitle>{task.name}</DialogTitle>
        <DialogContent>
          <DialogContentText>{task.description}</DialogContentText>
          <DialogContentText>Assigned for {task.user.username}</DialogContentText>
          <DialogContentText>Due date {task.due_date}</DialogContentText>
          <DialogContentText>Priority level - {task.priority}</DialogContentText>
          <DialogContentText>State - {task.checked ? 'Done' : 'True'}</DialogContentText>
        </DialogContent>
      </Dialog>
      <Typography
        variant='h2'
        component='h1'
      >{title}</Typography>
      <Button
        variant='contained'
        color='info'
        onClick={() => openDialog('post', '')}
      >Crear</Button>
      <Box
        sx={{
          mt: 2,
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 90%), 1fr))',
          gap: 2
        }}
      >
        {tasks.map(task => <Task task={task} key={task.id} openDialog={openDialog} deleteTask={deleteTask} openTaskDialog={openTaskDialog} />)}
      </Box>
    </Container>
  }
