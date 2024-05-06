import {useState,useEffect} from 'react'
import axios from 'axios'
export default function Loaddata() {
    const[Year,setYear]=useState([])
    const [launch, setLaunch] = useState([])
    const [land, setLand] = useState([])
    useEffect(()=>{
        axios.get('https://api.spacexdata.com/v3/launches?limit=100')
            .then((res) => {
                setYear(res.data)
                console.log(res.data);
            })
            .catch((e) => {
               console.log(e)
            })
        axios.get('https://api.spaceXdata.com/v3/launches?limit=100&launch_success=true')
            .then((res) => {
                setLaunch(res.data)
                console.log(res.data);
            })
            .catch((e) => {
               console.log(e)
            })
        axios.get('https://api.spaceXdata.com/v3/launches?limit=100&launch_success=true&land_success=true')
            .then((res) => {
                setLand(res.data)
                console.log(res.data);
            })
            .catch((e) => {
                console.log(e)
            })
    },[])
    return{Year,launch,land}
}
