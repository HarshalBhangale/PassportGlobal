export function Stamp({ uid }) {
  const country = '???'; //TODO: Fetch a real stamp data via EAS API (EAS SDK or wagmi generated API)
  return (
    <div className="m-10">
      <img src="//via.placeholder.com/200x100" alt={`Stamp for ${country}`} className="inline-block" />
      <div className="text-center">{country}</div>
    </div>
  );
}