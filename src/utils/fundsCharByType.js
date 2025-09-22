// ©2024 Austin App House. All rights reserved.
const fundsCharByType = (type = 'refill') => {
  switch (type) {
    case 'reserved': return '-';
    case 'paid': return '-';
    case 'canceled': return '';
    case 'refill': return '+';
    case 'automatic': return '+';
    case 'fee': return '-';
    default: return '';
  }
};

export default fundsCharByType;
