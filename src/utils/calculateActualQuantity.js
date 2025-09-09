// ©2024 Austin App House. All rights reserved.
export default (arrayOfData) => {
    let totalQuantity = 0.00;
    const hrs = 60 * 60 * 1000; // minutes*seconds*milliseconds
    for (let i = arrayOfData.length -1 ; i >=0 ; i--) {
        const startDate = new Date(arrayOfData[i].check_in_date);
        const endDate = new Date(arrayOfData[i].check_out_date);
        if (!(isNaN(startDate.getTime()) || isNaN(endDate.getTime()))) {
            totalQuantity = ((endDate - startDate) / hrs + parseFloat(totalQuantity)).toFixed(2);
        }
    }
    if (totalQuantity < 0) totalQuantity = 0;
    return totalQuantity;
}