import { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import DatePick from "../mainComp/DatePick";
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
          <h1> Enter the date of your caloric stats</h1>
          <DatePick />

          <h2>{stats.total}</h2>
        </div>
    );
};