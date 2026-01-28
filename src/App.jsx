import { useState } from 'react';
import './App.css'
import Lists from './components/Lists'
import Form from './components/Form'

export default function App() {

  const initTodoData = localStorage.getItem('todoData') ? JSON.parse(localStorage.getItem('todoData')) : [];
  const [todoData, setTodoData] = useState(initTodoData);
  // const [todoData, setTodoData] = useState([
  //     {
  //       id: '1',
  //       title: '공부하기',
  //       completed: true,
  //     },
  //     {
  //       id: '2',
  //       title: '아기 신발 한 켤레 완성하기',
  //       completed: false,
  //     }
  // ])
  const [value, setValue] = useState('');


  const handleClick = (id) => {
    let newTodoData = todoData.filter( (data) => data.id !== id );
    setTodoData(newTodoData);
  }

  // const handleChange = (e) => {
  //   setValue(e.target.value);
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    let newTodo = {
      id: Date.now(),
      title: value,
      completed: false,
    }

    if(value.length == 0) {
      alert('리스트를 작성해주세요')
    }else {
      setTodoData([...todoData, newTodo]);
      localStorage.setItem('todoData', JSON.stringify([...todoData, newTodo]));
      setValue('');
    }
    setValue('');
  }

  return (
    <div className='container'>
      <div className='todoBlock'>
        <div className='title'>
          <h1>Daily ToDo List</h1>
        </div>

        <Lists todoData={todoData} setTodoData={setTodoData}
        />
        <Form handleSubmit={handleSubmit} value={value} setValue={setValue} todoData={todoData} setTodoData={setTodoData}
        />

      </div>
    </div>
  )
}