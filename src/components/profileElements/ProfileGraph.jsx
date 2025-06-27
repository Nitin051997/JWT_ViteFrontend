import React from 'react';
import '../../css/ProfileGraph.css';
import { LineChart } from '@mui/x-charts';

const ProfileGraph = () => {
  return (
    <main className='profile-graph-interface'>
        <section className='profile-graph-interface-title'>User Activities:</section>
        <section className='profile-graph-interface-container'>
        <LineChart
            xAxis={[
                { 
                    data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                }
                    ]}
            series={[
                { 
                    curve: "natural", data: [9,9.5,9.5,8,9.5,9,8.5,9]
                },
                {
                    curve: "natural", data: [6,6.5,7,5,7,7,5.5,6]
                },
                    ]}
            width={500}
            height={300}
            sx={{
                "& .MuiChartsAxis-root line": {
                    stroke: "white", // Axis line color
                    strokeWidth: 1,
                },
                "& .MuiChartsAxis-tick text": {
                    fill: "white", // Axis label (numbers) color
                    fontSize: "12px",
                },
                "& .MuiChartsAxis-tickLabel": {
                    fill: "white !important", // Axis label text color (for X & Y labels)
                },
                }}
        />
        </section>
        <section className='profile-graph-interface-details'>
            <div style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                <span className='profile-graph-interface-status-title'>Information</span>
            </div>
            <div style={{width: "100%", display: "flex", flexDirection: "column", gap: "10px"}}>
                <div style={{display: "flex", flexDirection: "row"}}>
                    <div style={{flex: "60%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <span style={{width: "40%", height: "20px", backgroundColor: "#02B2AF"}}></span>
                    </div>
                    <div style={{flex: "40%", display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
                        <span className='profile-graph-interface-status-text'>Log In</span>
                    </div>
                </div>
                <div style={{display: "flex", flexDirection: "row"}}>
                    <div style={{flex: "60%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <span style={{width: "40%", height: "20px", backgroundColor: "#2E96FF"}}></span>
                    </div>
                    <div style={{flex: "40%", display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
                        <span className='profile-graph-interface-status-text'>Log Out</span>
                    </div>
                </div>
            </div>
        </section>
    </main>
  )
}

export default ProfileGraph