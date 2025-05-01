import {React,useState,useContext,useEffect} from "react";
import hulk from "../images/hulk.jpeg";
import editSign from "../images/edit.png";
import deleteSign from "../images/delete.png";
import { Link , useLocation , useNavigate} from "react-router-dom";
import {AuthContext}  from '../context/context';
import Menu from "../components/Menu";
import moment from 'moment'
import axios from 'axios';

const Single = () => {
  const [post,setPost] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

    const { currentUser } = useContext(AuthContext);

  const post_id = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchData = async () =>{
      try{
        const res = await axios.get(`http://localhost:3000/api/post/${post_id}`);
        console.log(res.data.message);
         setPost(res.data.message);
      }
      catch(err){
        console.log(err);
      }
    } 
    fetchData(); 
  },[post_id]);  // useEffect will fire it self (function from line 39 to 49) whenever cat variable is changed;

  const handleDelete = async  () =>{
    try{
      const res = await axios.delete(`http://localhost:3000/api/post/${post_id}`,{ withCredentials: true});
      console.log(res.data.message);
      navigate("/");
    }
    catch(err){
      console.log(err);
    }
  }

  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

  return (
    <div className="single">
      <div className="content">
        <img src={`/uploads/${post?.image}`} />

        <div className="user">
          <img src={post?.userimage}></img>
          <div className="info">
            <span>{post?.username}</span>
            <p>{moment(post.date).fromNow()}</p>
          </div>
        {
        currentUser.message.username === post?.username &&
        <div className="edit">
          <Link to={`/write?edit=2`} state={post}>
            <img src={editSign}></img>
          </Link>

          <Link to={`/write?delete=2`}>
            <img onClick = {handleDelete} src={deleteSign}></img>
          </Link>
        </div>
       }
        </div>
        <h1>{post.title}</h1>
         <p>{getText(post.description)}</p>
      </div>
      <Menu cat={post.category}/>
    </div>
  );
};

export default Single;
