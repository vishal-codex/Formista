import './App.css'
import { useFormista } from './Formista/Formista'

function App() {
  const initialValue = {
    username: '',
    email: 'abc@gmail.com',
    password: '',
    age: ''
  };

  function validationSchema(values) {
    const errors = {};

    if (!values.username) {
      errors.username = ["Username is required."];
    }

    if (!values.email) {
      errors.email = ["Email is required."];
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = ["Email address is invalid."];
    }

    if (!values.password) {
      errors.password = ["Password is required."];
    }

    if (!values.age) {
      errors.age = ["Age is required."];
    } else if (values.age < 18) {
      errors.age = ["You must be at least 18 years old."];
    }

    return errors;
  }

  async function formHandler(values) {
    console.log('Form submitted with values:', values);
  }

  const { errors, handleChange, handleSubmit, touched, values } = useFormista({
    initialValue,
    onSubmit: formHandler,
    validationSchema,
  });

  console.log(touched, 'touched');


  return (
    <form onSubmit={handleSubmit}>
      <div className='input-field'>
        <input
          type='text'
          name='username'
          placeholder='Username'
          onChange={handleChange}
          value={values.username}
        />
        {errors.username && errors.username.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </div>
      <div className='input-field'>
        <input
          type='text'
          name='email'
          placeholder='Email'
          onChange={handleChange}
          value={values.email}
        />
        {errors.email && errors.email.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </div>
      <div className='input-field'>
        <input
          type='text'
          name='password'
          placeholder='Password'
          onChange={handleChange}
          value={values.password}
        />
        {errors.password && errors.password.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </div>
      <div className='input-field'>
        <input
          type='number'
          name='age'
          placeholder='Age'
          onChange={handleChange}
          value={values.age}
        />
        {errors.age && errors.age.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </div>
      <div className="form-btn">
        <button type='submit'>Submit</button>
      </div>
    </form>
  );
}

export default App;
