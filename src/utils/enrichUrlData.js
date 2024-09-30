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


    
    // const enrichmentMap = new Map(enrichmentData.Map(item => [item.url, item]));
    // const enrichmentMap = new Map();
    // enrichmentData.forEach(item => {
    //     enrichmentMap.set(item.url, item);
    // });
 

    // return urls.map(urlItem => {
    //     const protocol = urlItem.protocol;
    //     const domainSplit = urlItem.hostname.split('.');
    //     const hostname = domainSplit[domainSplit.length-2]+'.'+domainSplit[domainSplit.length-1];
    //     const enrichedData = enrichmentMap.get(urlItem.url) || {};
    //     return{
    //         url: urlItem.url,
    //         id: enrichedData._id ,
    //         name: enrichedData.name ,
    //         est_emp: enrichedData.est_emp || 0,
    //         industry: enrichedData.industry,
    //         annual_rev: enrichedData.annual_rev || -1,
    //         country: enrichedData.country
    //     };
    // });
};