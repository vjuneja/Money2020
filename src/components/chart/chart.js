import React, {
    Component
} from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import moment from 'moment'
import { getTotalBalance } from '../../scripts/balances'
import {formatterAbbrev} from '../../utils'
import "./chart.css"

const buildOptions = (balances, chartWidth) => {
    return {
        chart: {
            type: "line",
            height: 250,
            followTouchMove: true
        },
        tooltip: {
            shadow: false,
            borderWidth: 0,
            backgroundColor: 'transparent',
            crosshairs: [true],
            positioner: () => {
                return { x: chartWidth, y: 0 };
            },
            formatter: function () {
                const colorClass = this.y > 0 ? 'green' : 'red' 
                return `
                    <div class="mui--text-title ${colorClass}">${formatterAbbrev.format(this.y)}</div><br/>
                    <div>${moment(this.x).format('YY-MM-DD')}
                    </div>`;
            }
        },
        title: {
          text: ''
        },
        xAxis: {
            type: 'datetime',
            gridLineColor: 'transparent',
            crosshair: {
                width: 3,
                color: 'lightgray'
            },
            plotLines: [{
                color: 'lightblue',
                value: moment(Date()).valueOf(),
                width: 2
            }]
        },
        legend: {
            enabled: false
        },
        yAxis: {
            lineWidth: 0,
            minorGridLineWidth: 0,
            gridLineColor: 'transparent',
            plotLines: [{
                color: 'red',
                value: 0,
                width: 2
            }],
            title: {
                text: ''
            }
        },
        series: [{
            data: Object.keys(balances).filter(key => moment(key) <= moment())
                .map(key => [moment(key).valueOf(), balances[key]]),
            color: "lightblue"
        },
        {
            data: Object.keys(balances).filter(key => moment(key) > moment())
                .map(key => [moment(key).valueOf(), balances[key]]),
            dashStyle: 'shortdash',
            color: "lightblue"
        }],
    }
}

class HomePage extends Component {
    constructor() {
        super();
        this.state = {
            title: "chart",
            chartData: {},
            chartWidth: 250
        };
    }

    getOptions() {
        return buildOptions(this.state.chartData, this.state.chartWidth)
    }

    componentDidMount() {
        getTotalBalance("2018-08-01", "2018-11-31").then((response) => {
            this.setState({
                chartData: response,
                // chartWidth: document.getElementsByClassName("chartContainer").width()
            })
        })
        document.getElementsByClassName("highcharts-credits")[0].remove()
    }

    render() {
        return ( 
            <div className="line-chart" id="chartContainer">
                <HighchartsReact
                    highcharts={Highcharts}
                    options={this.getOptions()}
                />
            </div>
        );
    }
}

HomePage.propTypes = {
    test: PropTypes.string
}

export default HomePage;
