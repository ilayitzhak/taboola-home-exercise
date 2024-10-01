import React, { useState, useEffect } from 'react';
// import './App.css';
import { fetchRetrievedUrlItems, fetchEnrichmentData } from './services/fetchData';
import { processRetrievedUrlItems, processEnrichmentData } from './utils/processData';
import { enrichUrlData } from './utils/enrichUrlData';
import CountryGroup from './components/CountryGroup/CountryGroup.js';
import styles from './styles/App.module.css';

function App() {
  const [groupedUrls, setGroupedUrls] = useState({});
  const [selectedCountry, setSelectedCountry] = useState('All Countries');

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

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const countries = ['All Countries', ...Object.keys(groupedUrls)].sort();

  return (
    <div className={styles.App}>
      <h1 className={styles.instruction}>Hello! To See the Data Enrichment URLs for Each Country, Select the Desired Country</h1>
      <nav>
        <ul>
            <select value={selectedCountry} onChange={handleCountryChange}>
              {countries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
        </ul>
      </nav>
      {Object.entries(groupedUrls)
        .filter(([country]) => selectedCountry === 'All Countries' || country === selectedCountry)
        .map(([country, enrichedUrl]) => (
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