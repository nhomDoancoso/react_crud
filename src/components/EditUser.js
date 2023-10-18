import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams} from "react-router-dom";

export default function ListUser() {

  const navigate = useNavigate();

  const [inputs, setInputs] = useState([])
  const {id} = useParams();
  useEffect(() => {
    getUsers();
  }, []);

  function getUsers() {
      axios.get(`http://localhost:80/api/user/${id}`)
          .then(function (response) {
              console.log(response.data);
              setInputs(response.data);
      });
}

  const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}));
  };

  const handleSubmit = (event) => {
      event.preventDefault();

      axios.put(`http://localhost:80/api/user/${id}/edit`, inputs)
          .then(function (response) {
            console.log(response.data);
            navigate('/');
      });
      console.log(inputs);
  };

  return (
      <div>
          <h1>Edit User</h1>
          <form onSubmit={handleSubmit}>
              <table cellSpacing="10">
                  <tbody >
                      <tr>
                          <th>
                              <label>Name: </label>
                          </th>
                          <td>    
                              <input value={inputs.name} type="text" name ="name" onChange={handleChange }/>
                          </td>
                      </tr>
                      <tr>
                          <th>
                              <label>Email: </label>
                          </th>
                          <td>
                              <input value={inputs.email} type="text" name ="email" onChange={handleChange }/>
                          </td>
                      </tr>
                      <tr>
                          <th>
                              <label>Mobile: </label>
                          </th>
                          <td>
                              <input value={inputs.mobile} type="text" name ="mobile" onChange={handleChange }/>
                          </td>
                      </tr>
                      
                      <tr>
                          <td align="right" colSpan="2">
                              <button>Save</button>
                          </td>
                      </tr>
                  </tbody>
              </table>
              
          </form>
      </div>
  )
}
