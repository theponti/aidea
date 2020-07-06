import React, { useContext } from 'react'
import { signOut } from 'src/context/Firebase'
import { UserContext } from 'src/providers/UserProvider'

const ProfilePage = () => {
  const userContext = useContext(UserContext)
  const { displayName, email, photoUrl } = userContext || { displayName: '', email: '', photoUrl: '' }

  return (
    <div className = "mx-auto w-11/12 md:w-2/4 py-8 px-4 md:px-8">
      <div className="flex border flex-col items-center md:flex-row md:items-start border-blue-400 px-3 py-4">
        <div
          style={{
            background:
                `url(${photoUrl || 'https://res.cloudinary.com/dqcsk8rsc/image/upload/v1577268053/avatar-1-bitmoji_upgwhc.png'})  no-repeat center center`,
            backgroundSize: 'cover',
            height: '200px',
            width: '200px'
          }}
          className="border border-blue-300"
        ></div>
        <div className = "md:pl-4">
          <h2 className = "text-2xl font-semibold">{displayName}</h2>
          <h3 className = "italic">{email}</h3>
        </div>
      </div>
      <button
        className = "w-full py-3 bg-red-600 mt-4 text-white"
        onClick={signOut}
      >
        Sign out
      </button>
    </div>
  )
}
export default ProfilePage
