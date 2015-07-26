let CurrentUserFactory = function () {

    const user = {};

    let api = {};

    api.getUser = ()=> {
        return user;
    };

    api.isSignedIn = ()=> {
        return user.isSignedIn;
    };

    return api;
};

export default CurrentUserFactory;
