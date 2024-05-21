import { getLocalStorage, loadHeaderFooter, setLocalStorage } from "./utils.mjs";

loadHeaderFooter();

const breadcrumbsPath = getLocalStorage("breadcrumbsPath");
setLocalStorage("breadcrumbsPath", "");
const backup = getLocalStorage("breadBackup");
setLocalStorage("breadBackup", "");