import { useMsal } from '@azure/msal-react'
import { Container, Card, CardBody, CardHeader, Table } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIdCard } from '@fortawesome/free-solid-svg-icons'

function Claims() {
  const { instance } = useMsal()
  const account = instance.getActiveAccount()

  // Get ID token claims
  const claims = account?.idTokenClaims || {}

  // Default claims to filter out
  const defaultClaims = ['aud', 'exp', 'iat', 'iss', 'nbf', 'nonce', 'oid', 'rh', 'sid', 'sub', 'tid', 'uti', 'ver']

  // Convert claims object to array and filter out default claims
  const claimEntries = Object.entries(claims)
    .filter(([key]) => !defaultClaims.includes(key))
    .sort((a, b) => a[0].localeCompare(b[0]))

  return (
    <Container className="mt-4">
      <Card>
        <CardHeader className="bg-primary text-white">
          <h4 className="mb-0">
            <FontAwesomeIcon icon={faIdCard} className="me-2" />
            User Claims
          </h4>
        </CardHeader>
        <CardBody>
          {account ? (
            <>
              <p className="mb-3">
                <strong>Account:</strong> {account.username}
              </p>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th style={{ width: '30%' }}>Claim Type</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {claimEntries.map(([key, value]) => (
                    <tr key={key}>
                      <td><code>{key}</code></td>
                      <td>
                        {typeof value === 'object' 
                          ? JSON.stringify(value, null, 2)
                          : String(value)
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          ) : (
            <p className="text-muted">No active account found.</p>
          )}
        </CardBody>
      </Card>
    </Container>
  )
}

export default Claims
