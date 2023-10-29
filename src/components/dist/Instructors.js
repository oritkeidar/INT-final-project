"use strict";
exports.__esModule = true;
var react_1 = require("react");
var InstructorsList_1 = require("../context/InstructorsList");
var reactstrap_1 = require("reactstrap");
var uuid_1 = require("uuid");
require("./Instructors.css");
function Instructors() {
    return (react_1["default"].createElement("div", { className: 'row' },
        react_1["default"].createElement(reactstrap_1.CardGroup, null,
            react_1["default"].createElement(reactstrap_1.Row, null, InstructorsList_1["default"].map(function (instructor) {
                return react_1["default"].createElement("div", { key: uuid_1.v4() },
                    react_1["default"].createElement("img", { style: { height: '300px', width: '300px' }, src: instructor.image, alt: '' }),
                    react_1["default"].createElement("h4", null, instructor.instructorName),
                    react_1["default"].createElement("p", null, instructor.phone),
                    react_1["default"].createElement("p", null, instructor.activities.join(", ")));
            })))));
}
exports["default"] = Instructors;
