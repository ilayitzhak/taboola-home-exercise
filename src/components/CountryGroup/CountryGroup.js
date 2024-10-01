import React from 'react';
import UrlItem from '../UrlItem/UrlItem';
import './CountryGroup.css';
const CountryGroup = ({ country, enrichedUrl }) => {
  return (
    <div className="country-group">
      <h2 className="country-title">{country}:</h2>
      {enrichedUrl.map((enrichedUrl, index) => (
        <UrlItem key={index} enrichedUrl={enrichedUrl} />
      ))}
    </div>
  );
};

export default CountryGroup;

