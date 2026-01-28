import { useState } from "react";

export default function Lists({title, completed, id, todoData, setTodoData}) {

	const [isEditing, setIsEditing] = useState(false);
	// isEditing 역할 : 현재 edit 하는 상태인지 아닌지 > T/F로 기억 > return 영역 수정하여 사용

	const [editedTitle, setEditiedTitle] = useState(title);
	// 작성되는 타이틀도 컴포넌트 안에서 기억되어야 하니까 생성함 > title을 사용
	
	const getStyle = (completed) => {
		return {
			color: completed ? '#e6e6e6' : 'currentColor',
			textDecoration: completed ? 'line-through' : 'none',
		}
	}
	const handleCheckboxChange = (id) => {
		const newTodoData = todoData.map( (data) => {
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

		//mdn localStorage 사용법 참고
		// newTodoData는 현재 배열 > 로컬스토리지에 값으로 넣어줄 때는 text로 변환해야함(배열로는 저장 안됨)
		// refresh 시에 로컬스토리지에 새로 저장된 데이터를 초기화 해줘야 함
		localStorage.setItem('todoData', JSON.stringify(newTodoData));
	}

	const handleEditChange = (e) => {
		setEditiedTitle(e.target.value)
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		// 전체 데이터를 가지고 있는 위치 : tododata(!editTitle)
		// map으로 하나씩 순환하면서 data.id 관련 선언 해줘야함
		const newTodoData = todoData.map( (data) => {
			if(data.id === id) {
				data.title = editedTitle;
			}

			// 조건에 걸리지 않으면 객체data 수정 필요 없기 때문에 그냥 return(불변성 지키기)
			return data;
		})
		setTodoData(newTodoData);
		setIsEditing(false);

	}

	if(isEditing) {
		return (
			<div>
				<form onSubmit={handleSubmit}>
					<input value={editedTitle} onChange={handleEditChange} type="text" autoFocus />
				</form>
				<div>
					<button type='button' className='btn-close' onClick={() => setIsEditing(false)}>X</button>
					<button type='submit' className='btn-close' onClick={handleSubmit}>save</button>
				</div>
			</div>
		)

	}else {
		return (
			<div className='input-checkbox'>
				<label>
					<input type="checkbox" name={title} checked={completed} onChange={() => handleCheckboxChange(id)} />
					<span className="label-txt" style={getStyle(completed)}>{title}</span>
				</label>
				<div>
					<button type='button' className='btn-close' onClick={()=>handleClick(id)}>X</button>
					<button type='button' className='btn-close' onClick={()=>setIsEditing(true)}>edit</button>
				</div>
			</div>
		)
	}
	
	
}