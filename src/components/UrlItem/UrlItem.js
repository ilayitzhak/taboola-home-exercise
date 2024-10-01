import React from 'react';
import './UrlItem.css'; // Importing the CSS file for custom styling

const UrlItem = ({ enrichedUrl }) => {
    const { retrievedUrl, enrichmentData } = enrichedUrl;

    return (
        <div className="card">
            <div className="card-content">
                <h1>{enrichmentData.name}</h1>
                
                <p><strong>ID:</strong> {enrichmentData._id}</p>
                <p><strong>URL: </strong> 
                    <a href={enrichmentData.url} target="_blank" rel="noopener noreferrer">
                        {enrichmentData.url}
                    </a>
                </p>

                <p><strong>Name:</strong> {enrichmentData.name}</p>
                <p><strong>Estimated Employees:</strong> {enrichmentData.est_emp}</p>
                <p><strong>Industry:</strong> {enrichmentData.industry}</p>
                <p><strong>Annual Revenue:</strong> {enrichmentData.annual_rev}</p>
                <p><strong>Country:</strong> {enrichmentData.country}</p>
                <h2 className="url-title small-text"><strong><u>Retrieve URL:</u></strong> {retrievedUrl.href}</h2>
            </div>
        </div>
    );
};

export default UrlItem;
