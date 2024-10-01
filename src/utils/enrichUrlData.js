export const enrichUrlData = (urlItems, enchrimentDataMap) => {
    const enrichedUrlItems = [];

    urlItems.forEach(urlItem => {
        const domainData = enchrimentDataMap.get(urlItem.domain);

        if (urlItem && domainData &&urlItem.protocol && domainData.protocol && urlItem.protocol === domainData.protocol) {
            enrichedUrlItems.push({
                retrievedUrl: urlItem.retrievedUrl,
                enrichmentData: domainData.enrichmentData
            });
        }
    });

    return enrichedUrlItems;

};