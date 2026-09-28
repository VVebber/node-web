import {
  type RouteConfig,
  route,
  index,
} from "@react-router/dev/routes";

export default [
    index('../pages/home.tsx'),

    route('notesPage', './pages/NotesPage.tsx')
//   route("some/path", "./some/file.tsx"),
  // pattern ^           ^ module file
] satisfies RouteConfig;
