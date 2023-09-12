import { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import DatePick from "../mainComp/DatePick";
import { useGetUserID } from "../hooks/useGetUserID";
import LineChart from "../mainComp/LineChart"
import { Line } from "react-chartjs-2";
import Footer from "../mainComp/Footer";
import axios from "axios";

// import { Line } from "react-chartjs-2"

// stats page 
export const Stats = () => {
    const [stats, setStats] = useState([]);
    const [currentDate, setCurrentDate] = useState("");
    const [chartDataObj, setChartDataObj] = useState("");
    const userOwner = useGetUserID();

    // call database for owner and date
    useEffect(() => {
        const fetchValues = async () => {
        try {
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
        // call chart
        chartData();
    }, [currentDate, userOwner]);

    // buttons for next and before 
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

    // replace when new date is added
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

    
    // get chart data
    const chartData = async () => {
      const chartDate = new Date();
      chartDate.setDate(chartDate.getDate() - 30);
      const pastMonthDate = [];
      const pastDateData = [];

      const chartDataFinder = async (tempDate) => {
        try {
          // function to find data for the individual user on a certain date
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

      // get the date data for the past 30 days
      for (let i = 30; i >= 0; i--) {
        const tempDate = chartDate.toISOString().split("T")[0];
        pastMonthDate.push(tempDate);

        const value = await chartDataFinder(tempDate);
        pastDateData.push(value);

        chartDate.setDate(chartDate.getDate() + 1);
      }

      return { pastMonthDate, pastDateData };
    };

    // send the data to the chart 
    const sendData = async () => {
        const fetchedDataObj = await chartData();

        setChartDataObj(fetchedDataObj);
    }
    console.log(chartDataObj)
    sendData();
    // const chartDataObj = await chartData();   
    // output  
    return (
      <div>
        <div className="statOutput">
          <h1> Choose a Date </h1>
          <div className="datePickerContainer">
            <DatePick onDateChange={handleDateChange} />
          </div>
          {currentDate ? (
            <div className="stats">
              <h2> Stats For: {currentDate} </h2>
              {stats.length === 0 ? (
                <p>No stats available</p>
              ) : (
                <div>
                  <p>Caloric Consumption Goal: {stats[0].total}</p>
                  {stats[0].remaining === 0 ? (
                    <p>You reached your goal!</p>
                  ) : stats[0].remaining > 0 ? (
                    <p>
                      You needed {stats[0].remaining} more calories!
                    </p>
                  ) : (
                    <p>
                      You needed {Math.abs(stats[0].remaining)} less
                      calories!
                    </p>
                  )}
                </div>
              )}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="buttonContainer">
          <button className="prevNext" onClick={handlePrevious}>
            Prev
          </button>
          <button className="prevNext" onClick={handleNext}>
            Next
          </button>
        </div>
        <LineChart
          pastMonthDate={chartDataObj.pastMonthDate}
          pastDateData={chartDataObj.pastDateData}
        />
        <Footer/>
      </div>
    );
};