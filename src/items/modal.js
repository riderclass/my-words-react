import React from 'react'
import './modal.css'

export default class Modal extends React.Component {

	render() {
		return (
			<React.Fragment>
				<div className="modal">
					<div className="modal-body">
							{/* <h3>Меню</h3> */}
                            <h5 className="choose-title">выберите тему</h5>
<button className="sub-btn-choose" onClick={this.props.myTheme1}>Вещи</button><br></br>
<button className="sub-btn-choose" onClick={this.props.myTheme2}>Животные</button>
					</div>
					</div>
			</React.Fragment>	
			)
	}
}