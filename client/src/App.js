import { useState } from "react"


function App() {

  const [form , setForm] = useState({
    amount : 0,
    txnDetails : "",
    txnDate : "" 
  });
  function submitHandler(e){
    e.preventDefault();
    console.log("working");
    console.log(form);

    fetch("http://localhost:4000/transction" , {
      method : "POST",
      body : form
    });

  }

  function handleChange(e){
    console.log(e.target.value);
    setForm({...form, [e.target.name] : e.target.value})

  }

  return (
    <div>
      
      <form onSubmit={submitHandler}>
        <input 
          type="number" 
          onChange = {handleChange} 
          value ={form.amount}
          name = "amount"
          placeholder = 'Enter Transctional amount'/>

        <input type="text" 
            onChange = {handleChange} 
            value ={form.txnDetails}
            name = "txnDetails"
            placeholder = 'Enter Transctional Details'/>

        <input type="date" 
            onChange = {handleChange} 
            value ={form.txnDate}
            name = "txnDate"
            placeholder = 'Enter Transctional Date'/>

        <button type='submit'>Submit </button>

      </form>
    </div>
  );
}

export default App;
