// ©2024 Austin App House. All rights reserved.
export default (startDate, endDate ) => {
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        return "";
    }
    return parseFloat((endDate - startDate) / (1000 * 60 * 60)).toFixed(2);
}