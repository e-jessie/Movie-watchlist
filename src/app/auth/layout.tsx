
export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-screen bg-black flex py-20">
            {children}
        </div>
    );
  }
  