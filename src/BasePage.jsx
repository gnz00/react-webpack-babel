import React from 'react';

export default class BasePage extends React.Component {

	state = {
		filters: {}
	}

	constructor(...args) {
		super(...args);
	}

	handleFilterChange(filter, oldValue, newValue) {
		if (oldValue !== newValue) {
			this.setState(this.updateFilterValue(filter, newValue));
		}
	}

	// Returns curried function for first param in setState
	updateFilterValue(filter, newValue) {
		const {key} = filter;

		return (prevState, currentProps) => ({
			...prevState,
			filters: {
				...prevState.filters,
				[key]: {
					...prevState.filters[key],
					attributes: {
						...prevState.filters[key].attributes,
						value: newValue
					}
				}
			}
		})
	}
}
