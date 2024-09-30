import React from 'react';

const UrlItem = ({ enrichedUrl }) => {
    const { retrievedUrl, enrichmentData } = enrichedUrl;

    return (
        <div key={retrievedUrl.href}>
            <h2>{retrievedUrl.href}</h2>
            <p>ID: {enrichmentData._id}</p>
            <p>URL: {enrichmentData.url}</p>
            <p>Name: {enrichmentData.name}</p>
            <p>Estimated Employees: {enrichmentData.est_emp}</p>
            <p>Industry: {enrichmentData.industry}</p>
            <p>Annual Revenue: {enrichmentData.annual_rev}</p>
            <p>Country: {enrichmentData.country}</p>
        </div>
    );
};

export default UrlItem;