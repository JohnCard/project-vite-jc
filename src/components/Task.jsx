import { Button, Card, CardActions, CardContent, Typography } from '@mui/material'

export function Task({ task, openDialog, deleteTask, openTaskDialog }) {
  const { id, user, name, description, due_date, checked, priority } = task
  
  const userName = user.username
  
  let date = new Date(due_date)
  date = date.toLocaleString('es-MX', {
    dateStyle: 'long',
    timeStyle: 'short'
  })

  return <Card>
    <CardContent>
      <Typography component='h5' variant='h5'>{name}</Typography>
      <Typography variant='body2' component='p'>Assigned to {userName}</Typography>
      <Typography variant='body1' component='p'>Due date - {date}</Typography>
      <Typography variant='body2' component='p'>{description}</Typography>
      <Typography variant='body2' component='p'>{checked ? 'Done' : 'Pending'}</Typography>
      <Typography variant='body2' component='p'>priority level - {priority}</Typography>
    </CardContent>
    <CardActions>
      <Button color='info' variant='outlined' onClick={() => openDialog('put', id)}>Update</Button>
      <Button color='error' variant='outlined' onClick={() => deleteTask(id)}>Delete</Button>
      <Button color='success' variant='outlined' onClick={() => openTaskDialog(id)}>Get</Button>
    </CardActions>
  </Card>
}
