import { useParams } from "react-router-dom";

const UpdateRole = () => {
  const { idUser } = useParams();

  return (
    <div>
      This is Update Detail page with idUser : {idUser}
    </div>
  )
};

export default UpdateRole;