const covid19ImpactEstimator = (data) => {
  // deconstruct the reportCases value from the data
  const { reportedCases, timeToElapse, periodType } = data;

  // initialize the impact and severeImpact properties for the output
  const impact = {};
  const severeImpact = {};

  // calculate the currently infected
  impact.currentlyInfected = reportedCases * 10;
  severeImpact.currentlyInfected = reportedCases * 50;

  let factor;
  if (periodType === 'days') {
    factor = Math.ceil(timeToElapse / 3)
  } else if (periodType === 'weeks') {
    factor = Math.ceil((timeToElapse * 7) / 3 );
  } else if (periodType === 'months') {
    factor = Math.ceil((timeToElapse * 30) / 3);
  }

  // calculate the infectionsByRequestedTime
  impact.infectionsByRequestedTime = impact.currentlyInfected * (2 ** factor);
  severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * (2 ** factor);

  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
