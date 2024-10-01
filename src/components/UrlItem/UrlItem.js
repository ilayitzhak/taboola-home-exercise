import React from 'react';
import styles from './UrlItem.module.css';

const UrlItem = ({ enrichedUrl }) => {
    const { retrievedUrl, enrichmentData } = enrichedUrl;

    return (
        <div className={styles.card}>
            <div className={styles.cardContent}>
                <h1 className={styles.cardTitle}>{enrichmentData.name}</h1>
                <p><strong>ID:</strong> {enrichmentData._id}</p>
                <p><strong>Domain URL: </strong> 
                    <a href={enrichmentData.url} target="_blank" rel="noopener noreferrer">
                        {enrichmentData.url}
                    </a>
                </p>
                {enrichmentData.name && <p><strong>Name:</strong> {enrichmentData.name}</p>}
                {enrichmentData.est_emp && <p><strong>Estimated Employees:</strong> {enrichmentData.est_emp}</p>}
                {enrichmentData.industry && <p><strong>Industry:</strong> {enrichmentData.industry}</p>}
                {enrichmentData.annual_rev  && <p><strong>Annual Revenue:</strong> {enrichmentData.annual_rev}</p>}
                {enrichmentData.country && <p><strong>Country of Origin:</strong> {enrichmentData.country}</p>}
                {retrievedUrl.href && (
                    <h2 className={styles.urlTitle}>
                        <strong><u>Retrieved URL:</u></strong> {retrievedUrl.href}
                    </h2>
                )}
            </div>
        </div>
    );
};

export default UrlItem;
