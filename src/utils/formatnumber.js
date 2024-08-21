function numberWithCommas(x) {
    let num = Number(x).toFixed(2);
    let parts = num.toString().split(".");
    let lastThree = parts[0].substring(parts[0].length - 3);
    let otherNumbers = parts[0].substring(0, parts[0].length - 3);
    if (otherNumbers != '')
        lastThree = ',' + lastThree;
    parts[0] = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return parts.join(".");
}

export default numberWithCommas;