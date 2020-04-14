const convertToDays = (data) => {
  const { periodType, timeToElapse } = data;

  if (periodType === 'days') {
    return timeToElapse * 1;
  }
  if (periodType === 'weeks') {
    return timeToElapse * 7;
  }
  if (periodType === 'months') {
    return timeToElapse * 30;
  }
  return 0;
};

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

  const impactSevereCases = Math.trunc(impact.infectionsByRequestedTime * 0.15);
  const severeImpactSevereCases = Math.trunc(severeImpact.infectionsByRequestedTime * 0.15);

  impact.severeCasesByRequestedTime = impactSevereCases;
  severeImpact.severeCasesByRequestedTime = severeImpactSevereCases;

  const hospitalBedsByRequestedTime = totalHospitalBeds * 0.35;

  impact.hospitalBedsByRequestedTime = Math.ceil(hospitalBedsByRequestedTime)
  - impact.severeCasesByRequestedTime;
  severeImpact.hospitalBedsByRequestedTime = Math.ceil(hospitalBedsByRequestedTime)
  - severeImpact.severeCasesByRequestedTime;

  const icasesForICUByRequestedTime = impact.infectionsByRequestedTime * 0.05;
  const sIcasesForICUByRequestedTime = severeImpact.infectionsByRequestedTime * 0.05;

  const icasesForVentilatorsByRequestedTime = impact.infectionsByRequestedTime * 0.02;
  const sIForVentilatorsByRequestedTime = severeImpact.infectionsByRequestedTime * 0.02;

  impact.casesForICUByRequestedTime = Math.trunc(icasesForICUByRequestedTime);
  severeImpact.casesForICUByRequestedTime = Math.trunc(sIcasesForICUByRequestedTime);

  impact.casesForVentilatorsByRequestedTime = Math.trunc(icasesForVentilatorsByRequestedTime);
  severeImpact.casesForVentilatorsByRequestedTime = Math.trunc(sIForVentilatorsByRequestedTime);

  impact.dollarsInFlight = (impact.infectionsByRequestedTime * 0.65)
  * 1.5 * convertToDays(data);
  severeImpact.dollarsInFlight = (severeImpact.infectionsByRequestedTime * 0.65)
  * 1.5 * convertToDays(data);

  return {
    data,
    impact,
    severeImpact
  };
};


export default covid19ImpactEstimator;
