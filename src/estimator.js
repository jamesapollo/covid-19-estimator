const covid19ImpactEstimator = (data, duration) => {
  // deconstruct the reportCases value from the data
  const { reportedCases, timeToElapse } = data;

  // initialize the impact and severeImpact properties for the output
  const impact = {};
  const severeImpact = {};

  // calculate the currently infected
  impact.currentlyInfected = reportedCases * 10;
  severeImpact.currentlyInfected = reportedCases * 50;

  let factor = timeToElapse / 3;
  factor = Math.ceil(factor);


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
