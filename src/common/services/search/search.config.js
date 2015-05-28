import angular from 'angular';


/*@ngInject*/
function searchConfig (RestangularProvider, searchConstants) {

    RestangularProvider.setBaseUrl(searchConstants.API.BASE_URL);
    RestangularProvider.setDefaultHeaders({ 'X-Mashape-Key': searchConstants.API.KEY });

    // Decorate the response from the Metacritic API to extract the data.results list during a getList() call
    RestangularProvider.addResponseInterceptor(function (data, operation, what, url, response, deferred) {

        var extractedData;

        if (operation === 'getList') {
            extractedData = data.results;
        }
        return extractedData;

    });
}


export default searchConfig;
