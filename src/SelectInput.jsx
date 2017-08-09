import React from 'react';

const defaultStyle = {
	'display': 'block'
}

export default class SelectInput extends React.Component {

	componentDidMount() {
		let defaultValue = this.props.value || this.props.defaultValue || this.props.options[0];

		if (typeof defaultValue === 'object') {
			defaultValue = defaultValue.value;
		}

		if (this.props.value !== defaultValue) {
			this.props.handleChange(this.props.value, defaultValue);
		}
	}

	handleChange(event) {
		this.props.handleChange(this.props.value, event.target.value);
	}

	render() {
		let options = this.props.options || [];
		let style = { ...defaultStyle, ...this.props.style };

		// Support simple arrays, arrays of objects, or mixed
		options = options.map(o => typeof o === 'string'
			? { body: o, value: o }
			: o
		);

		return (
			<div className={this.props.className} style={style}>
				<select
					onChange={(event) => this.handleChange.call(this, event)}
					value={this.props.value}
				>

					{
						options.map(o =>
							<option
								key={"select-option-" + o.body}
								value={o.value}>
									{o.body}
							</option>
						)
					}

				</select>

				{
					// Allow transclusion, additionally, each input can handle how it deals with children
					this.props.transclude && this.props.transclude.call(this)
				}

			</div>
		)
	}
}
