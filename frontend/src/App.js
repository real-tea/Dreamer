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
    const [NewPlace , setNewPlace ] = useState(null);
    const [title , setTitle] = useState(null);
    const [desc , setDesc] = useState(null); 
    const [rating , setRating ] = useState(0);
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

  const handleMarkerClick = (id , lat , long) => {
    setCurrentPlaceId(id)
    setViewport({...viewport,latitude : lat,longitude : long})
  };

  const handleAddClick = (e) =>{
    const [long , lat ] = e.lngLat; 
    // console.log(e)
    setNewPlace({
      lat,
      long 
    })
  };


  const handleSubmit = async (e) =>{
    // console.log(e);
    e.preventDefault();
    const newPin = {
      user : currentUser,
      title,
      desc,
      rating,
      lat : NewPlace.lat, 
      long : NewPlace.long
    }
  
    try{
      const res = await axios.post("/pins",newPin)
      setPins([...pins,res.data]);
      setNewPlace(null);  
    }catch(err){
      console.log(err);
    }
  }


  return (
    
    <div className="App">
       <ReactMapGL
      {...viewport}
      mapboxApiAccessToken = {process.env.REACT_APP_MAPBOX}
      onViewportChange={nextViewport => setViewport(nextViewport)}
      mapStyle = "mapbox://styles/akash-singh/ckvvv92vd4btd14m3srydan0t"
      onDblClick = {handleAddClick}
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
        onClick = {()=>handleMarkerClick(p._id , p.lat , p.long)}/>
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
       {NewPlace && ( 
         <> 
         {/* <Marker
         latitude={NewPlace.lat}
         longitude={NewPlace.long}
         offsetLeft={-3.5 * viewport.zoom}
         offsetTop={-7 * viewport.zoom}
       >
         <Room
           style={{
             fontSize: 7 * viewport.zoom,
             color: "tomato",
             cursor: "pointer",
           }}
         />
       </Marker> */}
        <Popup
          latitude= {NewPlace.lat}
          longitude={NewPlace.long}
          closeButton={true}
          closeOnClick={false}
          anchor="top"
          onClose ={()=>{setNewPlace(null)}}
          ><div>
            <form onSubmit = { handleSubmit }>
              <label>Title : </label>
              <input placeholder = "Enter title"
               onChange = {(e)=>{setTitle(e.target.value)}}/>
              <label>Review : </label>
              <textarea placeholder = "how you felt?"
               onChange = {(e) => {setDesc(e.target.value)}}/>
              <label>Rating : </label>
              <select onChange={(e) => {setRating(e.target.value)}}>
                <option value = "1">1</option>
                <option value = "2">2</option>
                <option value = "3">3</option>
                <option value = "4">4</option>
                <option value = "5">5</option>
              </select>
              <button className = "submitButton" type = "submit" value = "Submit">Add pin</button>
            </form>
            </div>
            </Popup> 
            </>
        )}
      </ReactMapGL> 
      
    </div>

  );
}

export default App;
