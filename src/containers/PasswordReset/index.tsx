import { Link } from '@reach/router'
import React, { ChangeEvent, MouseEvent, useState } from 'react'
import { auth } from 'src/actions'

const PasswordReset = () => {
  const [email, setEmail] = useState('')
  const [emailHasBeenSent, setEmailHasBeenSent] = useState(false)
  const [error, setError] = useState('')

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    if (name === 'userEmail') {
      setEmail(value)
    }
  }

  const sendResetEmail = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    try {
      await auth.sendPasswordResetEmail(email)
      setEmailHasBeenSent(true)
    } catch (error) {
      setError('Error resetting password')
    }
  }

  return (
    <>
      <h1 className="text-xl text-center font-bold mb-3">
        Reset your Password
      </h1>
      <div className="border border-blue-300 mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8">
        <form action="">
          {emailHasBeenSent && (
            <div className="py-3 bg-green-400 w-full text-white text-center mb-3">
              An email has been sent to you!
            </div>
          )}
          {error !== null && (
            <div className="py-3 bg-red-600 w-full text-white text-center mb-3">
              {error}
            </div>
          )}
          <label htmlFor="userEmail" className="w-full block">
            Email:
          </label>
          <input
            type="email"
            name="userEmail"
            id="userEmail"
            value={email}
            placeholder="Input your email"
            onChange={onChangeHandler}
            className="mb-3 w-full px-1 py-2"
          />
          <button
            className="w-full bg-blue-400 text-white py-3"
            onClick={sendResetEmail}
          >
            Send me a reset link
          </button>
        </form>
        <Link
          to ="/"
          className="my-2 text-blue-700 hover:text-blue-800 text-center block"
        >
          &larr; back to sign in page
        </Link>
      </div>
    </>
  )
}
export default PasswordReset
