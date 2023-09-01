import {userStore} from "../models/user-store.js";

export const accountsController = {
    index(request, response) {
        const viewData = {
            title: "Login or Signup",
        };
        response.render("index", viewData);
    },

    login(request, response) {
        const viewData = {
            title: "Login to the Service",
        };
        response.render("login-view", viewData);
    },

    logout(request, response) {
        response.cookie("playlist", "");
        response.redirect("/");
    },

    signup(request, response) {
        const viewData = {
            title: "Login to the Service",
        };
        response.render("signup-view", viewData);
    },

    async register(request, response) {
        const user = request.body;
        await userStore.addUser(user);
        console.log(`registering ${user.email}`);
        response.redirect("/");
    },

    async authenticate(request, response) {
        const user = await userStore.getUserByEmail(request.body.email);
        if (user) {
            response.cookie("station", user.email);
            console.log(`logging in ${user.email}`);
            response.redirect("/dashboard");
        } else {
            response.redirect("/login");
        }
    },

    async getLoggedInUser(request) {
        const userEmail = request.cookies.station;
        return await userStore.getUserByEmail(userEmail);
    },


    settings(request, response){
        const loggedInUser = accountsController.getLoggedInUser(request);
        if (loggedInUser) {
            const viewData = {
                title: 'User Settings',
                firstName: request.body.firstName,
                lastName: request.body.lastName,
                email: request.body.email,
                password: request.body.password,
            };
            console.log(loggedInUser);
            response.render('usersettings', viewData);
        }
    },

    update(request, response) {
        const user = accountsController.getLoggedInUser(request);
        const updatedUser = {
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            email: request.body.email,
            password: request.body.password,
        };
        console.log("updated: ", updatedUser);
        userStore.updateUser(user, updatedUser);
        response.redirect("/dashboard");
    },
};