import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import LoadingSpinner from './LoadingSpinner';

function ActorProfile() {

    const { id } = useParams()
    const [actor,setActor] = useState()
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        axios.get(`https://localhost:7147/api/Actors/${id}`)
        .then(res => {
            setActor(res.data);
            setLoading(false); 
        })
        .catch(() => {
            setError('Error fetching movies!');
            setLoading(false); 
        });
    },[id])

     
    if (loading) {
        return <LoadingSpinner />;
      }
    
    if (error) {
    return <h3 className="text-danger text-center">{error}</h3>;
    }

    const birthdateString = actor.birthdate.split('T')[0];
    const birthdate = new Date(birthdateString);
    const formattedBirthdate = birthdate.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  
    const profile = new URL(`../../../../W23G05/MovieTime/wwwroot/actors/${actor.img}`,import.meta.url).href

  return (
    <div className="container text-white py-5 d-flex gap-3">
        
       <div>
            <img src={profile} alt="" width={500} height={650}/>
       </div>
       <div>
            <h1>{actor.name}</h1>
            <h5>Birthdate: {formattedBirthdate}</h5>
            <p style={{maxWidth:'600px'}}>{actor.description}</p>
       </div>
    </div>
  )
}

export default ActorProfile