import rmBioMoreInfoOnClick from './rmBioMoreInfoOnClick.js';

const eventRegistry = new Map();

eventRegistry.set(rmBioMoreInfoOnClick.eventKey, rmBioMoreInfoOnClick.handler);

export default eventRegistry;
