
const time = document.querySelector("#time");
const hours = document.querySelector("#hours");
const minutes = document.querySelector("#minutes");
const ampm = document.querySelector("#am-pm");
const alarmBtn = document.querySelector("#alarm-btn");
const alarmInputs = document.querySelectorAll("select");
const ringtone = new Audio("audio/ringtone.mp3");

let isAlarmSet = false;
let alarmTime = null;

for (let cnt = 0; cnt < 60; ++cnt) {

    const option = document.createElement("option");
    option.value = option.innerText = cnt < 10 ? '0' + cnt : cnt;

    minutes.append(option);

    if (cnt >= 1 && cnt <= 12)
        hours.append(option.cloneNode(true));
}

const setDate = () => {

    const date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    let ampm = "AM";

    if (h > 12) {
        h = h - 12;
        ampm = "PM";
    }

    h = h == 0 ? 12 : h < 10 ? '0' + h : h;
    m = m >= 10 ? m : '0' + m;
    s = s >= 10 ? s : '0' + s;

    time.innerText = `${h}:${m}:${s} ${ampm}`;

    if (alarmTime == time.innerText) {
        ringtone.play();
        ringtone.loop = true;
        ringtone.currentTime = 0;
    }

}

setDate();
setInterval(setDate, 1000)

const setAlarm = () => {

    if (isAlarmSet) {
        ringtone.pause();
        isAlarmSet = false;
        alarmInputs.forEach(select => select.disabled = false);
        alarmBtn.innerText = 'Set Alarm';
        return;
    }

    const h = hours.value;
    const m = minutes.value;
    const i = ampm.value;

    alarmTime = `${h}:${m}:00 ${i}`;
    isAlarmSet = true;

    alarmInputs.forEach(select => select.disabled = true);
    alarmBtn.innerText = 'Clear Alarm';
}

alarmBtn.addEventListener("click", setAlarm);
