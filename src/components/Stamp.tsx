export function Stamp({ country }) {
  return (
    <div className="m-10">
      <img src="//via.placeholder.com/200x100" alt={`Stamp for ${country}`} class="inline-block" />
      <div className="text-center">{country}</div>
    </div>
  );
}