const covid19ImpactEstimator = (data) => {
  // deconstruct the reportCases value from the data
  const { reportedCases } = data;

  // initialize the impact and severeImpact properties for the output
  const impact = {};
  const severeImpact = {};

  // calculate the currently infected
  impact.currentlyInfected = reportedCases * 10;
  severeImpact.currentlyInfected = reportedCases * 50;

  // calculate the infectionsByRequestedTime
  impact.infectionsByRequestedTime = impact.currentlyInfected * 1024;
  severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * 1024;

  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
