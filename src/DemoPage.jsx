import React from 'react';
import FilterGroup from './FilterGroup';
import SelectInput from './SelectInput';
import TextInput from './TextInput';
import BasePage from './BasePage';
import { convertMapToArray } from "./utils"

// Creating a map to enforce:
//		1. Unique Keys
//		2. Constant time lookups
// This can also be moved inside the component if it needs to reference a context property, i.e. this.props.store
// Or moved out to a config file to extend or subclass
// These are contrived examples that are just attempting to showcase the flexibility and simplicity of this approach
// You can extend or customize your own input components to support any kind of behavior
// Or create higher order components with these options baked in (i.e.: Sipfeed Filter Group in TDM currently)
const DemoPageFilters = {
	'one': {
		title: 'Filter One',
		component: SelectInput,
		attributes: {
			options: ['-', 'Option A', 'Option B', 'Option C']
		},
		transclude: function() {
			return (<div>Selected: {this.props.value}</div>)
		}
	},
	'two': {
		title: 'Filter Two',
		component: SelectInput,
		attributes: {
			options: [{
				value: "test1",
				body: "Test 1"
			},
			{
				value: "test2",
				body: "Test 2"
			}],
			style: {
				"backgroundColor": "red"
			}
		},
		transclude: function() {
			const handleChange = (oldValue, newValue) => {
				// Only allow updates if the user starts typing an valid value
				if (this.props.options.some(o => o.value.indexOf(newValue) === 0)) {
					this.props.handleChange(this.props.value, newValue);
				}
			}

			return (<TextInput value={this.props.value} handleChange={handleChange}/>)
		}
	},
	'three': {
		title: 'Filter Three',
		component: TextInput,
		attributes: {
			placeholder: 'A Placeholder'
		},
		transclude: function() {
			const reset = (event) => {
				this.props.handleChange(this.props.value, '');
			};

			return (<button type="reset" onClick={reset}>Reset</button>);
		}
	}
};

export default class DemoPage extends BasePage {

	constructor(...args) {
		super(...args);

		this.state = {
			filters: { ...DemoPageFilters }
		}
	}

	render() {
		const filters = convertMapToArray(this.state.filters);
		const callback = this.handleFilterChange.bind(this);

		return (
			<div>
				<h3>Demo Page</h3>
				<FilterGroup filters={filters} handleFilterChange={callback}/>
			</div>
		)
	}
}
