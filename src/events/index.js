import rmBioMoreInfoOnClick from "./rmBioMoreInfoOnClick";

const eventRegistry = new Map();

eventRegistry.set(rmBioMoreInfoOnClick.eventKey, rmBioMoreInfoOnClick.handler);

export default eventRegistry;