import { useParams } from 'react-router-dom';

const PublicListDefinition = () => {
  const { term } = useParams();

  return (
    <div>
      This is Public List Definition page with term : 
{' '}
{term}
    </div>
  );
};

export default PublicListDefinition;