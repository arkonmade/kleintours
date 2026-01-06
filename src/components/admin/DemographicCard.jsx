import React, { useState } from "react";
import CountryMap from "./CountryMap";
import { Dropdown } from "../ui/dropdown";
import { DropdownItem } from "../ui/dropdownItem";
import { EllipsisVertical } from "lucide-react";

const DemographicCard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  return (
    <div className="rounded-2xl border border-border bg-white p-5 dark:bg-white/[0.03] sm:p-6">
      <div className="flex justify-between">
        <div>
          <h3 className="text-lg font-semibold text-text">Customer Demographics</h3>
          <p className="mt-1 text-secondary text-sm">
            Number of customers by country
          </p>
        </div>

        <div className="relative inline-block">
          <button onClick={toggleDropdown}>
            <EllipsisVertical className="text-secondary hover:text-primary size-6" />
          </button>

          <Dropdown isOpen={isOpen} onClose={closeDropdown} className="w-40 p-2">
            <DropdownItem onItemClick={closeDropdown} className="flex w-full text-secondary hover:bg-light rounded-lg p-2">
              View More
            </DropdownItem>
            <DropdownItem onItemClick={closeDropdown} className="flex w-full text-secondary hover:bg-light rounded-lg p-2">
              Delete
            </DropdownItem>
          </Dropdown>
        </div>
      </div>

      {/* Map */}
      <div className="px-4 py-6 my-6 overflow-hidden border border-border rounded-2xl sm:px-6">
        <CountryMap />
      </div>

      {/* Country Stats */}
      <div className="space-y-5">
        {[
          { country: "USA", customers: 2379, percent: 79, flag: "./images/country/country-01.svg" },
          { country: "France", customers: 589, percent: 23, flag: "./images/country/country-02.svg" },
        ].map((c) => (
          <div key={c.country} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={c.flag} alt={c.country} className="w-8 h-8 rounded-full" />
              <div>
                <p className="font-semibold text-text text-sm">{c.country}</p>
                <span className="text-secondary text-xs">{c.customers} Customers</span>
              </div>
            </div>

            <div className="flex items-center gap-3 max-w-[140px]">
              <div className="relative w-full h-2 rounded-sm bg-border">
                <div className="absolute left-0 top-0 h-full rounded-sm bg-primary" style={{ width: `${c.percent}%` }}></div>
              </div>
              <p className="text-text text-sm font-medium">{c.percent}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DemographicCard;


