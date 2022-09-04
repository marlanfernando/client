import JobList from './JobList';
import { useJobs } from '../graphql/hooks.js';
import React from 'react';


function JobBoard() {

  const {jobs, loading, error} = useJobs();
  console.log('Jobs Found : ', {jobs, loading, error});

  if(loading) {
    return <p> Loading... </p>
  }

  if(error) {
    return <p> Error!!! </p>
  }

  return (
    <div>
      <h1 className="title">
        Job Board
      </h1>
      <JobList jobs={jobs} />
    </div>
  );
}

export default JobBoard;
