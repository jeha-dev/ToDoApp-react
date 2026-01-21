import { Component } from 'react';
import './App.css'

export default class App extends Component {
  // todoData라는 이름을 가지는 state를 생성한 것 : state는 불변성을 가져야함
  // setState() 는 업데이트를 해줄 때 사용
  state = {
    todoData: [
      {
        id: '1',
        title: '공부하기',
        completed: true,
      },
      {
        id: '2',
        title: '아기 신발 한 켤레 완성하기',
        completed: false,
      },
    ],
    value: '',
  }

  getStyle = (completed) => {
    return {
      color: completed ? '#e6e6e6' : 'currentColor',
      textDecoration: completed ? 'line-through' : 'none',
    }
  }

  handleCheckboxChange = (id) => {
    // newTodoData라는 변경점 만들고 아래에 setState로 todoData를 업데이트
    let newTodoData = this.state.todoData.map( (data) => {
      if(data.id === id) {
        data.completed = !data.completed;
      }
      return data;
    })

    this.setState( {todoData: newTodoData} );

  }

  handleClick = (id) => {
    // state를 아래와 같이 사용
    let newTodoData = this.state.todoData.filter( (data) => data.id !== id );
    console.log(newTodoData);
    this.setState( {todoData: newTodoData} );
  }

  handleChange = (e) => {
    console.log(e.target.value);
    this.setState( { value: e.target.value } );
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // 내가 입력한 뒤 입력 버튼 클릭 시 해당 데이터를 받아서 목록(checkbox)에 추가 해줘야함 : 객체로 추가해주기
    // id를 Date.now()로 설정 할 경우 유니크한 ID를 가질 수 있다고 함
    let newTodo = {
      id: Date.now(),
      title: this.state.value,
      completed: false,
    }

    this.setState({
      // ... 전개연산자 이용 하여 얕은 복사로 나열한 뒤, 새로운데이터 생성하라고 써야함 >> 복사 후 새로운데이터 넣어주는 이유 : state에 기본설정된 값은 불변성을 유지해야함
      todoData: [ ...this.state.todoData, newTodo ],
      value: '',
    })
  }

  render(){
    return (
      // JSX 이용
      <div className='container'>
        <div className='todoBlock'>
          <div className='title'>
            <h1>ToDoList</h1>
          </div>
          {/* handleSubmit추가 > input[typ="submit"]이기 때문에 단순하게 form 태그에 onSubmit 추가 시 브라우저 refresh 됨 */}
          <form action="" onSubmit={this.handleSubmit}>
            <div className='input-container'>
              <label className='input-box'>
                {/* html아니고 jsx 환경 이기 때문 : input 처음 생성 시 입력해도 입력값 안 들어감 > state에 value로 추가 + onChange함수 추가해야함.. */}
                <input name='value' type='text' value={this.state.value} onChange={this.handleChange} placeholder="검색어를 입력해 주세요" />
                <button type='button' className='btn-close'>
                  <span>X</span>
                </button>
              </label>
              <input type='submit' value='입력' className='btn-input' />
            </div>
          </form>
          <div className='todoData-wrap'>
            {
              this.state.todoData.map((data) => 
                <div key={data.id} className='input-checkbox'>
                    <label>
                        <input type="checkbox" name={data.title} checked={data.completed} onChange={() => this.handleCheckboxChange(data.id)} />
                        <span className="label-txt" style={this.getStyle(data.completed)}>{data.title}</span>
                    </label>
                    <button type='button' className='btn-close' onClick={()=>this.handleClick(data.id)}>
                      <span>X</span>
                    </button>
                </div>
              )
            }
          </div>
        </div>
      </div>
    )
  }
}