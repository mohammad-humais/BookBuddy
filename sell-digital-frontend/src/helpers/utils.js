
// Display Money in Indian Format
export const displayMoney = (n) => {
    const numFormat = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'PKR',
    });

    return numFormat.format(n).split('.', 1);
};


// Calculate Discount Percentage
export const calculateDiscount = (discountedPrice, originalPrice) => {
    const discountedPercent = (discountedPrice / originalPrice) * 100;
    return Math.round(discountedPercent);
};


// Calculate Total Amount
export const calculateTotal = (arr) => {
    let total = arr.reduce((accum, item) => accum + item.updatedPrice, 0);
    total = Number(total)
    return total;
};