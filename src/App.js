import styled from "styled-components";
import Calendar from "./helpers/calendar";
import {useState} from "react";
import {nanoid} from "nanoid";

const size = {
    tabletPlus: '740px',
};

export const device = {
    tabletPlus: `(min-width: ${size.tabletPlus})`,
};

const AppWrapper = styled.div`
  display: grid;
  grid-template-areas:
    "header"
    "days"
    "grid"
    "footer";
  grid-template-rows: 1fr auto auto 1fr;

  @media ${device.tabletPlus} {
    margin: 0 auto;
    max-width: 740px;
  };
`;

const Header = styled.div`
  position: sticky;
  top: 0;
  background-color: #ffffff;
  padding: 10px;
  grid-area: header;
  display: grid;
  grid-template-areas:
    "title create-event";
  grid-template-columns: 1fr auto;
`

const Title = styled.div`
  background-color: #ffffff;
  grid-area: title;
`

const CreateEventButton = styled.button`
  grid-area: create-event;
`

const Footer = styled.div`
  background-color: #f6f6f6;
  grid-area: footer;
  position: sticky;
  bottom: 0;
`

const Days = styled.div`
  background-color: #f6f6f6;
  grid-area: days;
`

const EventTable = styled.table`
  table-layout: fixed; /* Фиксированная ширина ячеек */
  border-collapse: collapse;
  padding: 3px;
  width: 100%;
  text-align: center;
  grid-area: grid;
`

const TD1 = styled.td`
  background-color: #f6f6f6;
  text-align: center;

`

const TD2 = styled.td`
  border: 1px solid #efefef;
  text-align: center;
`



const TD3 = styled.td`
  background: #ebecff;
  padding: 10px;
`

const TD4 = styled.td`
`

const TDToday = styled.span`
  background: red;
  color: white;
  padding: 3px;
  border-radius: 50%;
`

const CreateEventBtn = styled.button`
  display: inline-block;
  border: none;
  margin: 0;
  text-decoration: none;
  color: red;
  background-color: transparent;
  font-family: sans-serif;
  font-size: 2rem;
  cursor: pointer;
  text-align: center;
`

const TodayBtn = styled.button`
  display: inline-block;
  border: none;
  margin: 0;
  text-decoration: none;
  color: red;
  background-color: transparent;
  font-family: sans-serif;
  font-size: 1rem;
  cursor: pointer;
  text-align: center;
`

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
        updateCalendar(calendar.snapshot())
    }

    const previousWeek = () => {
        calendar.setPreviousWeek()
        updateCalendar(calendar.snapshot())
    }

    const nextMonth = () => {
        updateCalendar(calendar.setNextMonth())
    }

    const previousMonth = () => {
        updateCalendar(calendar.setPreviousMonth())
    }

    return (
        <AppWrapper>
            <Header>
                <Title>
                    Interview Calendar
                    <button
                        onClick={() => console.log(calendar)}>+</button>
                </Title>
                <CreateEventBtn onClick={() => updateCalendar(calendar.createEvent())}>
                    +
                </CreateEventBtn>
            </Header>
            <Days>
            </Days>
            <EventTable>
                <tbody>
                <tr>
                    {weekDays.map((day, i) => {
                        return (
                            <TD1 key={nanoid()}>
                                {day}
                            </TD1>
                        );
                    })}
                </tr>
                <tr>
                    {calendar.currentWeek.map(day => {
                        if (day.today) {
                            return (
                                <TD1 key={nanoid()}>
                                    <TDToday>
                                        {day.number}
                                    </TDToday>
                                </TD1>

                            );
                        }
                        return (
                            <TD1 key={nanoid()}>
                                {day.number}
                            </TD1>
                        );
                    })}
                </tr>
                <tr>
                    <TD1/>
                    <TD1 colSpan="3">
                        <button onClick={previousWeek}>-</button>
                        week {calendar.weekNumber + 1}/{calendar.weeksCount}
                        <button onClick={nextWeek}>+</button>
                    </TD1>
                    <TD1 colSpan="4">
                        <button onClick={previousMonth}>-</button>
                        {monthNames[calendar.month]} {calendar.year}
                        <button onClick={nextMonth}>+</button>
                    </TD1>
                </tr>
                {(new Array(13)).fill(0).map((x, i) => {
                    return (
                        <tr key={nanoid()}>
                            {calendar.currentWeek.map((day, j) => {
                                if (day.events && day.events[i]) {
                                    return (
                                        <TD3 key={nanoid()}
                                             onClick={() => {
                                                 setTargetEvent([j, i])
                                                 setIsDeleteBtnHidden(false)
                                             }}/>
                                    )
                                } else if (j) {
                                    return <TD2 key={nanoid()}>
                                        {day.events ? day.events[i] ?? '' : j ? '' : `${i > 1 ? i + 8 : '0' + (i + 8)}:00`}
                                    </TD2>
                                } else {
                                    return <TD4 key={nanoid()}>
                                        {`${i > 1 ? i + 8 : '0' + (i + 8)}:00`}
                                    </TD4>
                                }
                            })}
                        </tr>
                    );
                })}
                </tbody>
            </EventTable>
            <Footer>
                <TodayBtn onClick={() => updateCalendar(new Calendar())}>
                    Today
                </TodayBtn>
                <button hidden={isDeleteBtnHidden} onClick={() => {
                    updateCalendar(calendar.removeEvent(...targetEvent))
                    setTargetEvent(null)
                    setIsDeleteBtnHidden(true)
                }}>
                    Delete
                </button>
            </Footer>
        </AppWrapper>
    );
}

export default App;
