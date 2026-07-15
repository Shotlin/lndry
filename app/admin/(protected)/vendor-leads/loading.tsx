export default function VendorLeadsLoading() {
  return (
    <div className="grid gap-7" aria-busy="true" aria-label="Loading vendor leads">
      <div className="grid gap-3">
        <div className="h-4 w-36 animate-pulse rounded-sm bg-hairline" />
        <div className="h-10 w-56 animate-pulse rounded-sm bg-hairline" />
        <div className="h-4 w-full max-w-xl animate-pulse rounded-sm bg-hairline" />
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        {Array.from({ length: 6 }).map((_, index) => <div key={index} className="h-35 animate-pulse rounded-md bg-white" />)}
      </div>
      <div className="h-80 animate-pulse rounded-md bg-white" />
    </div>
  );
}
