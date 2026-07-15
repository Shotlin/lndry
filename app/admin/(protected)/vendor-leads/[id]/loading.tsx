export default function VendorLeadDetailLoading() {
  return (
    <div className="grid gap-6" aria-busy="true" aria-label="Loading vendor lead">
      <div className="h-5 w-40 animate-pulse rounded-sm bg-hairline" />
      <div className="h-44 animate-pulse rounded-md bg-ink" />
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_25rem]">
        <div className="h-[48rem] animate-pulse rounded-md bg-white" />
        <div className="h-96 animate-pulse rounded-md bg-white" />
      </div>
    </div>
  );
}
