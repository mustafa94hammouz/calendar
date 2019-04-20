import React, { Component } from 'react';
import './style.scss';
import Grid from "@material-ui/core/Grid/Grid";

class LeftColumn extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
        this.renderDayEventslist = this.renderDayEventslist.bind(this);
    }

    renderDayEventslist(){
        let list = []
        for(let i=0; i<this.props.dayEventslist.length; i++){
            list.push(<li key={i}>{this.props.dayEventslist[i].title}</li>)
        }
        return list
    }

    render() {



        return (
            <Grid  item xs={6}>
                <section className="leftColumn">
                    <h1 className="dayNum">27</h1>
                    <h2 className='dayName'> Thursday </h2>
                    <ul>
                    {this.renderDayEventslist()}
                    </ul>
                </section>
            </Grid>
        );
    }
}

export default LeftColumn;
