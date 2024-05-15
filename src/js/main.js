import { getLocalStorage, loadHeaderFooter, setLocalStorage } from "./utils.mjs";

loadHeaderFooter();

const breadcrumbsPath = getLocalStorage("breadcrumbsPath");
setLocalStorage("breadcrumbsPath", "");