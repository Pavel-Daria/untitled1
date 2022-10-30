import logo from './logo.svg';
import './App.css';
import {useState} from "react";
import spinner from "./spinn.gif";


const URL = "https://jsonplaceholder.typicode.com/posts";

function delay(s){
    return new Promise((res, rej) => {
        setTimeout(res, s * 1000);
    });
}
function App() {
    const [id, setId] = useState("");
    const  [post, setPost] = useState("");
    const [error, setError] = useState("");
    const  [isLoading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        // setPost(undefined);
        setLoading(true);
        try{
            await  delay(2);
            const response = await fetch(`${URL}/${id}`);
            const data = await response.json();
            setPost(data);
            setLoading(false);
        } catch (e)
        {
            setError("Что-то пошло не так, брат");
        } finally {
            setLoading(false);
        }
    }

  return (
    <div className="App">
      <div>
          <form onSubmit={handleSubmit}>
              <input value={id} onChange={e => setId(e.target.value) }/>
              <button disabled={isLoading}>Получить данные</button>
          </form>
      </div>
        {isLoading && <div><img src={spinner} alt={"spinner"}/> </div>}
        {error && <div>{error}</div>}
        <div>
            <b>{post.title}</b><br/>
            {post.body}
        </div>
        

    </div>
  );
}

export default App;
