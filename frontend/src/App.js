import  { useState , useEffect} from 'react';
import ReactMapGL , { Marker , Popup } from 'react-map-gl';
import { Room , Star } from '@material-ui/icons';
import { format } from 'timeago.js'
import axios from 'axios';


import './App.css';

function App() {

    const currentUser = "Akash";
    const [pins, setPins] = useState([]);
    const [CurrentPlaceId, setCurrentPlaceId] = useState(null);
    const [viewport, setViewport] = useState({
    width: "100vw", 
    height: "100vh", 
    latitude: 51.1525, 
    longitude: 14.9689, 
    zoom: 5})

useEffect(() => {
  const getPins = async () =>{
    try{
      const res = await axios.get('/pins')
      setPins(res.data);
    }catch(err){
      console.log(err)
    }
  };
  getPins();
}, [])

  const handleMarkerClick = (id) => {
    setCurrentPlaceId(id)
  }

  return (

    <div className="App">
       <ReactMapGL
      {...viewport}
      mapboxApiAccessToken = {process.env.REACT_APP_MAPBOX}
      onViewportChange={nextViewport => setViewport(nextViewport)}
      mapStyle = "mapbox://styles/akash-singh/ckvvv92vd4btd14m3srydan0t"
       > 

       {pins.map((p)=>(

         <>
      <Marker 
      latitude={p.lat}
      longitude={p.long} 
      offsetLeft={-20} 
      offsetTop={-10}>
        <Room style = {{
          fontSize : viewport.zoom*5 ,
          color : p.username === currentUser ? "orange" : "blue",
          cursor : "pointer"}}
        onClick = {()=>handleMarkerClick(p._id)}/>
      </Marker>
      
      { p._id === CurrentPlaceId &&(
        <Popup
          latitude={p.lat}
          longitude={p.long}
          closeButton={true}
          closeOnClick={false}
          anchor="top"
          onClose ={()=>{setCurrentPlaceId(null)}}
          > 
          <div className = "card">
            <label>Place</label>
            <h4 className = "place">{p.title}</h4>
            <label>Review</label>
            <p>{p.description}</p>
            <label className = "stars">Rating</label>
            <div>
              <Star className="star"/>
              <Star className="star"/>
              <Star className="star"/>
              <Star className="star"/>
            </div>
            <label>Information : </label>
            <b className = "username">{p.username} </b>
            <span className = "date">{ format(p.createdAt) }</span>
            </div> 
      </Popup>
      )}
      </>
       ))}
      </ReactMapGL> 
      
    </div>

  );
}

export default App;
