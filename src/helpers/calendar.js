import {toast} from "react-toastify";

const _ = require('lodash');
const {nanoid} = require('nanoid')
const KEY = 'mirgayazov-kamil-interview-calendar-data';

class Calendar {
    constructor(weekNumber = null, date = new Date()) {
        this.date = date;
        this.weeks = [];
        this.weeksCount = 0;
        this.events = JSON.parse(localStorage.getItem(KEY)) ?? {};
        this.daysCount = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

        let week = [];

        const headDif = new Date(date.getFullYear(), date.getMonth(), 1).getDay() - 1;
        let counter = 0;

        week.push({
            number: '',
        })

        if (headDif > 0) {
            for (let i = 0; i < headDif; i++) {
                week.push({
                    number: '•',
                })
            }
            counter = headDif
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
                    this.weekNumber = i;
                }
            })
        }

        if (weekNumber) {
            this.weekNumber = weekNumber;
            this.currentWeek = this.weeks[this.weekNumber];
        }

        const tailDif = new Date(date.getFullYear(), date.getMonth(), this.daysCount).getDay();
        let trueDif = 0;
        if (tailDif) {
            trueDif = 7 - tailDif;
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

    get year() {
        return this.date.getFullYear();
    }

    get month() {
        return this.date.getMonth();
    }

    get day() {
        return this.date.getDate();
    }

    createEvent() {
        let event = prompt('Enter event time (format: YY/YYYY-MM-DD HH some important info):')
        if (!event) {
            return this
        }
        const re1 = /\d{2}-\d{1,2}-\d{1,2} \d{1,2} [А-Яа-яЁёa-zA-Z0-9 ]+/g
        const re2 = /\d{4}-\d{1,2}-\d{1,2} \d{1,2} [А-Яа-яЁёa-zA-Z0-9 ]+/g

        if (!(re1.test(event) || re2.test(event))) {
            toast.warn('Please try again, required format: YY/YYYY-MM-DD HH some important info', {autoClose: 1500})
            return this
        }

        event = event.trim()
        let [date, h, ...info] = event.split(' ');
        let [Y, M, D] = date.split('-');
        let ind = +h > 15 ? (+h % 8) + 8 : (+h % 8)

        if (Y.length === 2) {
            Y = String(this.year).substring(0, 2) + Y;
        }

        if ((+M > 12 || +M < 1)) {
            toast.warn('Month must be between 1 and 12', {autoClose: 1500})
            return this
        }

        let daysCount = new Date(+Y, +M, 0).getDate()

        if ((+D < 1) || +D > daysCount) {
            toast.warn(`Day must be between 1 and ${daysCount} for this month`, {autoClose: 1500})
            return this
        }

        if (+h > 20 || +h < 8) {
            toast.warn(`Hours must be between 8:00 and 20:00`, {autoClose: 1500})
            return this
        }

        info = info.join(' ');
        let time = `${+D}/${+M}/${+Y} ${h}:00 -`

        if (this.events[`${+D}/${+M}/${+Y}`]) {
            if (this.events[`${+D}/${+M}/${+Y}`][ind]) {
                toast.info('This time is already taken, please try again', {autoClose: 1500})
            } else {
                this.events[`${+D}/${+M}/${+Y}`][ind] = {info, time}
            }
        } else {
            this.events[`${+D}/${+M}/${+Y}`] = {};
            this.events[`${+D}/${+M}/${+Y}`][ind] = {info, time}
        }

        localStorage.setItem(KEY, JSON.stringify(this.events))

        return new Calendar(this.weekNumber, this.date)
    }

    removeEvent(weekDay, timeInd) {
        delete this.events[this.currentWeek[weekDay].date][timeInd]
        localStorage.setItem(KEY, JSON.stringify(this.events))

        return new Calendar(this.weekNumber, this.date)
    }

    showInfo(weekDay, timeInd) {
        let target = this.currentWeek[weekDay].events[timeInd];
        toast.info(`${target.time} ${target.info}`, {autoClose: 2000})
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
        return new Calendar(null, new Date(this.month === 11 ? this.year + 1 : this.year, this.month === 11 ? 0 : this.month + 1, 1))
    }

    setPreviousMonth() {
        return new Calendar(null, new Date(this.month >= 1 ? this.year : this.year - 1, this.month >= 1 ? this.month - 1 : 11, 1))
    }

    snapshot() {
        return _.cloneDeep(this)
    }
}

export default Calendar;
