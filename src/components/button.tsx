import Link from 'next/link';

interface ButtonProps {
  href: string;
  text: string;
  className?: string;
}

const Button = ({ href, text, className = "" }: ButtonProps) => {
  return (
    <Link 
        href={href} 
        className={`px-6 py-3 w-[200px] mx-auto bg-gray-50 hover:text-white rounded-xl hover:bg-gray-900 ${className}`}
    >
        {text}
    </Link>
  );
};

export default Button;
