import emptyMessageImage from '../../assets/images/empty-list.png';

const EmptyMessage = ({ message }) => {
  return (
    <div className="text-center mt-5">
      <img className="d-block img-fluid mx-auto" width="400" src={emptyMessageImage} alt={message}/>
      <h3 className="fs-5 mt-4 text-muted ">{message}</h3>
    </div>
  );
};

export default EmptyMessage;
