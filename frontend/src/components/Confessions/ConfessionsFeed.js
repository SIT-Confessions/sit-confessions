import React, { Fragment } from 'react';
import ConfessionCard from "./ConfessionCard";

const ConfessionsFeed = (props) => {
    let confessionsData = props.confessions.posts;
    return (
      <>
        {confessionsData?.map((item, itemIDx) => (
          <Fragment key={itemIDx}>
            <ConfessionCard data={item} />
          </Fragment>
        ))}
      </>
    );
}

export default ConfessionsFeed
