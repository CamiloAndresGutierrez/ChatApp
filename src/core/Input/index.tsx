interface InputProps {
  placeholder: string;
}

const Input = (
  props: InputProps & React.InputHTMLAttributes<HTMLInputElement>
) => {
  const { placeholder, className, ...restProps } = props;
  return (
    <input
      className={`
        block 
        w-full 
        rounded-md 
        border-0 
        py-1.5 pl-2 pr-2 
        text-gray-900 
        ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 
        placeholder:text-gray-400
        my-4
        ${className}
    `}
      placeholder={placeholder}
      {...restProps}
    />
  );
};

export default Input;
