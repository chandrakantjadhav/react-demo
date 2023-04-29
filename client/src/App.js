import { useEffect, useState } from "react"


function App() {

  const [txnForm , settxnForm] = useState({
    amount : 0,
    txnDetails : "",
    txnDate : "" 
  });
  async function submitHandler(e){
    e.preventDefault();
    // console.log("working");console.log(txnForm);

    const resp = await fetch("http://localhost:4000/transaction" , {
      method : "POST",
      body : JSON.stringify(txnForm),
      headers : {
        'content-type' : "application/json"
      }
    });
    
    // reload with fresh entry
     if(resp.ok)
      fetchTrascation();
  }

  //get data from server on load
  useEffect(() =>{
    fetchTrascation()
  } , [] );


  const [transaction , setTransaction] = useState([]);


  async function fetchTrascation(){
    const rawData = await fetch("http://localhost:4000/transaction"); // default to GET
    const txnData =  await rawData.json();
    // console.log(txnData.data);
    setTransaction(txnData.data);
  }

  function handleChange(e){
    console.log(e.target.value);
    settxnForm({...txnForm, [e.target.name] : e.target.value})

  }

  return (
    <><div>

      <form onSubmit={submitHandler}>
        <input
          type="number"
          onChange={handleChange}
          value={txnForm.amount}
          name="amount"
          placeholder='Enter Transctional amount' />

        <input type="text"
          onChange={handleChange}
          value={txnForm.txnDetails}
          name="txnDetails"
          placeholder='Enter Transctional Details' />

        <input type="date"
          onChange={handleChange}
          value={txnForm.txnDate}
          name="txnDate"
          placeholder='Enter Transctional Date' />

        <button type='submit'>Submit</button>

      </form>
    </div>
    <br></br>
    <section>
        <table>
          <thead>
            <th>Amount</th>
            <th>Description</th>
            <th>Transcation Date</th>
          </thead>
          <tbody>
          {transaction.map( (trx) => (
            <tr key={trx._id}>
              <td>{trx.amount}</td>
              <td>{trx.txn_details}</td>
              <td>{trx.txn_date}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </section></>
  );
}

export default App;
