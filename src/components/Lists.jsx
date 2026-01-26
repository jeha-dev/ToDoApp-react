import ListItem from './ListItem'

export default function Lists({todoData, setTodoData}) {

	return <div className='todoData-wrap'>
		{
			todoData.map((data) => (
				<ListItem 
					key={data.id} 
					title={data.title} 
					completed={data.completed} 
					id={data.id}
					todoData={todoData}
					setTodoData={setTodoData} />
			))
		}
	</div>;
}