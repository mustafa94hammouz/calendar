import React from "react";

import { Button } from "reactstrap";
import moment from "moment";
import "../../icons/style.css";
import "./style.scss";

class Calendar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedMonth: moment(),
            selectedDay: moment().startOf("day"),
            selectedMonthEvents: [],
            leftArrowDisabled: false,
            rightArrowDisabled: false,
            allPreScheduledRides: null,


        };

        this.previous = this.previous.bind(this);
        this.next = this.next.bind(this);
        this.showCalendar = this.showCalendar.bind(this);
        this.goToCurrentMonthView = this.goToCurrentMonthView.bind(this);
        this.initialiseEvents = this.initialiseEvents.bind(this);
    }

    componentDidMount() {
        this.initialiseEvents();
    }


    previous() {
        const currentMonthView = this.state.selectedMonth;

        if(!moment().isSame(this.state.selectedMonth, 'month')){
            this.setState({
                selectedMonth: currentMonthView.subtract(1, "month")
            });
        }
    }

    next() {
        const currentMonthView = this.state.selectedMonth;
        this.setState({
            selectedMonth: currentMonthView.add(1, "month")
        });
    }

    select(day) {
        if(day.isCurrentMonth) {
            this.setState({
                selectedMonth: day.date,
                selectedDay: day.date.clone(),
            });
        }
    }

    goToCurrentMonthView(){
        this.setState({
            selectedMonth: moment()
        });
    }

    showCalendar() {
        this.setState({
            selectedMonth: this.state.selectedMonth,
            selectedDay: this.state.selectedDay,
        });
    }

    capitalize(value) {
        return value.substr(0,1).toUpperCase() + value.substr(1);
    }

    renderMonthLabel() {
        const currentMonthView = this.state.selectedMonth;
        return (
            <span className="box MonthLabel">
                {this.capitalize(currentMonthView.format('MMMM YYYY'))}
            </span>
        );
    }

    renderWeeks() {
        const currentMonthView = this.state.selectedMonth;
        const currentSelectedDay = this.state.selectedDay;
        const monthEvents = this.state.selectedMonthEvents;

        let weeks = [];
        let numberOfWeeks = 0;
        let previousCurrentNextView = currentMonthView
            .clone()
            .startOf("month")
            .day(moment().day(1).format('dddd'));
        let i = 0;

        while (numberOfWeeks <= 5) {
            weeks.push(
                <Week key={i++}
                      previousCurrentNextView={previousCurrentNextView.clone()}
                      currentMonthView={currentMonthView}
                      monthEvents={monthEvents}
                      selected={currentSelectedDay}
                      select={day => this.select(day)}/>
            );
            previousCurrentNextView.add(1, "w");
            numberOfWeeks++;
        }
        return weeks;
    }

    initialiseEvents() {
        const monthEvents = this.state.selectedMonthEvents;

        let allEvents = [];

        var event1 = {
            title:
                "Press the Add button and enter a name for your event. P.S you can delete me by pressing me!",
            date: moment(),
            dynamic: false
        };

        var event2 = {
            title: "Event 2 - Meeting",
            date: moment().startOf("day").subtract(2, "d").add(2, "h"),
            dynamic: false
        };

        var event3 = {
            title: "Event 3 - Cinema",
            date: moment().startOf("day").subtract(7, "d").add(18, "h"),
            dynamic: false
        };

        var event4 = {
            title: "Event 4 - Theater",
            date: moment().startOf("day").subtract(16, "d").add(20, "h"),
            dynamic: false
        };

        var event5 = {
            title: "Event 5 - Drinks",
            date: moment().startOf("day").subtract(2, "d").add(12, "h"),
            dynamic: false
        };

        var event6 = {
            title: "Event 6 - Diving",
            date: moment().startOf("day").subtract(2, "d").add(13, "h"),
            dynamic: false
        };

        var event7 = {
            title: "Event 7 - Tennis",
            date: moment().startOf("day").subtract(2, "d").add(14, "h"),
            dynamic: false
        };

        var event8 = {
            title: "Event 8 - Swimmming",
            date: moment().startOf("day").subtract(2, "d").add(17, "h"),
            dynamic: false
        };

        var event9 = {
            title: "Event 9 - Chilling",
            date: moment().startOf("day").subtract(2, "d").add(16, "h"),
            dynamic: false
        };

        var event10 = {
            title:
                "Hello World",
            date: moment().startOf("day").add(5, "h"),
            dynamic: false
        };

        allEvents.push(event1);
        allEvents.push(event2);
        allEvents.push(event3);
        allEvents.push(event4);
        allEvents.push(event5);
        allEvents.push(event6);
        allEvents.push(event7);
        allEvents.push(event8);
        allEvents.push(event9);
        allEvents.push(event10);

        for (var i = 0; i < allEvents.length; i++) {
            monthEvents.push(allEvents[i]);
        }

        this.setState({
            selectedMonthEvents: monthEvents
        });
    }

    render() {
        return (
            <section className="MainCalendar">
                <header className="CalendarHeader">
                    <div className="Row HeaderTitle">
                        <Button className="ArrowWrapper">
                            <i className= {moment().isSame(this.state.selectedMonth, 'month')? "icons left-arrow arrowDisabled" :  "icons left-arrow"}
                               onClick={this.previous} />

                        </Button>
                        <div className="box HeaderText">
                            {this.renderMonthLabel()}
                        </div>
                        <Button className="ArrowWrapper">
                            <i className="icons right-arrow " onClick={this.next} />

                        </Button>
                    </div>
                    <DayNames />
                </header>
                <div className="DaysContainer">
                    {this.renderWeeks()}
                </div>
            </section>
        );
    }
}

class DayNames extends React.Component {

    render() {
        return (
            <div className="Row DaysHeader">
                <span className="box DayName">{moment().day(1).format('ddd')}</span>
                <span className="box DayName">{moment().day(2).format('ddd')}</span>
                <span className="box DayName">{moment().day(3).format('ddd')}</span>
                <span className="box DayName">{moment().day(4).format('ddd')}</span>
                <span className="box DayName">{moment().day(5).format('ddd')}</span>
                <span className="box DayName">{moment().day(6).format('ddd')}</span>
                <span className="box DayName">{moment().day(0).format('ddd')}</span>
            </div>
        );
    }
}

class Week extends React.Component {
    render() {
        let days = [];
        let { currentMonthView, selected, select, monthEvents } = this.props;
        let date = this.props.previousCurrentNextView;

        let k = 0;
        for (let i = 0; i < 7; i++) {
            let dayHasEvents = false;

            for (var j = 0; j < monthEvents.length; j++) {
                if (monthEvents[j].date.isSame(date, "day")) {
                    dayHasEvents = true;
                }
            }

            let day = {
                name: date.format("dd").substring(0, 1),
                number: date.date(),
                isCurrentMonth: date.month() === currentMonthView.month(),
                isBeforeToday: date.isBefore(new Date(), "day") ,
                isToday: date.isSame(new Date(), "day"),
                date: date,
                hasEvents: dayHasEvents
            };
            k++;
            days.push(<Day key={i*k}
                           day={day}
                           selected={selected}
                           select={select} />);
            date = date.clone();
            date.add(1, "d");
        }
        return (
            <div className="Row Week">
                {days}
            </div>
        );
    }
}

class Day extends React.Component {
    render() {
        let day = this.props.day;
        let selected = this.props.selected;
        let select = this.props.select;
        return (
            <div
                className={
                    "Day" +
                    (day.isToday ? " today" : "") +
                    (day.isCurrentMonth ? "" : " DifferentMonth") +
                    (day.isBeforeToday ? " BeforeToday" : " ") +
                    (day.date.isSame(selected) ? " selected" : "") +
                    (day.hasEvents && day.isCurrentMonth ? " HasEvents " : "")
                }
                onClick={() => select(day)}>
                {day.isCurrentMonth &&
                <div className={
                    (day.hasEvents ? day.date.isSame(selected) ? " WhiteCircle" : " RedCircle" : "") }> </div>
                }
                <div className="DayNumber">{day.number}</div>
            </div>
        );
    }
}


export default Calendar;



