import React from 'react';

const filterGroupStyle = {
	margin: "10px",
	padding: "10px",
	border: "1px solid #000"
}

const filterWrapperStyle = {
	margin: "10px",
	border: "1px dashed #ccc",
	padding: "10px"
};

export default class FilterGroup extends React.Component {

	handleFilterChange(...args) {
		this.props.handleFilterChange(...args);
	}

	render() {
		return (
			<div style={filterGroupStyle}>
				<h3>Filter Group</h3>

				{
					this.props.filters.map(filter => (
							<div key={filter.key}>
								<label>{filter.title}</label>
								<div style={filterWrapperStyle}>
									<filter.component
										handleChange={(...args) => this.handleFilterChange.call(this, filter, ...args)}
										{...filter.attributes}
										transclude={filter.transclude} />
								</div>
							</div>
					))
				}

			</div>
		)
	}
}
