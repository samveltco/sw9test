// ©2024 Austin App House. All rights reserved.
const getQtyByPayType = (payType, hoursQty, devicesQty, maxQty, payMinimum) => {
  switch (payType) {
    case 'Hour': {
      if (payMinimum) return maxQty;
      return Math.min(hoursQty, maxQty);
    }
    case 'Device': {
      if (payMinimum) return maxQty;
      return Math.min(devicesQty, maxQty);
    }
    case 'Site': return 1;
    default: {
      console.error(`Invalid base pay type(${payType})!`);
      return 0;
    }
  }
};

export default getQtyByPayType;
