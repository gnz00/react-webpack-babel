import React from 'react';

const defaultStyle = {
	'display': 'block'
}

export default class TextInput extends React.Component {

	handleChange(event) {
		this.props.handleChange(this.props.value, event.target.value);
	}

	render() {
		let value = this.props.value || this.props.defaultValue || '';
		let style = { ...defaultStyle, ...this.props.style };

		return (
			<div className={this.props.className} style={style}>
				<input
					placeholder={this.props.placeholder}
					type="text"
					onChange={this.handleChange.bind(this)}
					value={value} />

				{
					// Allow transclusion
					typeof this.props.transclude === 'function' && this.props.transclude.call(this)
				}
			</div>
		)
	}
}
