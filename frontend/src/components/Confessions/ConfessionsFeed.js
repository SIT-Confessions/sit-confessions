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
    console.log("loader triggered", page);
    console.log("443",allLoaded)
    if(!allLoaded)
        getData();
  }, [page]);

  const handleObserver = (entities) => {
    const target = entities[0];
    console.log("isIntersecting", target.isIntersecting);
    console.log("allLoaded", allLoaded);
    if (target.isIntersecting) {
      console.log("442",allLoaded);
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
      <div ref={loader}></div>
    </>
  );
};

export default ConfessionsFeed;
