onmessage = (e) => {
  console.log(`Received error event from dotafts-app.`);
  const error = e.data.error;
  const info = e.data.errorInfo;
  /** TODO Emit hydration errors to production metrics endpoint */
  console.error('HydrationError', { error, info });
};
