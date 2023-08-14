import { useEffect, useState } from "react";
import axios from "axios";

export const Stats = () => {
    const [stats, setStats] = useState([]);

    useEffect(() => {
        const fetchValues = async () => {
            try {
                const response = await axios.get("http://localhost:3001/stat")
                setStats(response.data);
                console.log(response.data)
            } catch (err) {
                console.error(err);
            }
        }
        fetchValues();
    }, []);
    return (
        <div> 
            <h2></h2>
        </div>);
};