// ©2024 Austin App House. All rights reserved.
export function orderCertifications(array) {
  const firstColumnLabels = [
    "Passed Gold Background Test",
    "Passed Silver Background Test",
    "Passed Gold Drug Test",
    "Passed Silver Drug Test"
  ];
  const secondColumnLabels = [
    "Liability Insurance",
    "Workers Comp Insurance",
    "Soft Skills Certified",
    "Cabling Certified"
  ];
  const thirdColumnLabels = [
    "Project Management Certified",
    "Project Coordinator Certified",
    "Project Administrator Certified"
  ];
  const orderedArray = [];

  // First column
  firstColumnLabels.forEach(label => {
    const item = array.find(item => item.name === label);
    if (item) orderedArray.push(item);
  });

  // Second column
  secondColumnLabels.forEach(label => {
    const item = array.find(item => item.name === label);
    if (item) orderedArray.push(item);
  });

  // Third column
  thirdColumnLabels.forEach(label => {
    const item = array.find(item => item.name === label);
    if (item) orderedArray.push(item);
  });

  return orderedArray;
}
