import React from 'react'
import { routeTo } from '../router'
import './header.css'

const Header = ()=> {
    return <div className="mui-appbar header">
        <table width="100%">
            <tbody>
                <tr style={{"verticalAlign": "middle"}}>
                    <td className="mui--appbar-height" style={{"fontSize": "18px", "fontWeight": "bold"}}>Yodviser</td>
                    <td
                        className="mui--appbar-height"
                        align="right"
                        onClick={routeTo('home')}
                    >
                        <i className="fas fa-home" style={{"fontSize": "18px"}}/>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
}

export default Header
