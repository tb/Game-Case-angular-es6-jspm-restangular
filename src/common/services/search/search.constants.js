/**
 * Returns a configuration object that can be set as the constant
 * during a module's declaration
 */


var API_KEY = 'h6c6FKIkYxmshdRrM56IKlzBUBa4p1FscHUjsnxnIMlxI8GFGc';   //TODO: HIDE!
var BASE_URL = 'https://metacritic-2.p.mashape.com/';

var UPCOMING_RELEASES_PS4 = 'game-list/ps4/coming-soon?' +
    'order_by=date&page=1';

var UPCOMING_RELEASES_XBOX_ONE = 'game-list/xboxone/coming-soon?' +
    'order_by=date&page=1';


var SEARCH_BY_TITLE_PS4 = 'search/game?' +
        'platform=ps4' +
        '&title='; // Dynamic value to be inserted at the end


export default {
    API: {
        KEY: API_KEY,
        BASE_URL: BASE_URL,
        RESOURCES: {
            UPCOMING_RELEASES_PS4: UPCOMING_RELEASES_PS4,
            UPCOMING_RELEASES_XBOX_ONE: UPCOMING_RELEASES_XBOX_ONE
        },
        SEARCH: {
            SEARCH_BY_TITLE_PS4: SEARCH_BY_TITLE_PS4
        }
    }
};


