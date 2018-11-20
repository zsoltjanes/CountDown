// Constructor function
const CountDown = function (date, txtElement, dayText = "day", hourText = "hour", minuteText = "minute", secondsText = "seconds") {
    this.date = new Date(date).getTime();
    this.txtElement = txtElement;
    this.day = 0;
    this.hour = 0;
    this.minute = 0;
    this.seconds = 0;
    this.dayText = dayText;
    this.hourText = hourText;
    this.minuteText = minuteText;
    this.secondsText = secondsText;
    this.counter();
}

// Counter method
CountDown.prototype.counter = function () {

    // Get the current date and time
    let now = new Date().getTime();

    // Count the difference between now and the set time
    let difference = this.date - now;

    // Calculate day, hour, minute, seconds from the difference
    this.day = Math.floor(difference / (1000 * 60 * 60 * 24));
    this.hour = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    this.minute = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    this.seconds = Math.floor((difference % (1000 * 60)) / 1000);

    // Display the result
    this.txtElement.innerHTML = `${this.day} ${this.dayText} ${this.hour} ${this.hourText} ${this.minute} ${this.minuteText} ${this.seconds} ${this.secondsText}`;

    if (difference < 0) {
        // Change the counter to Live if its over the set date
        this.txtElement.innerHTML = "LIVE";
    } else {
        // Update every 1 second
        setTimeout(() => this.counter(), 1000);
    }
}


// Init On DOM Load
document.addEventListener('DOMContentLoaded', init);

// Init app
function init() {

    // Display the result in this element
    const txtElement = document.querySelector('.txt-countdown');

    // Init CountDown if txtElement exists
    if (txtElement !== null) {

        if (txtElement.hasAttribute("data-date")) {
            // Set the date
            var date = txtElement.getAttribute('data-date');
        } else {
            // If not set get the error message
            console.error('No date set!');
            return;
        }

        if (txtElement.hasAttribute("data-language")) {
            // Get the translated day, hour, minute, seconds texts
            var language = JSON.parse(txtElement.getAttribute('data-language'));

            // Language variables
            var dayText = language[0];
            var hourText = language[1];
            var minuteText = language[2];
            var secondsText = language[3];
        } else {
            // If not set get the error message
            console.error('No language texts set!');
            return;
        }

        new CountDown(date, txtElement, dayText, hourText, minuteText, secondsText);
    }
}