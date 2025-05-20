import { index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.jsx"),
    route("add", "routes/add.jsx"),
    route("edit/:id", "routes/edit.jsx"),
];
