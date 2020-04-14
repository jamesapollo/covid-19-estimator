const covid19ImpactEstimator = (data) => {
  // deconstruct the reportCases value from the data
  const { reportCases } = data;

  // initialize the impact and severeImpact properties for the output
  const impact = {};
  const severeImpact = {};

  // calculate the currently infected
  impact.currentlyInfected = reportCases * 10;
  severeImpact.currentlyInfected = reportCases * 50;

  // calculate the infectionsByRequestedTime
  impact.infectionsByRequestedTime = impact.currentlyInfected * (2 ** 10);
  severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * (2 ** 10);

  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
