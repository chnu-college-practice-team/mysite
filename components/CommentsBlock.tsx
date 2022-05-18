import { useState, useEffect } from "react"


export default function CommentsBlock() {
  const [comments, setComments] = useState([])


  useEffect(
    () => {
      const fetchData =async () => {
        const respose = await fetch('http://localhost:3000/api/comment')
        const data = await respose.json();
        console.log(data);  
        setComments(data);
      }
      fetchData();
   },
    []
  )
  comments.map((comment) => console.log("comment ",comment))
  return<>
  <div className="p-3">{
      comments.map((comment,idx) => <Comment idx={idx} createadAt={comment.createadAt} text={comment.text} user={comment.user} />)
  }
    </div>
  </>
}

function Comment({createadAt,text,user,idx}) {
  return (
    <>
      <div
        className="border-1 mx-auto w-1/3 border-white bg-slate-300 shadow-xl"
        key={idx}
      >
        <div className="h-13 flex bg-slate-400 p-2">
          <div className="flex-none">
            <img
              src={user.image}
              alt="profile photo"
              className="rounded-full h-7"
            />
          </div>
          <div className="flex-1 text-center">{user.name}</div>
          <div className="flex-1 text-center text-sm text-slate-600">
            {createadAt}
          </div>
        </div>
        <div className="my-2 p-2">{text}</div>
      </div>
    </>
  )
}
