import {useSelector} from "react-redux";
import {allUsers} from "@/redux/features/Users/usersSlice";


export default function PostAuthor({userId}) {
  const user = useSelector(allUsers)
  const author = user.find(x => x.id === userId)

    return(
       <>
       <span> by {author ? author.name : "unknown author"}</span>
       </>
    )
}



















