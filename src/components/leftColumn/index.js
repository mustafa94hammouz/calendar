import React, { Component } from 'react';
import './style.scss';
import Grid from "@material-ui/core/Grid/Grid";

class LeftColumn extends Component {
    constructor(props){
        super(props);
        this.state = {
            newDate:false
        };
        this.renderDayEventslist = this.renderDayEventslist.bind(this);
    }
    componentDidMount() {
        this.setState({
            newDate: true
        })
    }

    renderDayEventslist(){
        let list = [];
        for(let i=0; i<this.props.dayEventslist.length; i++){
            list.push(<li key={i}>{this.props.dayEventslist[i].title}</li>)
        }
        return list
    }

    render() {



        return (
            <Grid  item xs={6}>
                <section className="leftColumn">
                    <h1 className='dayNum'>{this.props.dayNumber}</h1>
                    <h2 className='dayName'>{this.props.dayName}</h2>
                    {this.props.dayEventslist.length ? <ul>
                        {this.renderDayEventslist()}
                    </ul> : <ul><p>There is no events in this date</p></ul>}

                </section>
            </Grid>
        );
    }

}

export default LeftColumn;
