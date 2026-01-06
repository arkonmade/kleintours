import React, { useState } from "react";
import Chart from "react-apexcharts";
import { Dropdown } from "../ui/dropdown";
import { DropdownItem } from "../ui/dropdownItem";
import { EllipsisVertical } from "lucide-react";

const MonthlyTarget = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  const series = [75.55];
  const options = {
    colors: ["#0f2f24"],
    chart: { type: "radialBar", height: 330, sparkline: { enabled: true } },
    plotOptions: {
      radialBar: {
        startAngle: -85,
        endAngle: 85,
        hollow: { size: "80%" },
        track: { background: "#e4e2dc", strokeWidth: "100%", margin: 5 },
        dataLabels: {
          name: { show: false },
          value: {
            fontSize: "36px",
            fontWeight: "600",
            offsetY: -40,
            color: "#2b2b2b",
            formatter: (val) => val + "%",
          },
        },
      },
    },
    fill: { type: "solid", colors: ["#0f2f24"] },
    stroke: { lineCap: "round" },
    labels: ["Progress"],
  };

  return (
    <div className="rounded-2xl border border-border bg-light">
      <div className="px-5 pt-5 bg-white rounded-2xl pb-11 shadow-default">
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg font-semibold text-text">Monthly Target</h3>
            <p className="mt-1 text-secondary text-sm">
              Target you’ve set for each month
            </p>
          </div>

          <div className="relative inline-block">
            <button onClick={toggleDropdown}>
              <EllipsisVertical className="text-secondary hover:text-primary size-6" />
            </button>
            <Dropdown
              isOpen={isOpen}
              onClose={closeDropdown}
              className="w-40 p-2"
            >
              <DropdownItem
                onItemClick={closeDropdown}
                className="flex w-full text-secondary hover:bg-light rounded-lg p-2"
              >
                View More
              </DropdownItem>
              <DropdownItem
                onItemClick={closeDropdown}
                className="flex w-full text-secondary hover:bg-light rounded-lg p-2"
              >
                Delete
              </DropdownItem>
            </Dropdown>
          </div>
        </div>

        <div className="relative max-h-[330px]">
          <Chart
            options={options}
            series={series}
            type="radialBar"
            height={330}
          />
          <span className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-[95%] rounded-full bg-accent/20 px-3 py-1 text-xs font-medium text-accent">
            +10%
          </span>
        </div>

        <p className="mt-10 text-center text-secondary text-sm">
          You earned $3,287 today, higher than last month. Keep it up!
        </p>
      </div>
    </div>
  );
};

export default MonthlyTarget;
