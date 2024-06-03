/**
 * @xng
 *
 * Scripting Entrypoint for Splash ("/") Page Route
 */

/**
 * Put all client side JS that needs to run on the Splash Page here
 */
import { Log } from 'sleepydogs';
import runSplashAnimation from '../../ui/LottieSplashAnimation.js';
import setupActions from './actions.js';

Log.factory({ level: 'info', service: 'x-dotafts-splash-ui', version: '1.0' }).info('App Started.');
runSplashAnimation();
setupActions();
