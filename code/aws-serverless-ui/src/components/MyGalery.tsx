import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useEffect } from "react";
import useAuthStore from "@/store/auth";

function MyGalery() {
    const navigate = useNavigate();

    const handleHomeButton = () => {
        navigate('/');
    };

    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/');
        }
    });

    return (
        <div>
            <div className="flex w-screen justify-between p-4 bg-blue-500">
                <div className="text-white text-2xl">My Galery</div>
                <Button className="min-w-[16px] bg-orange-500 text-white hover:bg-white hover:text-black" onClick={handleHomeButton}>Home</Button>
            </div>
        </div>
    );
}
    
export default MyGalery;