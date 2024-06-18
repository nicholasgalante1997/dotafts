export default function getClientSideProps<P = {}>(): P {
  const propsScript = document.getElementById('@dotafts-dyn-props');
  if (propsScript == null) return {} as P;
  const data = JSON.parse(propsScript.textContent ?? '{}');
  return data as P;
}
