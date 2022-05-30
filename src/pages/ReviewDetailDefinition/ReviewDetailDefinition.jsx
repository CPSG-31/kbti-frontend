import { useParams } from 'react-router-dom';

const ReviewDetailDefinition = () => {
  const { idDefinition } = useParams();

  return (
    <div>
      This is Review Detail Definition page with idDefinition : 
{' '}
{idDefinition}
    </div>
  );
};

export default ReviewDetailDefinition;