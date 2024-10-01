import React from 'react';
import UrlItem from '../UrlItem/UrlItem.js';
import styles from './CountryGroup.module.css';

const CountryGroup = ({ country, enrichedUrl }) => {
  return (
    <div className={styles.countryGroup}>
      <h2 className={styles.countryTitle}>{country}:</h2>
      {enrichedUrl.map((enrichedUrl, index) => (
        <UrlItem key={index} enrichedUrl={enrichedUrl} />
      ))}
    </div>
  );
};

export default CountryGroup;
