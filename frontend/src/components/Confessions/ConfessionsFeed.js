import React, { useState, useRef, useEffect, Fragment } from "react";
import ConfessionCard from "./ConfessionCard";
import { NewGetApprovedConfessions } from "../../api/index";

const ConfessionsFeed = () => {
  //   var options = {
  //     root: null,
  //     rootMargin: "20px",
  //     threshold: 1.0,
  //   };

  //let confessionsData = props.confessions.posts;
  const [confessionsData, setConfessionsData] = useState([]);
  const [page, setPage] = useState(1);
  const [isPopulated, setIsPopulated] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);
  const loader = useRef(null);

  let getData = async () => {
    try {
      let result = await NewGetApprovedConfessions(page);
      //console.log("PagedAPI", result);
      if (result.data.length === 0) {
        setAllLoaded(true);
      } else {
        setConfessionsData((prevState) => {
          return prevState.concat(result.data);
        });
      }
      if (!isPopulated)
        setIsPopulated(true);

      //   const observer = new IntersectionObserver(handleObserver, options);
      //   if (loader.current) {
      //     observer.observe(loader.current);
      //   }

      //dispatch(setAllConfessions(result.data));
    } catch (error) {
      if (error.response) console.log(error.response);
      //return <Redirect push to="/post" />;
    }
  };

  useEffect(() => {
    var options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };

    if (isPopulated) {
      const observer = new IntersectionObserver(handleObserver, options);
      if (loader.current) {
        observer.observe(loader.current);
      }
    }

    //getData();
  }, [isPopulated]);

  useEffect(() => {
    // Append more confessions to be shown
    // console.log("loader triggered", page);
    // console.log("443",allLoaded)
    if (!allLoaded)
      getData();
  }, [page]);

  const handleObserver = (entities) => {
    const target = entities[0];
    // console.log("isIntersecting", target.isIntersecting);
    // console.log("allLoaded", allLoaded);
    if (target.isIntersecting) {
      //   console.log("442",allLoaded);
      setPage((page) => page + 1);
    }
  };

  return (
    <>
      <div className="space-y-8">
        {confessionsData?.map((item, itemIDx) => (
          <Fragment key={itemIDx}>
            <ConfessionCard data={item} />
          </Fragment>
        ))}
      </div>
      {!allLoaded && !isPopulated ? (
        <div className="min-h-screen flex flex-col items-center justify-center">
          <div className="max-w-max w-full text-center pb-4 flex">
            <svg
              class="animate-spin -ml-1 mr-3 h-8 w-8 text-gray-800 dark:text-gray-100"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span className="font-bold text-xl text-gray-500 dark:text-gray-400">
              Loading Confessions...
            </span>
          </div>
        </div>
      ) : (
        // <div ref={loader}></div>
        !allLoaded ? 
        (<div ref={loader} className="justify-center items-center flex mt-12">
          <svg
            class="animate-spin -ml-1 mr-3 h-8 w-8 text-gray-400 dark:text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
        ) : null
      )}
    </>
  );
};

export default ConfessionsFeed;
