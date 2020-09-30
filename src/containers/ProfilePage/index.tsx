import { AmplifySignOut } from '@aws-amplify/ui-react'
import { Button, CardActions, CardContent, TextField } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { User } from 'src/interfaces/User'
import { updateUser } from 'src/providers/Amplify'

const Profile = ({ user }: { authState: string, user: User }) => {
  const [displayName, setDisplayName] = useState(user.displayName || '')

  function onDisplayNameUpdate () {
    try {
      updateUser({ 'custom:displayName': displayName }).then(result => {
        console.log(result)
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Grid container justify="center">
      <Grid item>
        <Card>
          <CardContent>
            <CardMedia>
              <Avatar src={user.photoUrl || 'https://api.adorable.io/avatars/285/abott@adorable.png'} />
            </CardMedia>
            <div className = "mt-6 mb-6">
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
              <p>{user.username}</p>
            </div>
          </CardContent>
          <CardActions>
            <AmplifySignOut />
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
