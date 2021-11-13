import { useState } from 'react';
import ReactMapGL , { Marker , Popup } from 'react-map-gl';
import { Room , Star } from '@material-ui/icons'

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
      mapStyle = "mapbox://styles/akash-singh/ckvvv92vd4btd14m3srydan0t"
       > 
      <Marker 
      latitude={51.1525}
      longitude={14.9689} 
      offsetLeft={-20} 
      offsetTop={-10}>
        <Room style = {{fontSize : viewport.zoom*7 , color : "red"}}/>
      </Marker>
      <Popup
          latitude={51.1525}
          longitude={14.9689}
          closeButton={false}
          closeOnClick={false}
          anchor="bottom"> 
          <div className = "card">
            <label>Place</label>
            <h4 className = "place">Gorlitz</h4>
            <label>Review</label>
            <p>Nice Place</p>
            <label className = "stars">Rating</label>
            <div>
              <Star className="star"/>
              <Star className="star"/>
              <Star className="star"/>
              <Star className="star"/>
            </div>
            <label>Information : </label>
            <b className = "username">Akash, </b>
            <span className = "date">1 hour ago</span>
            </div> 
        </Popup> 
      </ReactMapGL> 
      
    </div>

  );
}

export default App;
