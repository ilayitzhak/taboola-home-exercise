export const fetchRetrievedUrlItems = async () => {
    try {
        const response = await fetch('https://cdn.taboola.com/mobile-config/home-assignment/messages.json');
        const data = await response.json();

        return data.filter(item => {
            const retrievedUrl = retrieveUrl(item);

            return isUrlValid(retrievedUrl) && isUrlValid(getRedirectUrl(retrievedUrl));
        })
        .map(item => {
            const retrievedUrl = retrieveUrl(item);
            const redirectUrl = getRedirectUrl(retrievedUrl);

            return {
                'retrievedUrl': new URL(retrievedUrl),
                'redirectUrl': new URL(redirectUrl)
            }
        });
    } catch (error) {
        console.error('Error fetching URLs:', error);
        return [];
    }
};

const retrieveUrl = (item) => {
    return item._source.message[0].link.url;
}

const isUrlValid = (url) => {
    return url && url !== "";
}

const getRedirectUrl = (retrievedUrl) => {
    const urlParams = new URLSearchParams(new URL(retrievedUrl).search);

    return urlParams.get('redirect');
}

export const fetchEnrichmentData = async () => {
    try {
        const response = await fetch('https://cdn.taboola.com/mobile-config/home-assignment/data.json');
        return await response.json();
    } catch (error){
        console.error('Error fetching enrichment data:', error);
        return [];
    }
}

