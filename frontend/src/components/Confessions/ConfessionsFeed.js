import React, { useState, useRef, useEffect, Fragment } from 'react';
import ConfessionCard from "./ConfessionCard";

const ConfessionsFeed = (props) => {
    let confessionsData = props.confessions.posts;
    const [page, setPage] = useState(1);
    const loader = useRef(null);

    useEffect(() => {
        var options = {
            root: null,
            rootMargin: "20px",
            threshold: 1.0
         };

         const observer = new IntersectionObserver(handleObserver, options);
         if (loader.current) {
            observer.observe(loader.current)
         }
    }, [])

    useEffect(() => {
        // Append more confessions to be shown
        alert("show more confessions")
    }, [page])

    const handleObserver = (entities) => {
        const target = entities[0];
        if (target.isIntersecting) {   
            setPage((page) => page + 1)
        }
    }

    return (
      <>
        {confessionsData?.map((item, itemIDx) => (
          <Fragment key={itemIDx}>
            <ConfessionCard data={item} />
          </Fragment>
        ))}
        <div ref={loader}></div>
      </>
    );
}

export default ConfessionsFeed
