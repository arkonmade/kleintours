
import "flatpickr/dist/flatpickr.min.css";
 
import React, { useEffect, useRef, useState } from "react";
import Chart from "react-apexcharts";
import flatpickr from "flatpickr";
import { CalendarClock } from "lucide-react";

const StatisticsChart = ({ bookings }) => {
  const datePickerRef = useRef(null);
  const [series, setSeries] = useState([
    { name: "Car Bookings", data: new Array(12).fill(0) },
    { name: "Tour Bookings", data: new Array(12).fill(0) },
  ]);

  useEffect(() => {
    if (!datePickerRef.current) return;

    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 6);

    const fp = flatpickr(datePickerRef.current, {
      mode: "range",
      static: true,
      monthSelectorType: "static",
      dateFormat: "M d",
      defaultDate: [sevenDaysAgo, today],
    });

    return () => fp.destroy();
  }, []);

  useEffect(() => {
    // Initialize counts for each month (Jan=0 .. Dec=11)
    const carCounts = new Array(12).fill(0);
    const tourCounts = new Array(12).fill(0);

    bookings.forEach((booking) => {
      // Parse the start_date as a date object
      const dateObj = new Date(booking.start_date);
      if (isNaN(dateObj.getTime())) return; // Skip invalid dates

      const month = dateObj.getMonth(); // 0-based month index (0=Jan, 11=Dec)

      if (booking.item_type === "car") {
        carCounts[month] += 1; // count one booking for that month
      } else if (booking.item_type === "tour") {
        tourCounts[month] += 1;
      }
    });

    setSeries([
      { name: "Car Bookings", data: carCounts },
      { name: "Tour Bookings", data: tourCounts },
    ]);
  }, [bookings]);

  const options = {
    legend: { show: true },
    colors: ["#0f2f24", "#c9a240"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      height: 310,
      type: "area",
      toolbar: { show: false },
    },
    stroke: { curve: "straight", width: [2, 2] },
    fill: { type: "gradient", gradient: { opacityFrom: 0.55, opacityTo: 0 } },
    markers: { size: 0, strokeColors: "#fff", strokeWidth: 2, hover: { size: 6 } },
    grid: { xaxis: { lines: { show: false } }, yaxis: { lines: { show: true } } },
    dataLabels: { enabled: false },
    tooltip: { enabled: true, x: { format: "MMM dd" } },
    xaxis: {
      type: "category",
      categories: [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ],
      axisBorder: { show: false },
      axisTicks: { show: false },
      tooltip: { enabled: false },
    },
    yaxis: { labels: { style: { fontSize: "12px", colors: ["#3a5f52"] } } },
  };

  return (
    <div className="rounded-2xl border border-border bg-white p-5 dark:bg-white/[0.03] sm:p-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text">Statistics</h3>
          <p className="mt-1 text-secondary text-sm">
            Booking counts for Cars vs Tours per month
          </p>
        </div>

        <div className="flex items-center gap-3 sm:justify-end">
          <div className="relative">
            <CalendarClock className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary size-5 pointer-events-none" />
            <input
              ref={datePickerRef}
              className="pl-10 pr-3 py-2 rounded-lg border border-border text-sm text-text cursor-pointer"
              placeholder="Select date range"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto custom-scrollbar">
        <Chart options={options} series={series} type="area" height={310} />
      </div>
    </div>
  );
};

export default StatisticsChart;
