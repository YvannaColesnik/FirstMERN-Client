import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [friends, setFriends] = useState([]);

  const addFriend = () => {
    axios.post('http://localhost:3000/addFriend',
      {
        name: name, age: age
      })
      .then(() => {
        setFriends([...friends, {name: name, age: age}]);
      }).catch(() => {
        // alert('oh no');
      });
  };

  useEffect(() => {
    axios.get('http://localhost:3000/read')
      .then((response) => {
        setFriends(response.data)
      }).catch(() => {
        alert('oh no');
      });
  }, []);

  return (
    <div className="App">
      <div className="inputs">
        <input type="text" placeholder='Friend name' onChange={(event) => {
          setName(event.target.value);
        }}
        />
        <input type="number" placeholder='Friend age' onChange={(event) => {
          setAge(event.target.value);
        }}
        />

        <button onClick={addFriend}> Add friend</button>
      </div>

      <div className='lisfOfFriends'>
        {friends.map((val) => {
          return (
            <div className='friend'>
              <h3>NAME: {val.name}</h3> 
              <h3>AGE: {val.age}</h3> 
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
