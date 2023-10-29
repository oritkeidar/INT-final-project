"use strict";
exports.__esModule = true;
var react_1 = require("react");
var fitness_png_1 = require("../images/fitness.png");
require("./Home.css");
function Home() {
    return (react_1["default"].createElement("div", { className: "home-container" },
        react_1["default"].createElement("header", { className: "App-Header" },
            react_1["default"].createElement("img", { className: "App-logo", src: fitness_png_1["default"], alt: "" }),
            react_1["default"].createElement("p", { className: "App-data" }, "Wealth health world ! ! !")),
        react_1["default"].createElement("p", { className: "final" }, "Our company has a cross-continental reputation. We have branches throughout Europe and Asia and will soon launch the first branch in California, USA. Join us today to achieve your goal !"),
        react_1["default"].createElement("img", { className: "background-image", src: "https://pilates.kassai.co.il/app/uploads/2023/05/PILATIS-283-scaled.jpg", alt: "" }),
        react_1["default"].createElement("div", { className: "element" },
            react_1["default"].createElement("div", { className: "left-container" },
                react_1["default"].createElement("p", { className: "start" }, "It's time you start take a good care of yourself"),
                react_1["default"].createElement("h2", null, "You are not turning any younger!! "),
                react_1["default"].createElement("h4", { style: { color: "red" } },
                    "Join us now to a world full of ",
                    react_1["default"].createElement("b", null, "Fun! Fit! Energy!")),
                react_1["default"].createElement("p", null, "You can work out individual or with groups"),
                react_1["default"].createElement("p", null, "You can customize the workout to your level and set workout plan where you can rise your level via progress"))),
        react_1["default"].createElement("div", { className: "element" },
            react_1["default"].createElement("div", { className: "right-container" },
                react_1["default"].createElement("img", { style: { height: "400px", width: "600px", alignItems: "left" }, src: "https://www.acubody.net/wp-content/uploads/2021/09/Fitness-Day.jpg", alt: "" }),
                react_1["default"].createElement("p", null, "Just choose the right excercise for you. It's simple as that. In one place you get all the exercise types."),
                react_1["default"].createElement("img", { style: { height: "485px", width: "600px" }, src: "https://media.istockphoto.com/id/827891858/photo/hip-hop-dancers-having-training.jpg?s=612x612&w=0&k=20&c=tfUs1-mhSJruyIqsiAzQdrGlRejw6yj4VkQVfWVGZEU=", alt: "s" }),
                react_1["default"].createElement("p", null, "No matter what is the reason you want to exercise, whether to lose weight, for health or just for fun, you've come to the right place"),
                react_1["default"].createElement("img", { style: { height: "500px", width: "600px" }, src: "https://dta0yqvfnusiq.cloudfront.net/burns43043213/2019/10/Kickboxing-is-the-Perfect-Full-Body-Workout-5db98bcbde358.jpg", alt: "" }),
                react_1["default"].createElement("p", null, "you are not yet part of our team of champions??? it's time to recalculate your path!"),
                react_1["default"].createElement("img", { style: { height: "450px", width: "600px" }, src: "https://commondatastorage.googleapis.com/offeringtree.com/production/uploads/graphic/graphic/ae779ecf-f2af-407c-b443-ecf8f296b132/half_size_1686733234970_offering_image.jpg?1686733248", alt: "" })))));
}
exports["default"] = Home;
