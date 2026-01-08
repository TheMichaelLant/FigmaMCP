import { useState, useEffect, useCallback } from 'react'
import { useMsal } from '@azure/msal-react'
import { Container, Card, CardBody, CardHeader, Table, Alert, Spinner } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudSun } from '@fortawesome/free-solid-svg-icons'
import { apiRequest } from '../authConfig'

function WeatherForecast() {
  const { instance, accounts } = useMsal()
  const [weatherData, setWeatherData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

  const fetchWeatherForecast = useCallback(async () => {
    if (!accounts[0]) {
      setError('No active account found')
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Get access token from MSAL
      const response = await instance.acquireTokenSilent({
        ...apiRequest,
        account: accounts[0],
      })

      // Call the API with the access token
      const apiResponse = await fetch(`${API_BASE_URL}/weatherforecast`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${response.accessToken}`,
          'Content-Type': 'application/json',
        },
      })

      if (!apiResponse.ok) {
        throw new Error(`API request failed with status ${apiResponse.status}`)
      }

      const data = await apiResponse.json()
      setWeatherData(data)
    } catch (err) {
      console.error('Error fetching weather forecast:', err)
      
      // Try to acquire token interactively if silent acquisition fails
      if (err.name === 'InteractionRequiredAuthError') {
        try {
          const response = await instance.acquireTokenPopup({
            ...apiRequest,
            account: accounts[0],
          })

          const apiResponse = await fetch(`${API_BASE_URL}/weatherforecast`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${response.accessToken}`,
              'Content-Type': 'application/json',
            },
          })

          if (!apiResponse.ok) {
            throw new Error(`API request failed with status ${apiResponse.status}`)
          }

          const data = await apiResponse.json()
          setWeatherData(data)
        } catch (interactiveErr) {
          setError(interactiveErr.message || 'Failed to acquire token')
        }
      } else {
        setError(err.message || 'Failed to fetch weather forecast')
      }
    } finally {
      setLoading(false)
    }
  }, [instance, accounts, API_BASE_URL])

  useEffect(() => {
    fetchWeatherForecast()
  }, [fetchWeatherForecast])

  return (
    <Container className="mt-4">
      <Card>
        <CardHeader className="bg-primary text-white">
          <h4 className="mb-0">
            <FontAwesomeIcon icon={faCloudSun} className="me-2" />
            Weather Forecast
          </h4>
        </CardHeader>
        <CardBody>
          {error && (
            <Alert color="danger">
              <strong>Error:</strong> {error}
            </Alert>
          )}

          {loading ? (
            <div className="text-center py-4">
              <Spinner color="primary" />
              <p className="mt-2">Loading weather forecast...</p>
            </div>
          ) : weatherData.length > 0 ? (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Temperature (C)</th>
                  <th>Temperature (F)</th>
                  <th>Summary</th>
                </tr>
              </thead>
              <tbody>
                {weatherData.map((forecast, index) => (
                  <tr key={index}>
                    <td>{new Date(forecast.date).toLocaleDateString()}</td>
                    <td>{forecast.temperatureC}°C</td>
                    <td>{forecast.temperatureF}°F</td>
                    <td>{forecast.summary}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            !error && <p className="text-muted">No weather data available.</p>
          )}

          <div className="mt-3">
            <button 
              className="btn btn-primary" 
              onClick={fetchWeatherForecast}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Refresh Forecast'}
            </button>
          </div>
        </CardBody>
      </Card>
    </Container>
  )
}

export default WeatherForecast
