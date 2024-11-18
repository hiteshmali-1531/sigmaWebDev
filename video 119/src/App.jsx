import { useForm } from "react-hook-form"
import './App.css'

function App() {

  const {
    
    register,
    setError,
    handleSubmit,
    formState: { errors,isSubmitting },
  } = useForm();

  const delay = (d) =>{
    return new Promise((resolve, reject) =>{
      setTimeout(() => {
        resolve("yes");
      }, d*1000);
    })
  }

  const onSubmit = async(data) => {
    let response = await fetch('http://localhost:3000',{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'

      },
      body: JSON.stringify(data)
    })
    response = await response.json();
    console.log(response);

    // await delay(1);
    if(data.name == "hitesh"){
      setError('myForm' ,{message:"Your form is not valid"})
    }
    console.log(data);
  }
 
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
      {isSubmitting && <div> loadding ....</div>}
        <div className="form-control">

          <label htmlFor="name">name</label>
          <input {...register("name",{required:{value: true, message:"fill this field"},minLength:{value:3, message:"required minimum 3 latter"}})} type="text" />
          <p style={{color:'red',height:'1rem'}}>{errors.name&& errors.name.message}</p>
        </div>
        <div className="form-control">

          <label htmlFor="name">lastName</label>
          <input {...register("lastname",{required:{value:true, message:"lastname is required"}})} type="text" />
          <p style={{fontSize:"small", color:'red', height:'2rem'}}> {errors.lastname && errors.lastname.message}</p>
        </div>
        <div className="form-control">
        <select {...register("gender",{required:true})}>
        <option value="female">female</option>
        <option value="male">male</option>
        <option value="other">other</option>
      </select>
        </div>
      {errors.myForm && <div>{errors.myForm.message}</div>}
        {/* <input type="text" /> */}
        <input disabled={isSubmitting} type="submit" value="Submit" />
      </form>
    </>
  )
}

export default App
