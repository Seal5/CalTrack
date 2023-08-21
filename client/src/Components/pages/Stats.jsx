import { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import DatePick from "../mainComp/DatePick";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";

export const Stats = () => {
    const [stats, setStats] = useState([]);
    const [currentDate, setCurrentDate] = useState("");
    const userOwner = useGetUserID();

    useEffect(() => {
        const fetchValues = async () => {
        try {
            console.log(userOwner + "    " + currentDate);
            if (userOwner && currentDate) {
                const response = await axios.get("http://localhost:3001/stat"
                , {
                    params: {
                    userOwner: userOwner,
                    currentDate: currentDate,
                    },
                }
                );
            console.log("API response:", response.data);
            setStats(response.data);
            }
        } catch (err) {
            console.error(err);
        }
        };
        fetchValues();
    }, [currentDate, userOwner]);

    const handleDateChange = (date) => {
        if(date != null){
            setCurrentDate(date.toISOString().split("T")[0]); 
        } else {
            setCurrentDate(date)
        }
    };

    return (
      <div>
        <h1> Enter the date of your caloric stats</h1>
        <DatePick onDateChange={handleDateChange} />
        {stats.length === 0 ? (
            <p>No stats available.</p>
            ) : (
            <div>
                <h2>{stats[0].total}</h2>
                <h2>{stats[0].remaining}</h2>
                <h2>{stats[0].currentDate}</h2>
            </div>
        )}
        <h2></h2>
      </div>
    );
};