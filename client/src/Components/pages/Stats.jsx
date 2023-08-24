import { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import DatePick from "../mainComp/DatePick";
import { useGetUserID } from "../hooks/useGetUserID";
import LineChart from "../mainComp/LineChart"
import { Line } from "react-chartjs-2";
import axios from "axios";
// import { Line } from "react-chartjs-2"

export const Stats = () => {
    const [stats, setStats] = useState([]);
    const [currentDate, setCurrentDate] = useState("");
    const [chartDataObj, setChartDataObj] = useState("");
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
        chartData();
    }, [currentDate, userOwner]);

    const handleNext = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() + 1)
        setCurrentDate(newDate.toISOString().split("T")[0]);
    }
    const handlePrevious = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() - 1);
        setCurrentDate(newDate.toISOString().split("T")[0]);
    }

    const handleDateChange = (date) => {
        if(date != null){
            setCurrentDate(date.toISOString().split("T")[0]); 
        } else {
            setCurrentDate(date)
        }
    };

    // const chartData = async () => {
    //     const chartDate = new Date();
    //     const pastMonthDate = [];
    //     const pastDateData = [];
    //         // const [pastMonthDate, setPastMonthDate] = useState([]);
    //         // const [pastDateData, setPastDateData] = useState([]);

    //     for (let i = 30; i >= 0; i--){
    //         const tempDate = chartDate.toISOString().split("T")[0]
    //         pastMonthDate.push(tempDate)
    //         let value = 0;

    //         const chartDataFinder = async() => {
    //             try {
    //                 const response = await axios.get(
    //                     "http://localhost:3001/stat",
    //                     {
    //                     params: {
    //                         userOwner: userOwner,
    //                         currentDate: tempDate,
    //                     },
    //                     }
    //                 );
    //                 try {
    //                         console.log(
    //                             response.data[0].remaining
    //                         );
    //                         value = response.data[0].remaining;
    //                 } catch (err) {
    //                     console.log(err);
    //                     value = 10;
    //                 }
    //             } catch (err) {
    //                 console.log(err);
    //             }
    //         }
    //         chartDataFinder();
    //         pastDateData.push(value)
    //         chartDate.setDate(chartDate.getDate() - 1);
    //     }
    //     console.log(pastMonthDate + "  OVER HERE  " + pastDateData)
    //     return ({ pastMonthDate, pastDateData })
    // }

    

    const chartData = async () => {
      const chartDate = new Date();
      const pastMonthDate = [];
      const pastDateData = [];

      const chartDataFinder = async (tempDate) => {
        try {
          const response = await axios.get("http://localhost:3001/stat", {
            params: {
              userOwner: userOwner,
              currentDate: tempDate,
            },
          });
          if (response.data[0]) {
            console.log(response.data[0].remaining);
            return response.data[0].remaining;
          } else {
            console.log("Data not available or undefined");
            return 0; 
          }
        } catch (err) {
          console.log(err);
        }
      };

      for (let i = 30; i >= 0; i--) {
        const tempDate = chartDate.toISOString().split("T")[0];
        pastMonthDate.push(tempDate);

        const value = await chartDataFinder(tempDate);
        pastDateData.push(value);

        chartDate.setDate(chartDate.getDate() - 1);
      }

      console.log(pastMonthDate + "  OVER HERE  " + pastDateData);
      return { pastMonthDate, pastDateData };
    };

    const sendData = async () => {
        const fetchedDataObj = await chartData();

        setChartDataObj(fetchedDataObj);
    }
    console.log(chartDataObj)
    sendData();
    // const chartDataObj = await chartData();     
    return (
      <div>
        <h1> Enter the date of your caloric stats</h1>
        <DatePick onDateChange={handleDateChange} />
        <LineChart
          pastMonthDate={chartDataObj.pastMonthDate}
          pastDateData={chartDataObj.pastDateData}
        />
        {stats.length === 0 ? (
          <p>No stats available.</p>
        ) : (
          <div>
            <h2>{stats[0].total}</h2>
            <h2>{stats[0].remaining}</h2>
            <h2>{stats[0].currentDate}</h2>
          </div>
        )}
        <div>
          <button onClick={handlePrevious}>Previous</button>
          <button onClick={handleNext}>Next</button>
        </div>
      </div>
    );
};