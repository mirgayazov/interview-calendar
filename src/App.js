import Calendar from "./helpers/calendar";
import {useState} from "react";
import {nanoid} from "nanoid";
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer} from "react-toastify";
import {
    CalendarWrapper, CreateEvent, DeleteEvent, EmptyCell,
    EventTable, Footer, GoToNext, GoToPrevious,
    GrayCell, Header, MarkedCell, Row,
    ScrollToToday, ShowInfo, TimeCell, Title,
    TodayMarker, WeekDayCell
} from "./components/styled";

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const weekDays = ['', 'M', 'T', 'W', 'T', 'F', 'S', 'S'];

const App = () => {
    const [calendar, updateCalendar] = useState(new Calendar());
    const [isDeleteBtnHidden, setIsDeleteBtnHidden] = useState(true);
    const [targetEvent, setTargetEvent] = useState(null);

    const nextWeek = () => {
        calendar.setNextWeek()
        setTargetEvent(null);
        setIsDeleteBtnHidden(true);
        updateCalendar(calendar.snapshot())
    };

    const previousWeek = () => {
        calendar.setPreviousWeek()
        setTargetEvent(null);
        setIsDeleteBtnHidden(true);
        updateCalendar(calendar.snapshot())
    };

    const nextMonth = () => {
        setTargetEvent(null);
        setIsDeleteBtnHidden(true);
        updateCalendar(calendar.setNextMonth())
    };

    const previousMonth = () => {
        setTargetEvent(null);
        setIsDeleteBtnHidden(true);
        updateCalendar(calendar.setPreviousMonth())
    };

    return (
        <CalendarWrapper>
            <ToastContainer/>
            <Header>
                <Title>
                    Interview Calendar
                </Title>
                <CreateEvent onClick={() => updateCalendar(calendar.createEvent())}>
                    +
                </CreateEvent>
            </Header>
            <EventTable>
                <tbody>
                <Row>
                    {weekDays.map(day => {
                        return (
                            <WeekDayCell key={nanoid()}>
                                {day}
                            </WeekDayCell>
                        );
                    })}
                </Row>
                <Row>
                    {calendar.currentWeek.map(day => {
                        return (
                            <GrayCell key={nanoid()}>
                                {day.today ? <TodayMarker>{day.number}</TodayMarker> : day.number}
                            </GrayCell>
                        );
                    })}
                </Row>

                <Row>
                    <GrayCell/>
                    <GrayCell colSpan="2">
                        <GoToPrevious onClick={previousWeek}>{'<'}</GoToPrevious>
                    </GrayCell>
                    <GrayCell colSpan="3">
                        week {calendar.weekNumber + 1}/{calendar.weeksCount}
                    </GrayCell>
                    <GrayCell colSpan="2">
                        <GoToNext onClick={nextWeek}>{'>'}</GoToNext>
                    </GrayCell>
                </Row>
                <Row>
                    <GrayCell/>
                    <GrayCell colSpan="2">
                        <GoToPrevious onClick={previousMonth}>{'<'}</GoToPrevious>
                    </GrayCell>
                    <GrayCell colSpan="3">
                        {monthNames[calendar.month]} {calendar.year}
                    </GrayCell>
                    <GrayCell colSpan="2">
                        <GoToNext onClick={nextMonth}>{'>'}</GoToNext>
                    </GrayCell>
                </Row>
                {(new Array(13)).fill(0).map((x, i) => {
                    return (
                        <Row key={nanoid()}>
                            {calendar.currentWeek.map((day, j) => {
                                if (day.events && day.events[i]) {
                                    return (
                                        <MarkedCell
                                            key={nanoid()}
                                            title={day.events[i].info}
                                            onClick={() => {
                                                console.log('123')
                                                setTargetEvent([j, i])
                                                setIsDeleteBtnHidden(false)
                                            }}
                                        />
                                    )
                                } else if (j) {
                                    return (
                                        <EmptyCell key={nanoid()}>
                                            {day.events ? day.events[i] ?? '' : j ? '' : `${i > 1 ? i + 8 : '0' + (i + 8)}:00`}
                                        </EmptyCell>
                                    )
                                } else {
                                    return (
                                        <TimeCell key={nanoid()}>
                                            {`${i > 1 ? i + 8 : '0' + (i + 8)}:00`}
                                        </TimeCell>
                                    )
                                }
                            })}
                        </Row>
                    );
                })}
                </tbody>
            </EventTable>
            <Footer>
                <ScrollToToday onClick={() => updateCalendar(new Calendar())}>
                    Today
                </ScrollToToday>
                <ShowInfo onClick={() => calendar.showInfo(...targetEvent)}
                          hidden={isDeleteBtnHidden}
                >
                    Event info
                </ShowInfo>
                <DeleteEvent
                    hidden={isDeleteBtnHidden}
                    onClick={() => {
                        updateCalendar(calendar.removeEvent(...targetEvent))
                        setTargetEvent(null)
                        setIsDeleteBtnHidden(true)
                    }}
                >
                    Delete
                </DeleteEvent>
            </Footer>
        </CalendarWrapper>
    );
}

export default App;
