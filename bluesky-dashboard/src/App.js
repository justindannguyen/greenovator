import React from 'react'
import CameraList from './CameraList'
import LiveTraffic from './LiveTraffic'
import HourlyTraffic from './HourlyTraffic'
import DailyTraffic from './DailyTraffic'

function App() {
  const [token, setToken] = React.useState()
  const [cameras, setCameras] = React.useState()
  const [selectedCameraIp, setSelectedCameraIp] = React.useState()
  const [liveTraffic, setLiveTraffic] = React.useState([])
  const [hourlyTraffic, setHourlyTraffic] = React.useState([])
  const [dailyTraffic, setDailyTraffic] = React.useState([])

  React.useEffect(() => {
    fetch('https://traffic.bosch-hackathon.com.vn/api/authenticate', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify({ 
        username: process.env.REACT_APP_BLUESKY_USERNAME, 
        password: process.env.REACT_APP_BLUESKY_PASSWORD 
      }) 
    })
    .then(response => response.json())
    .then(({token}) => setToken(token))
    .catch(error => alert(error));
  }, [])
  React.useEffect(() => {
    if (token) {
      fetch('https://traffic.bosch-hackathon.com.vn/api/cameras', {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }) 
      .then(response => response.json())
      .then(list => setCameras(list))
      .catch(error => alert(error));
    }
  }, [token])

  React.useEffect(() => {
    if (token && selectedCameraIp) {
      fetch(`https://traffic.bosch-hackathon.com.vn/api/traffic/live?cameraIp=${selectedCameraIp}`, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }) 
      .then(response => response.json())
      .then(json => setLiveTraffic(json))
      .catch(error => alert(error));
    }
  }, [token, selectedCameraIp])

  React.useEffect(() => {
    if (token && selectedCameraIp) {
      fetch(`https://traffic.bosch-hackathon.com.vn/api/traffic/hourly?cameraIp=${selectedCameraIp}&from=2021-09-30&to=2021-10-30`, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }) 
      .then(response => response.json())
      .then(json => setHourlyTraffic(json))
      .catch(error => alert(error));
    }
  }, [token, selectedCameraIp])

  React.useEffect(() => {
    if (token && selectedCameraIp) {
      fetch(`https://traffic.bosch-hackathon.com.vn/api/traffic/daily?cameraIp=${selectedCameraIp}&from=2021-09-30&to=2021-10-30`, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }) 
      .then(response => response.json())
      .then(json => setDailyTraffic(json))
      .catch(error => alert(error));
    }
  }, [token, selectedCameraIp])

  return (
    <div>
      <h1>Camera List</h1>
      <p>Touch a camera below to display traffic information</p>
      <CameraList cameras={cameras} 
        setSelectedCameraIp={cameraIp => setSelectedCameraIp(cameraIp)}
        selectedCameraIp={selectedCameraIp}/>
      <h1>Live Traffic {selectedCameraIp ? selectedCameraIp : ''}</h1>
      <LiveTraffic liveTraffic={liveTraffic} />
      <h1>Hourly Traffic {selectedCameraIp ? selectedCameraIp : ''}</h1>
      <HourlyTraffic hourlyTraffic={hourlyTraffic} />
      <h1>Daily Traffic {selectedCameraIp ? selectedCameraIp : ''}</h1>
      <DailyTraffic dailyTraffic={dailyTraffic} />
    </div>
  );
}

export default App;
