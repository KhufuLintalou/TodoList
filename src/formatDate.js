export function formatDate(date) {
    const year = date.getFullYear();
    let month;
    let day;
    let hour;
    let minute;

    if (date.getMonth() < 9) {
        month = `0${date.getMonth() + 1}`;
    } else {
        month = date.getMonth() + 1;
    }

    if (date.getDate() < 10) {
        day = `0${date.getDate()}`;
    } else {
        day = date.getDate();
    }

    if (date.getHours() < 10) {
        hour = `0${date.getHours()}`
    } else {
        hour = date.getHours();
    }

    if (date.getMinutes() < 10) {
        minute = `0${date.getMinutes()}`
    } else {
        minute = date.getMinutes();
    }

    return `${year}-${month}-${day}T${hour}:${minute}`;
}