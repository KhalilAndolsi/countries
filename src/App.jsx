import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const CardsPerPage = 20;
  const getData = async () => {
    await fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => setData(data.filter(d => d.name.common != "Israel")))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getData();
  }, []);

  const searchCountrie = (event) => {
    if (data) {
      if (event) {
        setData(
          data.filter((d) =>
            d.name.common.toUpperCase().includes(event.toUpperCase())
          )
        );
        setPage(1);
      } else {
        getData();
      }
    }
  };
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [page])
  return (
    <>
      <h1 className="p-5 font-bold text-3xl text-center uppercase">
        countries
      </h1>
      <div className="flex flex-col items-center gap-5">
        <input
          type="text"
          placeholder="Search"
          className="w-[80%] md:w-[40%] p-2 text-zinc-900 rounded-md outline-none border-0 font-medium"
          onChange={(e) => searchCountrie(e.target.value)}
        />
        {data.length > 0 && (
          <div className="flex gap-2 flex-wrap px-2 justify-center">
            <button
              className="buttonPagination"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              previous
            </button>
            {[...Array(Math.ceil(data.length / CardsPerPage))].map((_, i) => (
              <button
                key={i}
                className={`buttonPagination ${
                  page == i + 1 && "bg-white text-zinc-900 font-semibold"
                }`}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="buttonPagination"
              disabled={page === Math.ceil(data.length / CardsPerPage)}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
        )}
        <div className="container p-2">
          {data.length > 0 ? (
            <div className="cards">
              {data
                .slice(CardsPerPage * (page - 1), CardsPerPage * page)
                .map((d, i) => (
                  <div
                    key={i}
                    className="card p-2 border-2 border-white rounded-md overflow-hidden"
                  >
                    <h4 className="p-2 underline">
                      <a href={d.maps.googleMaps} target="_blanck">
                        {d.name.common}
                      </a>
                    </h4>
                    <img
                      src={d.flags.svg}
                      alt={d.name.official}
                      className="h-[150px] w-full object-cover"
                    />
                  </div>
                ))}
            </div>
          ) : (
            <h3 className="text-center">No Data</h3>
          )}
        </div>
        {data.length > 0 && (
          <div className="flex gap-2 px-2 justify-between w-full">
            <button
              className="buttonPagination"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              previous
            </button>
            <button
              className="buttonPagination"
              disabled={page === Math.ceil(data.length / CardsPerPage)}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>
      <h3 className="text-center my-5">
        this app created by{" "}
        <a
          href="https://github.com/KhalilAndolsi"
          target="_blanck"
          className="underline"
        >
          khalil andolsi
        </a>{" "}
        with mush ❤️
      </h3>
    </>
  );
}

export default App;
