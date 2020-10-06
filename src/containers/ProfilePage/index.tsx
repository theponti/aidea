import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import { Auth } from 'aws-amplify'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { User } from 'src/interfaces/User'
import { deleteUser, updateUser } from 'src/providers/Amplify'
import styles from './ProfilePage.module.scss'


const Profile = ({ user }: { authState: string, user: User }) => {
  const [displayName, setDisplayName] = useState(user.displayName || '')
  const [loading, setLoading] = useState(false)
  
  async function onDisplayNameUpdate () {
    try {      
      setLoading(true)
      
      await updateUser({ 'custom:displayName': displayName })

      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  if (loading) return <CircularProgress variant="indeterminate" color="primary" />

  return (
    <Grid container justify="center">
      <Grid item>
        <Card>
          <CardContent>
            <CardMedia>
              <Avatar 
                className={styles.avatar} 
                src={user.photoUrl || 'https://api.adorable.io/avatars/285/abott@adorable.png'} 
              />
            </CardMedia>
            <div className = {clsx("mt-6 mb-6", styles.details)}>
              {user.displayName
                ? <h2 className = "text-2xl font-semibold">{user.displayName}</h2>
                : (
                  <>
                    <TextField
                      placeholder="Enter display name"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                    />
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={onDisplayNameUpdate}
                    >
                      Set Name
                    </Button>
                  </>
                )
              }
              <h3 className = "italic">{user.email}</h3>
            </div>
          </CardContent>
          <CardActions>
            <Button 
                color="primary" 
                variant="contained"
                onClick={() => deleteUser(user.id)}
              >
              Delete Account
            </Button>
            <br/>
            <Button 
                color="primary" 
                variant="contained"
                onClick={() => Auth.signOut()}
              >
              Sign Out
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  )
}

Profile.propTypes = {
  authState: PropTypes.string,
  user: PropTypes.object
}

export default Profile
