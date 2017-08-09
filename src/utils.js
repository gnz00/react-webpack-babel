export function convertMapToArray(map) {
	return Object.keys(map)
		.map(key => [{
			key,
			...map[key]
		}])
		.reduce((prev, next) => prev.concat(next), []);
}
