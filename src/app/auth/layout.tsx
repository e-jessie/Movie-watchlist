
export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-screen flex py-20">
            {children}
        </div>
    );
  }
  