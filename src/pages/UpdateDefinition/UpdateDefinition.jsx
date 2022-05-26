import { useParams } from "react-router-dom";

const UpdateDefinition = () => {
  const { idDefinition } = useParams()

  return (
    <div>
      This is Update Definition page with idDefinition : {idDefinition}
    </div>
  )
};

export default UpdateDefinition;