import React, { useState } from "react";
import AreaGraph from "./AreaGraph";
import Fullscreen from "../SVGs/Fullscreen";
import Compare from "../SVGs/Compare";

const Chart = ({ graphData, setDaysSince }) => {
	const [activeRange, setActiveRange] = useState(3);

	const dateRanges = [
		{
			id: 1,
			name: "1d",
			daysSince: 1,
		},
		{
			id: 2,
			name: "3d",
			daysSince: 3,
		},
		{
			id: 3,
			name: "1w",
			daysSince: 7,
		},
		{
			id: 4,
			name: "1m",
			daysSince: 30,
		},
		{
			id: 5,
			name: "6m",
			daysSince: 180,
		},
		{
			id: 6,
			name: "1y",
			daysSince: 365,
		},
		{
			id: 7,
			name: "max",
			daysSince: 365,
		},
	];

	return (
		<>
			{" "}
			<div className="flex justify-between mx-20 mt-10 w-[1000px]">
				<div className="flex gap-10">
					<span className="flex gap-2">
						<Fullscreen />
						<p className="text-[#6F7177] text-[18px]">Fullscreen</p>
					</span>
					<span className="flex gap-2">
						<Compare />
						<p className="text-[#6F7177] text-[18px]">Compare</p>
					</span>
				</div>
				<div className="flex">
					{dateRanges.map((dateRange, index) => (
						<p
							key={index}
							onClick={() => {
								setActiveRange(dateRange.id);
								setDaysSince(dateRange.daysSince);
							}}
							className={`rounded-[5px] h-[33px] w-[49px] flex justify-center items-center duration-150 hover:cursor-pointer ${
								activeRange === dateRange.id ? "bg-[#4B40EE] text-white" : ""
							}`}
						>
							{dateRange.name}
						</p>
					))}
				</div>
			</div>
			<div className="mt-10 mx-20">
				<AreaGraph graphData={graphData} />
			</div>
		</>
	);
};

export default Chart;
