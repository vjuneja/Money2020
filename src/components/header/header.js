import React from 'react'


const Header = ()=> {
    return <div className="mui-appbar">
        <table width="100%">
            <tbody>
                <tr style={{"verticalAlign": "middle"}}>
                <td className="mui--appbar-height" style={{"fontSize": "18px", "fontWeight": "bold"}}>Equalizer</td>
                <td className="mui--appbar-height" align="right"><i className="fas fa-home" style={{"fontSize": "32px"}}/></td>
                </tr>
            </tbody>
        </table>
    </div>
}

export default Header
