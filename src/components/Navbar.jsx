import React, { useState } from "react";

const Navbar = ({ getCurrentTab }) => {
	const navTabs = [
		{
			id: 1,
			name: "Summary",
		},
		{
			id: 2,
			name: "Chart",
		},
		{
			id: 3,
			name: "Statistics",
		},
		{
			id: 4,
			name: "Analysis",
		},
		{
			id: 5,
			name: "Settings",
		},
	];

	const [activeTab, setActiveTab] = useState(2);

	return (
		<div className="mt-5">
			<div className="flex gap-5 mx-20 navbar">
				{navTabs.map((navTab, index) => (
					<p
						key={index}
						onClick={() => {
							setActiveTab(navTab.id);
							getCurrentTab(navTab.name);
						}}
						className={`hover:bg-[#ebeced] h-[50px] w-[100px] flex justify-center items-center duration-150 hover:cursor-pointer ${
							activeTab === navTab.id ? "border-b-[3px] border-[#4B40EE]" : ""
						}`}
					>
						{navTab.name}
					</p>
				))}
			</div>
			<hr />
		</div>
	);
};

export default Navbar;
