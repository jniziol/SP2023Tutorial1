export default function ErrorAlert({ messages }) {
  return (
    <div className="bg-error text-error-content rounded-md text-xs p-3 grid grid-cols-12 gap-y-1">
      {messages.map((message) => (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-4 w-4 col-span-1"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="col-span-11">{message}</span>
        </>
      ))}
    </div>
  );
}
