export default function Lists({todoData, setTodoData}) {

	const getStyle = (completed) => {
		return {
			color: completed ? '#e6e6e6' : 'currentColor',
			textDecoration: completed ? 'line-through' : 'none',
		}
	}
	const handleCheckboxChange = (id) => {
		let newTodoData = todoData.map( (data) => {
			if(data.id === id) {
			data.completed = !data.completed;
			}
			return data;
		})

		setTodoData(newTodoData);
	}
	const handleClick = (id) => {
		let newTodoData = todoData.filter( (data) => data.id !== id );
		setTodoData(newTodoData);
	}

	return <div className='todoData-wrap'>
		{
			todoData.map((data) => 
				<div key={data.id} className='input-checkbox'>
					<label>
						<input type="checkbox" name={data.title} checked={data.completed} onChange={() => handleCheckboxChange(data.id)} />
						<span className="label-txt" style={getStyle(data.completed)}>{data.title}</span>
					</label>
					<button type='button' className='btn-close' onClick={()=>handleClick(data.id)}>
					<span>X</span>
					</button>
				</div>
			)
		}
	</div>
}