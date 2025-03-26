export function getCurrentDate() {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    let month;
    let day;
    let hour;
    let minute;

    if (currentDate.getMonth() < 9) {
        month = `0${currentDate.getMonth() + 1}`;
    } else {
        month = currentDate.getMonth() + 1;
    }

    if (currentDate.getDate() < 10) {
        day = `0${currentDate.getDate()}`;
    } else {
        day = currentDate.getDate();
    }

    if (currentDate.getHours() < 10) {
        hour = `0${currentDate.getHours()}`
    } else {
        hour = currentDate.getHours();
    }

    if (currentDate.getMinutes() < 10) {
        minute = `0${currentDate.getMinutes()}`
    } else {
        minute = currentDate.getMinutes();
    }

    return `${year}-${month}-${day}T${hour}:${minute}`;
}