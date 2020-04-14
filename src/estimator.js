const covid19ImpactEstimator = (data) => {
  // deconstruct the reportCases value from the data
  const {
    reportedCases, timeToElapse, periodType, totalHospitalBeds
  } = data;

  // initialize the impact and severeImpact properties for the output
  const impact = {};
  const severeImpact = {};

  // calculate the currently infected
  impact.currentlyInfected = reportedCases * 10;
  severeImpact.currentlyInfected = reportedCases * 50;

  let factor;
  if (periodType === 'days') {
    factor = Math.trunc(timeToElapse / 3);
  } else if (periodType === 'weeks') {
    factor = Math.trunc((timeToElapse * 7) / 3);
  } else if (periodType === 'months') {
    factor = Math.trunc((timeToElapse * 30) / 3);
  }

  // calculate the infectionsByRequestedTime
  impact.infectionsByRequestedTime = impact.currentlyInfected * (2 ** factor);
  severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * (2 ** factor);

  impact.severeCasesByRequestedTime = impact.infectionsByRequestedTime * 0.15;
  severeImpact.severeCasesByRequestedTime = severeImpact.infectionsByRequestedTime * 0.15;

  impact.hospitalBedsByRequestedTime = (totalHospitalBeds * 0.35)
  - impact.severeCasesByRequestedTime;
  severeImpact.hospitalBedsByRequestedTime = (totalHospitalBeds * 0.35)
  - severeImpact.severeCasesByRequestedTime;

  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
