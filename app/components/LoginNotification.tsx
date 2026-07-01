import { useSearchParams } from "next/navigation";


export default function LoginNotification() {
    const searchParams = useSearchParams();
    return (
        <div>
            {
                searchParams.get('login') === 'success' && <div data-testid="notification" className="border-b-emerald-800 border-solid bg-emerald-400 font-black p-2">Login successful</div>
            }
        </div>
    );
}
