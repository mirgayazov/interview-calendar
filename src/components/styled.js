import styled from "styled-components";

const size = {
    tabletPlus: '740px',
};

const device = {
    tabletPlus: `(min-width: ${size.tabletPlus})`,
};

export const CalendarWrapper = styled.div`
  display: grid;
  grid-template-areas:
    "header"
    "grid"
    "footer";
  grid-template-rows: 1fr auto 1fr;

  @media ${device.tabletPlus} {
    margin: 0 auto;
    max-width: 740px;
  };
`;

export const Row = styled.tr``;

export const Header = styled.div`
  position: sticky;
  height: 10vh;
  top: 0;
  background-color: #ffffff;
  grid-area: header;
  display: grid;
  border: 1px solid #efefef;
  grid-template-areas:
    "title create-event";
  align-items: center;
  grid-template-columns: 1fr auto 5%;
`;

export const Title = styled.div`
  background-color: #ffffff;
  margin-left: 5%;
  grid-area: title;
`

export const Footer = styled.div`
  background-color: #f6f6f6;
  grid-area: footer;
  position: sticky;
  bottom: 0;
  display: grid;
  grid-template-areas: "today info delete";
`

export const EventTable = styled.table`
  table-layout: fixed;
  border-collapse: collapse;
  padding: 3px;
  width: 100%;
  height: 100vh;
  text-align: center;
  grid-area: grid;
`

export const WeekDayCell = styled.td`
  background-color: #f6f6f6;
  text-align: center;
  font-weight: 700;
  height: 1vh;
  padding: 5px;
  font-size: 1rem;
`

export const GrayCell = styled.td`
  background-color: #f6f6f6;
  height: 1vh;
  text-align: center;
`

export const EmptyCell = styled.td`
  border: 1px solid #efefef;
  text-align: center;
`

export const MarkedCell = styled.td`
  background: #ebecff;
  padding: 10px;
  cursor: pointer;
`

export const TimeCell = styled.td`
  color: #afafaf;
  border-left: 0.5px solid #efefef;
`

export const TodayMarker = styled.div`
  max-width: 35%;
  margin: 0 auto;
  background: red;
  color: white;
  grid-area: today;
  border-radius: 50%;
  @media ${device.tabletPlus} {
    max-width: 25%;
  };
`

export const CreateEvent = styled.button`
  border: none;
  text-decoration: none;
  color: red;
  grid-area: create-event;
  margin-right: 5%;
  background-color: transparent;
  font-family: sans-serif;
  font-size: 2rem;
  cursor: pointer;
  text-align: center;
`

export const ShowInfo = styled.button`
  border: none;
  margin-right: 5%;
  grid-area: info;
  text-decoration: none;
  color: #57a257;
  background-color: transparent;
  font-family: sans-serif;
  font-size: 1rem;
  cursor: pointer;
`

export const DeleteEvent = styled.button`
  border: none;
  margin-right: 5%;
  grid-area: delete;
  text-decoration: none;
  color: red;
  background-color: transparent;
  font-family: sans-serif;
  font-size: 1rem;
  cursor: pointer;
  text-align: right;
`

export const ScrollToToday = styled.button`
  border: none;
  margin-left: 5%;
  text-decoration: none;
  color: red;
  background-color: transparent;
  font-family: sans-serif;
  font-size: 1rem;
  cursor: pointer;
  text-align: left;
`

export const GoToPrevious = styled.button`
  border: none;
  margin: 0;
  text-decoration: none;
  color: red;
  background-color: transparent;
  font-family: sans-serif;
  font-size: 1rem;
  cursor: pointer;
`

export const GoToNext = styled.button`
  border: none;
  margin: 0;
  text-decoration: none;
  color: red;
  background-color: transparent;
  font-family: sans-serif;
  font-size: 1rem;
  cursor: pointer;
`
