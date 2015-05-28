class HomeController {

    /*@ngInject*/
    constructor($scope, searchSvc) {


        this.searchSvc = searchSvc;
        this.upcomingReleases = {};

        this.mostRecentlyViewed = [
                {
                    title: 'Uncharted 4'
                },
                {
                    title: 'Star Wars: Battlefront'
                }
        ];

        this.activate();
    }

    activate () {

        var self = this;

        self.searchSvc.getUpcomingReleasesByPlatform('ps4').then(function (games) {
            self.upcomingReleases.ps4 = games;
            return games;
        });

        self.searchSvc.getUpcomingReleasesByPlatform('xboxone').then(function (games) {
            self.upcomingReleases.xboxOne = games;
            return games;
        });

        // TODO: Implement correctly
        //this.searchSvc.getCurrentMonthReleases().then(function (games) {
        //    this.currentMonthReleases = games;
        //    return games;
        //});
    }
}

export default HomeController;
