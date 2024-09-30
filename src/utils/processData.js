export const processRetrievedUrlItems = (rawUrlItems) => {
    const urlItems = rawUrlItems.map(urlItem => {
        const redirectUrl = urlItem.redirectUrl;
        const protocol = redirectUrl.protocol;
        var domain = getDomain(redirectUrl);

        return {
            protocol: protocol,
            domain: domain,
            retrievedUrl: urlItem.retrievedUrl,
            redirectUrl: redirectUrl
        }
    })
    .filter(urlItem => isDomainValid(urlItem.domain));

    return urlItems;
}

const getDomain = (url) => {
    var domain;

    if (url.hostname.includes('.')) {
        const domainSplit = url.hostname.split('.');

        domain = domainSplit[domainSplit.length-2]+'.'+domainSplit[domainSplit.length-1];
    } else {
        domain = url.hostname;
    }

    return domain;
}

const isDomainValid = (domain) => {
    return domain !== '' && domain !== null && domain !== undefined;
}

export const processEnrichmentData = (rawEnrichmentData) => {
    const enchrimentDataMap = new Map();

    rawEnrichmentData.forEach(dataItem => {
        const url = new URL(dataItem.url);
        const protocol = url.protocol;
        var domain = getDomain(url);

        enchrimentDataMap.set(domain, { 
            protocol: protocol, 
            enrichmentData: dataItem 
        });
    });

    return enchrimentDataMap;
}