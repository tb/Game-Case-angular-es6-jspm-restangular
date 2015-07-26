import angular from 'angular';

class SearchSvc {

    /*@ngInject*/
    constructor(Restangular, searchConstants) {

        this.Restangular = Restangular;
        this.searchConstants = searchConstants;

        this.recentSearches = {};  // TODO: track search stats here?
    }

    findByTitle (title) {

    }

    getByTitle (title) {

    }

    getUpcomingReleasesByPlatform (platform) {

        var resources = this.searchConstants.API.RESOURCES,
            resource;

        if (platform === 'ps4') {
            resource = resources.UPCOMING_RELEASES_PS4
        } else if (platform === 'xboxone') {
            resource = resources.UPCOMING_RELEASES_XBOX_ONE;
        }

        return this.Restangular.all(resource).getList().then(function (games) {
            return games;
        }, function (err) {
            return err;
        });
    }

    // TODO: Implement correctly
    //getCurrentMonthReleases () {
    //    return this.Restangular.all(this.searchConstants.API.RESOURCES.CURRENT_MONTH_RELEASES).getList().then(function (games) {
    //       return  games;
    //    }, function (err) {
    //        return err;
    //    });
    //}
}

export default SearchSvc;
