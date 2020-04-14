const covid19ImpactEstimator = (data, duration) => {
  // deconstruct the reportCases value from the data
  const { reportCases } = data;

  // initialize the impact and severeImpact properties for the output
  const impact = {};
  const severeImpact = {};

  // calculate the currently infected
  impact.currentlyInfected = reportCases * 10;
  severeImpact.currentlyInfected = reportCases * 50;

  // get the duration factor by dividing by 3
  let factor = duration / 3;
  // convert to a whole number
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
