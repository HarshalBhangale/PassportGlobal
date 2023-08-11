import { useNetwork } from "wagmi";


export function ProcessingMessage({ hash }: { hash?: `0x${string}` }) {
  const { chain } = useNetwork();
  const etherscan = chain?.blockExplorers?.etherscan;
  return (
    <span>
      Processing transaction...
      {etherscan && (
        <a href={`${etherscan.url}/tx/${hash}`} target='_blank' className="link">{etherscan.name}</a>
      )}
    </span>
  );
}