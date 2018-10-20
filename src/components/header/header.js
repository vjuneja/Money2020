import React from 'react'


const Header = ()=> {
    return <div className="mui-appbar">
        <table width="100%">
            <tr style={{"vertical-align": "middle"}}>
            <td className="mui--appbar-height" style={{"font-size": "18px", "font-weight": "bold"}}>Equalizer</td>
            <td className="mui--appbar-height" align="right"><i className="fas fa-home" style={{"font-size": "32px"}}/></td>
            </tr>
        </table>
    </div>
}

export default Header