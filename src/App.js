import React, { useState, useEffect } from 'react';
import './App.css';
import { fetchRetrievedUrlItems, fetchEnrichmentData } from './services/fetchData';
import { processRetrievedUrlItems, processEnrichmentData } from './utils/processData';
import { enrichUrlData } from './utils/enrichUrlData';
import UrlItem from './components/UrlItem/UrlItem';

function App() {
  const [enrichedUrls, setEnrichedUrls] = useState([]);

  useEffect(() => {
    const getEnrichedUrls = async () => {
      const retrievedUrlItems = await fetchRetrievedUrlItems();
      const enrichmentData = await fetchEnrichmentData();
      const processedRetrievedUrlItems = processRetrievedUrlItems(retrievedUrlItems);
      const processedEnrichmentData = processEnrichmentData(enrichmentData);

      setEnrichedUrls(enrichUrlData(processedRetrievedUrlItems, processedEnrichmentData));
    }
    getEnrichedUrls();
  });

  return (
    <div className="App">
      {enrichedUrls && enrichedUrls.length > 0 && enrichedUrls.map((enrichedUrl) => <UrlItem enrichedUrl={enrichedUrl} />)} 
    </div>
  );
}

export default App;