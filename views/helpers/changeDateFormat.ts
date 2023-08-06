// type: date | time
const changeDateFormat = (dateString: string, type: string) => {
  // Parse the original date string
  const originalDate = new Date(dateString);

  // Extract year, month, and day components
  const year = originalDate.getFullYear();
  const month = String(originalDate.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(originalDate.getDate()).padStart(2, '0');
  // Form the "yyyy-mm-dd" format
  const formattedDateStr = `${year}-${month}-${day}`;

  // Extract hour, minute, and second components
  const hours = String(originalDate.getHours()).padStart(2, '0');
  const minutes = String(originalDate.getMinutes()).padStart(2, '0');
  const seconds = String(originalDate.getSeconds()).padStart(2, '0');

  // Form the "hh:mm:ss" format
  const formattedTimeStr = `${hours}:${minutes}:${seconds}`;

  if (type.toLowerCase() === 'date') {
    return formattedDateStr;
  }

  if (type.toLowerCase() === 'time') {
    return formattedTimeStr;
  }
};

export default changeDateFormat;
