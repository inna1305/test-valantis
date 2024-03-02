const getDate = () => {
    const currentDate = new Date();
    const offsetMinutes = currentDate.getTimezoneOffset();
    const offsetHours = offsetMinutes / 60;
    const utcDate = new Date(currentDate.getTime() + (offsetHours * 60 * 60 * 1000));
    console.log(utcDate);
    return utcDate;
}

const getTimestamp = (): string => {
   const currentDate = getDate();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    return '' + year + month + day;
}

export default getTimestamp;
