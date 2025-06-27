export const formatDateTime = (dateTime) => {

    const date = new Date(dateTime?.value);

    if(dateTime?.type === "DateAndTime"){
        return date.toLocaleString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true, // Enables AM/PM format
            timeZone: "Asia/Kolkata", // Adjust to your local timezone (India, for example)
        });
    } else {
        return date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            timeZone: "Asia/Kolkata", // Adjust to your timezone
        });
    }

};