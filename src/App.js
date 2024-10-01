import React, { useState, useEffect } from 'react';
import './App.css';
import { fetchRetrievedUrlItems, fetchEnrichmentData } from './services/fetchData';
import { processRetrievedUrlItems, processEnrichmentData } from './utils/processData';
import { enrichUrlData } from './utils/enrichUrlData';
import CountryGroup from './components/CountryGroup/CountryGroup.js';

function App() {
  const [groupedUrls, setGroupedUrls] = useState({});

  useEffect(() => {
    const getEnrichedUrls = async () => {
      const retrievedUrlItems = await fetchRetrievedUrlItems();
      const enrichmentData = await fetchEnrichmentData();
      const processedRetrievedUrlItems = processRetrievedUrlItems(retrievedUrlItems);
      const processedEnrichmentData = processEnrichmentData(enrichmentData);

      const enrichedUrls = enrichUrlData(processedRetrievedUrlItems, processedEnrichmentData);
      
      const grouped = enrichedUrls.reduce((acc, enrichedUrl) => {
        const country = enrichedUrl.enrichmentData.country || ' ';
        if (!acc[country]) acc[country] = [];
        acc[country].push(enrichedUrl);
        return acc;
      }, {});

      const sortedGrouped = Object.keys(grouped).sort().reduce((acc, country) => {
        acc[country] = grouped[country].sort((a, b) => 
          (b.enrichmentData.est_emp || 0) - (a.enrichmentData.est_emp || 0)
        );
        return acc;
      }, {});

      setGroupedUrls(sortedGrouped);
    }
    getEnrichedUrls();
  }, []);

  return (
    <div className="App">
      {Object.entries(groupedUrls).map(([country, enrichedUrl]) => (
        <CountryGroup key={country} country={country} enrichedUrl={enrichedUrl} />
      ))}
    </div>
  );
}

export default App;
// import React, { useState, useEffect } from 'react';
// import './App.css';
// import { fetchRetrievedUrlItems, fetchEnrichmentData } from './services/fetchData';
// import { processRetrievedUrlItems, processEnrichmentData } from './utils/processData';
// import { enrichUrlData } from './utils/enrichUrlData';
// import UrlItem from './components/UrlItem/UrlItem';

// function App() {
//   const [enrichedUrls, setEnrichedUrls] = useState([]);

//   useEffect(() => {
//     const getEnrichedUrls = async () => {
//       const retrievedUrlItems = await fetchRetrievedUrlItems();
//       const enrichmentData = await fetchEnrichmentData();
//       const processedRetrievedUrlItems = processRetrievedUrlItems(retrievedUrlItems);
//       const processedEnrichmentData = processEnrichmentData(enrichmentData);

//       setEnrichedUrls(enrichUrlData(processedRetrievedUrlItems, processedEnrichmentData));
//     }
//     getEnrichedUrls();
//   });

//   return (
//     <div className="App">
//       {enrichedUrls && enrichedUrls.length > 0 && enrichedUrls.map((enrichedUrl) => <UrlItem enrichedUrl={enrichedUrl} />)} 
//     </div>
//   );
// }

// export default App;