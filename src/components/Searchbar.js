"use client";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import SearchBar from "@mui/icons-material/Search";
import { useState, useEffect } from "react";
import { DataCard } from "./DataCard";

export default function Search() {
  const [inputValue, setValue] = useState("");
  const [cardData, setCardData] = useState([
    {
      tow_date: "",
      make: "",
      style: "",
      color: "",
      plate: "",
      state: "",
      towed_to_address: "",
      tow_facility_phone: "",
      inventory_number: "",
    },
  ]);
  const [data, setData] = useState([]);

  const handleChange = (event) => {
    const inputValue = event.target.value;

    setValue(inputValue);
  };

  async function handleSearch(event) {
    event.preventDefault();
    if (inputValue) {
      const response = await fetch(`http://0.0.0.0:5002/item?q=${inputValue}`, {
        method: "GET",
      })
        .then((response) => response.json()) // Parses the response as JSON (also returns a Promise)

        .then((data) => {
          setData(data);
        });
    }

    if (!inputValue) {
      const response = await fetch("http://0.0.0.0:5002/item", {
        method: "GET",
      })
        .then((response) => response.json()) // Parses the response as JSON (also returns a Promise)
        .then((data) => {
          setData(data);
        });
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter") return handleSearch();
  };

  useEffect(() => {
    setCardData(data);
  }, [data]);

  const totalUser = data.length;
  return (
    <div>
      <form
        className="search__input border-[2px] border-solid border-slate-500 flex flex-row items-center gap-5 p-1 rounded-[15px]"
        onSubmit={handleSearch}
      >
        <input
          type="text"
          id="inputId"
          placeholder="Enter your keywords"
          value={inputValue ?? ""}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
          className="bg-[transparent] outline-none border-none w-full py-3 pl-2 pr-3"
        />

        <IconButton type="submit" aria-label="search">
          <SearchBar style={{ fill: "blue" }} />
        </IconButton>
      </form>
      <div className="mt-8">
        {totalUser === 0 ? (
          <div></div>
        ) : (
          // return the data cards here
          <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-5">
            {cardData.map(
              ({
                tow_date,
                make,
                style,
                color,
                towed_to_address,
                plate,
                inventory_number,
              }) => {
                return (
                  <div key={inventory_number}>
                    <DataCard
                      make={make}
                      style={style}
                      color={color}
                      plate={plate}
                      tow_date={tow_date}
                      towed_to_address={towed_to_address}
                    />
                  </div>
                );
              }
            )}
          </div>
        )}
      </div>
    </div>
  );
}
