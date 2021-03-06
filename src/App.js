import React, { useEffect, useState } from "react";
import "./App.css";
import Tmdb from "./Tmdb";
import MovieRow from "./components/MovieRow";
import FeaturedMovie from "./components/FeaturedMovie";
import Footer from "./components/Footer";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const [movieList, setMovieList] = useState([]);
  const [featureData, setFeatureData] = useState(null);

  useEffect(() => {
    const loadAll = async () => {
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      let originals = list.filter((slugs) => slugs.slug === "originals");

      let randomChosen = Math.floor(
        Math.random() * originals[0].items.results.length - 1
      );

      let chosen = originals[0].items.results[randomChosen];

      let chosonInfo = await Tmdb.getMovieInfo(chosen.id, "tv");

      setFeatureData(chosonInfo);
    };

    loadAll();
  }, []);

  return (
    <div className="page">
      {featureData && <FeaturedMovie item={featureData} />}

      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};
