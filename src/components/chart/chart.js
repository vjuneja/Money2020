import React, {
    Component
} from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import moment from 'moment'
import { getTotalBalance } from '../../scripts/balances'

const getOptions = () => {
    const balances = getTotalBalance("2018-10-01", 100)
    return {
        chart: {
            pinchType: 'x',
            height: 300,
            followTouchMove: true
        },
        title: {
          text: 'balance prediction'
        },
        xAxis: {
            type: 'datetime'
        },
        legend: {
            enabled: false
        },
        yAxis: {
            plotLines: [{
                color: 'red',
                value: 0,
                width: 2
            }],
            scrollbar: {
                enabled: true,
                showFull: false
            }
        },
        series: [{
            data: Object.keys(balances).map(key => [moment(key).valueOf(), balances[key]])
        }]
    }
}

class HomePage extends Component {
    constructor() {
        super();
        this.state = {
            title: "chart"
        };
    }
    render() {
        return ( 
            <div>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={getOptions()}
                />
            </div>
        );
    }
}

HomePage.propTypes = {
    test: PropTypes.string
}

export default HomePage;
