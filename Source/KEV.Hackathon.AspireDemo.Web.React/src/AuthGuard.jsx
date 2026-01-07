import { useEffect } from 'react'
import { useMsal, useIsAuthenticated, AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react'
import { InteractionStatus } from '@azure/msal-browser'
import { loginRequest } from './authConfig'
import PropTypes from 'prop-types'

function AuthGuard({ children }) {
  const { instance, inProgress } = useMsal()
  const isAuthenticated = useIsAuthenticated()

  // Automatically attempt sign-in if user is not authenticated
  useEffect(() => {
    if (!isAuthenticated && inProgress === InteractionStatus.None) {
      instance.loginRedirect(loginRequest).catch(e => {
        console.error('Login failed:', e)
      })
    }
  }, [isAuthenticated, inProgress, instance])

  return (
    <>
      <AuthenticatedTemplate>
        {children}
      </AuthenticatedTemplate>

      <UnauthenticatedTemplate>
        <div>
          <h1>Redirecting to sign in...</h1>
          <p>Please wait while we redirect you to the authentication page.</p>
        </div>
      </UnauthenticatedTemplate>
    </>
  )
}

AuthGuard.propTypes = {
  children: PropTypes.node.isRequired,
}

export default AuthGuard
