import { AmplifySignOut } from '@aws-amplify/ui-react'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'
import React from 'react'
import { User } from 'src/interfaces/User'

const Profile = ({ user }: { authState: string, user: User }) => {
  if (!user) return null

  return (
    <Grid container justify="center">
      <Grid item>
        <div
          style={{
            background: `url(${user.photoUrl})  no-repeat center center`,
            backgroundSize: 'cover',
            height: '200px',
            width: '200px'
          }}
          className="border border-blue-300"
        ></div>
        <div className = "md:pl-4">
          <h2 className = "text-2xl font-semibold">{user.displayName}</h2>
          <h3 className = "italic">{user.email}</h3>
        </div>
        <AmplifySignOut />
      </Grid>
    </Grid>
  )
}

Profile.propTypes = {
  authState: PropTypes.string,
  user: PropTypes.object
}

export default Profile
