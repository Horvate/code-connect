import { registerUploadEvents } from "../modules/imageUpload.js";
import { registerTagEvents } from "../modules/tags.js";
import { registerFormActions } from "../controllers/formController.js";

export function registerEvents() {
    registerUploadEvents();
    registerTagEvents();
    registerFormActions();
}