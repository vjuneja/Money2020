import React, {
    Component
} from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import moment from 'moment'
import { getTotalBalance, getAggregatedTotalBalance } from '../../scripts/balances'
import {formatterAbbrev} from '../../utils'
import "./chart.css"

const buildOptions = (balances, aggregateChartData) => {
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
                return { x: 250, y: 0 };
            },
            useHTML: true,
            formatter: function () {
                if(this.series.name == 'aggregate')
                    return false ;
                const colorClass = this.y > 0 ? 'darkgreen' : '#f23614' 
                return `
                <table>
                    <tr><td class="mui--text-title" style="font-weight:bold; color:${colorClass}">
                        ${formatterAbbrev.format(this.y)}</td></tr>
                    <tr><td style="text-align: center">${moment(this.x).format('YYYY, MMM DD')}</td></tr>
                </table>`;
            }
        },
        title: {
          text: ''
        },
        xAxis: {
            type: 'datetime',
            // gridLineColor: 'transparent',
            crosshair: {
                width: 3,
                color: 'lightgray'
            },
            plotLines: [{
                color: 'lightblue',
                value: moment(Date()).valueOf(),
                width: 1
            }]
        },
        legend: {
            enabled: true
        },
        yAxis: {
            gridLineColor: 'transparent',
            plotLines: [{
                color: 'red',
                value: 0,
                width: 1
            }],
            title: {
                text: ''
            }
        },
        series: [{
            name: "balance",
            data: Object.keys(balances).filter(key => moment(key) <= moment())
                .map(key => [moment(key).valueOf(), balances[key]]),
            color: "lightgreen",
            lineWidth: 3
        },
        {
            showInLegend: false,
            data: Object.keys(balances).filter(key => moment(key) > moment())
                .map(key => [moment(key).valueOf(), balances[key]]),
            dashStyle: "shortdash",
            color: "lightgreen",
            lineWidth: 3
        },
        {
            name: "aggregate",
            data: Object.keys(aggregateChartData)
                .map(key => [moment(key).valueOf(), aggregateChartData[key]]),
            color: "lightgray",
            lineWidth: 1
        }],
    }
}

class Chart extends Component {
    constructor() {
        super();
        this.state = {
            title: "chart",
            chartData: {},
            aggregateChartData: {}
        };
    }

    getOptions() {
        return buildOptions(this.state.chartData, this.state.aggregateChartData)
    }

    componentDidMount() {
        const { startDate="2018-08-01", endDate="2018-11-31" } = this.props
        Promise.all([
            getTotalBalance(startDate, endDate), 
            getAggregatedTotalBalance(startDate, endDate)
        ]).then((responses) => {
            this.setState({
                chartData: responses[0],
                aggregateChartData: responses[1]
            })
        })
        
        // getTotalBalance(startDate, endDate).then((response) => {
        //     this.setState({
        //         chartData: response
        //     })
        // })
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

Chart.propTypes = {
    startDate: PropTypes.string,
    endDate: PropTypes.string
}

export default Chart;
