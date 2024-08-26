import React from "react";

import {
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	AreaChart,
	Area,
} from "recharts";

const AreaGraph = ({ graphData }) => {
	const dailyData = graphData.data.map(
		({ index, createdAt, totalReward, _id }) => ({
			id: index,
			key: createdAt,
			target: totalReward,
			date: _id,
		})
	);

	//Sort based on date
	const sortedData = dailyData.sort((a, b) => {
		if (a.date.year !== b.date.year) {
			return a.date.year - b.date.year;
		}
		if (a.date.month !== b.date.month) {
			return a.date.month - b.date.month;
		}
		return a.date.day - b.date.day;
	});

	//Format date from yyyy-mm-dd to dd-month
	sortedData.map((data) => {
		const formatDate = (dateString) => {
			const date = new Date(dateString);
			const day = date.getDate();
			const month = date.toLocaleString("default", { month: "short" });
			return `${day} ${month}`;
		};
		data.key = formatDate(data.key);
	});

	return (
		<AreaChart
			width={1000}
			height={350}
			data={sortedData}
			margin={{
				left: -10,
			}}
			className="[&_.recharts-cartesian-axis-tick-value]:fill-black  [&_.recharts-cartesian-axis-tick-value]:dark:fill-white rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12 [&_.recharts-cartesian-grid-vertical]:opacity-0"
		>
			<defs>
				<linearGradient id="target" x1="0" y1="0" x2="0" y2="1">
					<stop offset="5%" stopColor="#4B40EE" stopOpacity={0.1} />
					<stop offset="95%" stopColor="#4B40EE" stopOpacity={0} />
				</linearGradient>
			</defs>
			<CartesianGrid strokeOpacity={0.435} />
			<XAxis
				dataKey="key"
				axisLine={false}
				tickLine={false}
				className="font-semibold"
			/>
			<YAxis tickLine={false} axisLine={false} />
			<Tooltip />
			<Area
				type="linear"
				dataKey="target"
				stroke="#4B40EE"
				strokeWidth={2}
				fillOpacity={1}
				fill="url(#target)"
			/>
		</AreaChart>
	);
};

export default AreaGraph;
