let upgradeTime = document.getElementById("countdown-time") ? .dataset ? .countdown;
var end = new Date(upgradeTime);
var _second = 1000;
var _minute = _second * 60;
var _hour = _minute * 60;
var _day = _hour * 24;
var timer;

function showRemaining() {
    let now = new Date();
    let distance = end - now;
    if (distance < 0) {
        clearInterval(timer);
        return;
    }
    let days = Math.floor(distance / _day);
    let hours = Math.floor((distance % _day) / _hour);
    let minutes = Math.floor((distance % _hour) / _minute);
    let seconds = Math.floor((distance % _minute) / _second);

    function pad(n) {
        return (n < 10 ? "0" + n : n);
    }
    document.getElementById("days").innerText = pad(days)
    document.getElementById("hours").innerText = pad(hours)
    document.getElementById("min").innerText = pad(minutes)
    document.getElementById("sec").innerText = pad(seconds)
}
timer = setInterval(showRemaining, 1000);