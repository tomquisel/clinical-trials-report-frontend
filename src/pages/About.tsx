import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Clinical Trials: A Hall of Shame </h1>
      <p>
        In 2000, the National Institutes of Health launched{" "}
        <a href="https://clinicaltrials.gov">clinicaltrials.gov</a>, now the
        largest database of clinical trials in the world. It was created to
        improve the general public's access to clinical trials and allow
        individuals with serious diseases to learn about experimental
        treatments. To achieve this goal, it's essential that clinical trials
        report their results. US legislators agree. In 2007, congress enacted
        the{" "}
        <a href="https://clinicaltrials.gov/ct2/manage-recs/fdaaa">
          Food and Drug Administration Amendments Act
        </a>
        , requiring studies of FDA-regulated drugs or medical devices to report
        their results within 12 months of completion. Violators face stiff
        fines, but the FDA hasn't acted, and{" "}
        <a href="https://www.statnews.com/2015/12/13/clinical-trials-investigation/">
          has left billions
        </a>{" "}
        in fines on the table. The problem has persisted for years. As of 2019,
        more than{" "}
        <a href="https://www.statnews.com/pharmalot/2019/03/25/universities-clinical-trial-results-disclosure/">
          30% of recent clinical trials
        </a>
        required to report results have failed to do so.
      </p>
      <p>
        Here you can find up-to-date reports on the worst offenders. They are
        organized by:
      </p>
      <ul>
        <li>
          <Link to="/institutions">Institution</Link>
        </li>
        <li>
          <Link to="/principal-investigators">Principal Investigator</Link>
        </li>
      </ul>
    </div>
  );
}

export default Home;
