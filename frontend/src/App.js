import { useState } from 'react';
import ReactMapGL , { Marker } from 'react-map-gl';
import { Room } from '@material-ui/icons'

import './App.css';



function App() {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 51.1525,
    longitude: 14.9689,
    zoom: 6})
  return (
   
    <div className="App">
      <ReactMapGL
      {...viewport}
      mapboxApiAccessToken = {process.env.REACT_APP_MAPBOX}
      onViewportChange={nextViewport => setViewport(nextViewport)}
      mapboxStyle = "mapbox://styles/akash-singh/ckvuoo6qp36xs15pqi830jzb7"
    >
      <Marker 
      latitude={51.1525}
      longitude={14.9689} 
      offsetLeft={-20} 
      offsetTop={-10}>
        <Room style = {{fontSize : viewport.zoom*7 , color : "red"}}/>
      </Marker>
      </ReactMapGL>
      
    </div>
  );
}

export default App;
