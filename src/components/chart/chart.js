import React, {
    Component
} from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { getTotalBalance } from '../../scripts/balances'

const getData = (startDate) => {
    const balances = getTotalBalance(startDate)
    return {
        labels: Object.keys(balances),
        datasets:[{
            label: "USD",
            data: Object.values(balances)
        }]
    }
}

const getOptions = () => {
    const balances = getTotalBalance("2018-10-01")
    return {
        title: {
          text: 'My chart'
        },
        xAxis: {
            type: 'datetime'
        },
        series: [{
          // data: Object.values(balances),
          data: Object.keys(balances).map(key => [new Date(key), balances[key]])
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
        try {
            return ( 
                <div >
                    <h1> { this.state.title } </h1> 
                    <div>
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={getOptions()}
                        />
                    </div>
                    
                </div>
            );
        } catch (error) {
            console.log(error)
        }
    }
}

HomePage.propTypes = {
    test: PropTypes.string
}

export default HomePage;
