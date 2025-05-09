import {React,useState,useEffect} from 'react'
import {Link,useLocation} from 'react-router-dom';
import axios from 'axios';

//  const posts = [
//     {
//       id: 1,
//       title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
//       desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
//       img: "https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//     },
//     {
//       id: 2,
//       title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
//       desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
//       img: "https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//     },
//     {
//       id: 3,
//       title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
//       desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
//       img: "https://images.pexels.com/photos/4230630/pexels-photo-4230630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//     },
//     {
//       id: 4,
//       title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
//       desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
//       img: "https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//     },
//   ];

const Home = () => {
  const [posts,setPosts] = useState([]);
  const cat = useLocation().search;

  useEffect(() => {
    const fetchData = async () =>{
      try{
        const res = await axios.get(`http://localhost:3000/api/post/${cat}`);
        console.log(res.data.message);
         setPosts(res.data.message);
      }
      catch(err){
        console.log(err);
      }
    } 
    fetchData(); 
  },[cat]);  // useEffect will fire it self (function from line 39 to 49) whenever cat variable is changed;


  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

  

  return (
    <div className="home">
      <div className="posts">
        {posts.map((post) => (
          <div className="post" key={post.post_id}>
            <div className="img">
                <img src={`/uploads/${post.image}`} alt="" />  { /* need to change here Nishant */}
            </div>
            <div className="content">
              <Link className="link" to={`/post/${post.post_id}`}>
                <h1>{post.title}</h1>
              </Link>
              {/* <p>{getText(post.desc)}</p> */}
              <p>{getText(post.description)}</p>
              <button>Read More</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
