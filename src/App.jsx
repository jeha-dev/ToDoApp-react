import { useState } from 'react';
import './App.css'
import Lists from './components/Lists'

export default function App() {
  const [todoData, setTodoData] = useState([
      {
        id: '1',
        title: '공부하기',
        completed: true,
      },
      {
        id: '2',
        title: '아기 신발 한 켤레 완성하기',
        completed: false,
      }
  ])
  const [value, setValue] = useState('');


  const handleClick = (id) => {
    let newTodoData = todoData.filter( (data) => data.id !== id );
    setTodoData(newTodoData);
  }

  const handleChange = (e) => {
    setValue(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let newTodo = {
      id: Date.now(),
      title: value,
      completed: false,
    }

    setTodoData([...todoData, newTodo]);
    setValue('');
  }

  return (
    <div className='container'>
      <div className='todoBlock'>
        <div className='title'>
          <h1>ToDoList</h1>
        </div>

        <Lists todoData={todoData} setTodoData={setTodoData}
        />

        <form action="" onSubmit={handleSubmit}>
          <div className='input-container'>
            <label className='input-box'>
              <input name='value' type='text' value={value} onChange={handleChange} placeholder="검색어를 입력해 주세요" />
              <button type='button' className='btn-close' onClick={()=>handleClick(data.value)}>
                <span>X</span>
              </button>
            </label>
            <input type='submit' value='입력' className='btn-input' />
          </div>
        </form>
      </div>
    </div>
  )
}