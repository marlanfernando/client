import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import React,{useEffect, useState} from 'react';
import { getJob } from '../graphql/queries.js';

function JobDetail() {

  const [job, setJob] = useState(null);
  const {jobId} = useParams();
  console.log("JOBID " + jobId)

  useEffect(() => {
      getJob(jobId).then(setJob);
  },[jobId]);

  console.log("JOB " + job);

  return (
    <div>
      <h1 className="title">
        {job.title}
      </h1>
      <h2 className="subtitle">
        <Link to={`/companies/${job.company.id}`}>
          {job.company.name}
        </Link>
      </h2>
      <div className="box">
        {job.description}
      </div>
    </div>
  );
}

export default JobDetail;
