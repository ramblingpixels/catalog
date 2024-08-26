import "./App.css";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import Chart from "./components/Chart/Chart";

function App() {
	const [daysSince, setDaysSince] = useState(7);
	const [activeTab, setActiveTab] = useState("Chart");
	const [graphData, setGraphData] = useState({});
	const [prevGraphData, setPrevGraphData] = useState({});
	useEffect(() => {
		axios
			.get(
				`https://api.rewards.girnaartech.com/api/validators/history?daysSince=${daysSince}&timezone=Asia/Calcutta&includeIds=false`
			)
			.then(
				(response) => {
					setGraphData(response.data);
				},
				(error) => {
					console.log(error);
				}
			);
	}, [daysSince]);
	console.log(graphData);

	useEffect(() => {
		axios
			.get(
				`https://api.rewards.girnaartech.com/api/validators/history?daysSince=${
					2 * daysSince
				}&timezone=Asia/Calcutta&includeIds=false`
			)
			.then(
				(response) => {
					setPrevGraphData(response.data);
				},
				(error) => {
					console.log(error);
				}
			);
	}, [daysSince]);
	console.log(graphData);

	const totalRewards = graphData.data
		? graphData.data.reduce((accumulator, currentObject) => {
				return accumulator + currentObject.totalReward;
		  }, 0)
		: "";

	const prevTotalRewards = prevGraphData.data
		? prevGraphData.data.reduce((accumulator, currentObject) => {
				return accumulator + currentObject.totalReward;
		  }, 0)
		: "";

	console.log(prevTotalRewards - totalRewards, totalRewards);

	const differenceInRewards = 2 * totalRewards - prevTotalRewards;

	const changePercentage =
		((prevTotalRewards - 2 * totalRewards) /
			(prevTotalRewards - totalRewards)) *
		100;

	const getCurrentTab = (tab) => {
		setActiveTab(tab);
	};

	return (
		<div className=" ">
			<div className="mx-20 mt-10">
				<span className="flex  ">
					<h1 className="text-[70px] font-[400] leading-none">
						{totalRewards
							? totalRewards
									.toFixed(2)
									.toString()
									.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
							: ""}
					</h1>
					<p className="text-[#BDBEBF] text-[24px]">MATIC</p>
				</span>
				{differenceInRewards > 0 ? (
					<p className="text-[#67BF6B] mt-5 text-[18px]">
						{"+" +
							differenceInRewards
								.toFixed(2)
								.toString()
								.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
						{`(${Math.abs(changePercentage).toFixed(2)}%)`}
					</p>
				) : (
					<p className="text-[#ff0000] mt-5 text-[18px]">
						{differenceInRewards
							.toFixed(2)
							.toString()
							.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
						{`(${changePercentage.toFixed(2)}%)`}
					</p>
				)}
			</div>

			<Navbar getCurrentTab={getCurrentTab} />

			{activeTab === "Chart" ? (
				graphData?.data ? (
					<Chart graphData={graphData} setDaysSince={setDaysSince} />
				) : (
					""
				)
			) : (
				<h1 className="mx-20 mt-10">{activeTab}</h1>
			)}
		</div>
	);
}

export default App;
