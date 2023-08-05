const BackButton = ({ color }: { color: string }) => {
  return (
    <svg
      className='w-full'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 -960 960 960'
      fill={color}
    >
      <path d='m274-450 248 248-42 42-320-320 320-320 42 42-248 248h526v60H274Z' />
    </svg>
  );
};

export default BackButton;
