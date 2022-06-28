import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import API_ENDPOINT from '../../globals/apiEndpoint';
import { TermCard, SearchBar, Loading, EmptyMessage } from '../../components';
import './DefinitionDetail.scss';

const DefinitionDetail = () => {
  const { idDefinition } = useParams();
  const [data, setData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setErrorMessage(null);
      setData(null);
      
      try {
        const response = await axios.get(API_ENDPOINT.GET_DEFINITION_BY_ID(idDefinition));
        
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        const statusErrorMesssage = error.response.status;
        
        if (statusErrorMesssage === 500) {
          setIsLoading(false);
          return setErrorMessage('Terjadi kesalahan pada server, mohon coba lagi!');
        }
        
        setIsLoading(false);
        setErrorMessage('Data definisi tidak ditemukan, mohon lakukan pencarian!');
      }
    };
    
    fetchData();
  }, []);
  
  return (
    <section className="detail__definition">
      <SearchBar />
      <div className="detail__definition__content">
        <h3> Detail Definisi dari "{data && <span>{data.data.term}</span>}" </h3>
        {isLoading && <Loading />}
        {errorMessage && <EmptyMessage message={errorMessage} />}
        {data && <TermCard dataDefinition={data.data} />}
      </div>
    </section>
  );
};

export default DefinitionDetail;
