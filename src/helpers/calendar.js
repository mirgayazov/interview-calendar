const _ = require('lodash');
const {nanoid} = require('nanoid')
const KEY = 'mirgayazov-kamil-interview-calendar-data';

class Calendar {
    constructor(date = new Date()) {
        this.date = date;
        this.weeks = [];
        this.weeksCount = 0;
        this.events = JSON.parse(localStorage.getItem(KEY)) ?? {};
        this.daysCount = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

        let week = [];

        const different = new Date(date.getFullYear(), date.getMonth(), 1).getDay() - 1;
        let counter = 0;

        week.push({
            number: '',
        })

        if (different > 0) {
            for (let i = 0; i < different; i++) {
                week.push({
                    number: '•',
                })
            }
            counter = different
        }

        for (let i = 0; i < this.daysCount; i++) {
            week.push({
                id: nanoid(),
                date: `${i + 1}/${this.month + 1}/${this.year}`,
                number: i + 1,
                events: this.events[`${i + 1}/${this.month + 1}/${this.year}`] || {},
            })
            counter++
            if (!((counter) % 7) || (i + 1) === this.daysCount) {
                this.weeks.push(week);
                this.weeksCount++;
                week = [];
                week.push({
                    number: '',
                })
            }
        }


        this.weekNumber = 0;
        this.currentWeek = this.weeks[this.weekNumber];
        let currentDay = new Date();

        if (currentDay.getMonth() === this.month && currentDay.getFullYear() === this.year) {
            this.weeks.forEach((week, i) => {
                let arr = Array.from(week, day => day.number);
                if (arr.includes(currentDay.getDate())) {
                    this.currentWeek = this.weeks[i];
                    this.currentWeek[currentDay.getDay()] = {
                        ...this.currentWeek[currentDay.getDay()],
                        today: true,
                    }
                    // this.currentWeek = this.currentWeek.map(day => {
                    //     if (day.number === currentDay.getDate() + 1) {
                    //         day.today = true
                    //     }
                    //     return day
                    // })
                    this.weekNumber = i;
                }
            })
        }

        const different2 = new Date(date.getFullYear(), date.getMonth(), this.daysCount).getDay();
        let trueDif = 0;
        if (different2) {
            trueDif = 7 - different2;
        }

        if (trueDif) {
            for (let i = 0; i < trueDif; i++) {
                if (this.weeks[this.weeksCount - 1].length < 8) {
                    this.weeks[this.weeksCount - 1].push({
                        number: '•',
                    })
                }
            }
        }
    }

    createEvent() {
        let dateAndTime = prompt('Enter event time (format: YYYY-MM-DD HH):')
        if (!dateAndTime) {
            return this
        }
        dateAndTime = dateAndTime.trim()
        let [date, h] = dateAndTime.split(' ');
        let [Y, M, D] = date.split('-');
        let ind = +h > 15 ? (+h % 8) + 8 : (+h % 8)

        if (this.events[`${+D}/${+M}/${+Y}`]) {
            this.events[`${+D}/${+M}/${+Y}`][ind] = 1
        } else {
            this.events[`${+D}/${+M}/${+Y}`] = {};
            this.events[`${+D}/${+M}/${+Y}`][ind] = 1
        }

        localStorage.setItem(KEY, JSON.stringify(this.events))

        return new Calendar(this.date)
    }

    removeEvent(weekDay, timeInd) {
        delete this.events[this.currentWeek[weekDay].date][timeInd]
        localStorage.setItem(KEY, JSON.stringify(this.events))

        return new Calendar(this.date)
    }

    get year() {
        return this.date.getFullYear();
    }

    get month() {
        return this.date.getMonth();
    }

    get day() {
        return this.date.getDate();
    }

    setNextWeek() {
        if (this.weekNumber + 1 < this.weeksCount) {
            this.weekNumber++;
            this.currentWeek = this.weeks[this.weekNumber]
        }

        return this.currentWeek
    }

    setPreviousWeek() {
        if (this.weekNumber - 1 >= 0) {
            this.weekNumber--;
            this.currentWeek = this.weeks[this.weekNumber]
        }

        return this.currentWeek
    }

    setNextMonth() {
        return new Calendar(new Date(this.month === 11 ? this.year + 1 : this.year, this.month === 11 ? 0 : this.month + 1, 1))
    }

    setPreviousMonth() {
        return new Calendar(new Date(this.month >= 1 ? this.year : this.year - 1, this.month >= 1 ? this.month - 1 : 11, 1))
    }

    snapshot() {
        return _.cloneDeep(this)
    }

    print() {
        let clone = _.cloneDeep(this);
        delete clone.weeks;
        console.log(JSON.stringify(clone))
    }
}

export default Calendar;
