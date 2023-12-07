export const OpenMenuBtn = ({ props }: { props?: any }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <line x1="2" y1="6" x2="22" y2="6" />
    <line x1="2" y1="12" x2="10" y2="12" />
    <line x1="2" y1="18" x2="14" y2="18" />
  </svg>
);
