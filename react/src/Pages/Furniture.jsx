import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SearchBar from "../Components/SearchBar";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import Loading from "../Components/Loading";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function Furnitures() {
  const { id } = useParams();
  const [furnitures, setFurnitures] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filteredFurnitures, setFilteredFurnitures] = useState(null);
  const [searchWeight, setSearchWeight] = useState("");
  const [searchPrice, setSearchPrice] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch(`/api/rooms/${id}/furnitures`)
      .then((res) => res.json())
      .then((res) => {
        setLoading(false);
        setFurnitures(res.furnitures);
        setFilteredFurnitures(res.furnitures);
      });
  }, [id]);

  useEffect(() => {
    let filtered = furnitures;

    if (searchWeight !== "") {
      filtered = filtered.filter(
        (furniture) => furniture.weight === parseInt(searchWeight, 10)
      );
    }

    if (searchPrice !== "") {
      filtered = filtered.filter(
        (furniture) => furniture.price.toString() === searchPrice
      );
    }

    setFilteredFurnitures(filtered);
  }, [searchWeight, searchPrice, furnitures]);

  const handleWeightChange = (value) => {
    setSearchWeight(value);
  };

  const handlePriceChange = (value) => {
    setSearchPrice(value);
  };

  if (loading) {
    return (
      <main className="flex flex-col items-center mt-5">
        <div className="w-3/4">
          <Loading />
          <Loading />
          <Loading />
        </div>
      </main>
    );
  }

  return (
    <main className="w-3/4 mx-auto mt-5">
      <section className="m-3">
        <SearchBar
          id="weight"
          placeholder="Search by weight"
          onChange={handleWeightChange}
        />
        <SearchBar
          id="price"
          placeholder="Search by price"
          onChange={handlePriceChange}
        />
        <ul
          id="furnitures"
          className="grid sm:grid-cols-2 grid-cols-1 gap-3 mt-3"
        >
          {filteredFurnitures.map((furniture) => (
            <li
              className="bg-purple-400 p-3 flex justify-between"
              key={furniture.id}
            >
              <span>{furniture.name}</span>
              <span>{furniture.weight} kg</span>
              <span>{formatter.format(furniture.price)}</span>
            </li>
          ))}
        </ul>
      </section>
      <Link className="m-3 block" to="/">
        <IoArrowBackCircleSharp size={32} />
      </Link>
    </main>
  );
}