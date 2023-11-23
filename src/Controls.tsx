import { allAxes, allFilters } from './util';

function Controls({ setFilters, setXFunc, setYFunc, setCFunc }) {
	function handleChange(ev) {
		const formData = new FormData(ev.currentTarget);
		const formJson = Object.fromEntries(formData);

		const filters = Object.keys(allFilters).filter(name => formJson[name]);
		setFilters(filters);

		const xFuncName = formJson['x-axis'];
		if (xFuncName) {
			const xFunc = allAxes[xFuncName].key;
			setXFunc(() => xFunc);
		}
		const yFuncName = formJson['y-axis'];
		if (yFuncName) {
			const yFunc = allAxes[yFuncName].key;
			setYFunc(() => yFunc);
		}

		const cFuncName = formJson['color-axis'];
		if (cFuncName) {
			const cFunc = allAxes[cFuncName].key;
			setCFunc(() => cFunc);
		}
	}

	return <form onChange={handleChange}>
			<fieldset>
				<legend>Show</legend>
				<ul>
					{
						Object.entries(allFilters).map(([id, filter]) => (
						<li key={id}>
							<input type="checkbox" name={id} id={id} defaultChecked />
							<label htmlFor={id}>{filter.name}</label>
						</li>
						))
					}
				</ul>
			</fieldset>
			<fieldset>
				<legend>X-axis</legend>
				<ul>
					{
						Object.entries(allAxes).map(([id, axis]) => (
							<li key={`x-${id}`}>
								<input type="radio" name="x-axis" id={`x-${id}`} value={id} />
								<label htmlFor={`x-${id}`}>{axis.name}</label>
							</li>
						))
					}
				</ul>
			</fieldset>
			<fieldset>
				<legend>Y-axis</legend>
				<ul>
					{
						Object.entries(allAxes).map(([id, axis]) => (
							<li key={`y-${id}`}>
								<input type="radio" name="y-axis" id={`y-${id}`} value={id} />
								<label htmlFor={`y-${id}`}>{axis.name}</label>
							</li>
						))
					}
				</ul>
			</fieldset>
			<fieldset>
				<legend>Color</legend>
				<ul>
					{
						Object.entries(allAxes).map(([id, axis]) => (
							<li key={`y-${id}`}>
								<input type="radio" name="color-axis" id={`color-${id}`} value={id} />
								<label htmlFor={`color-${id}`}>{axis.name}</label>
							</li>
						))
					}
				</ul>
			</fieldset>
		</form>
}

export default Controls
