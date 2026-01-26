export default function Form({handleSubmit, value, setValue}) {

	const handleChange = (e) => {
		setValue(e.target.value);
	}

	return <div>
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
	</div>;
}