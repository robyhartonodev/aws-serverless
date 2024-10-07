import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { FC, useEffect } from "react";
import useAuthStore from "@/store/auth";

interface UserImage {
    id: string;
    userId: string;
    title: string;
    imageUrl: string;
}

function MyGalery() {
    const navigate = useNavigate();

    const handleHomeButton = () => {
        navigate('/');
    };

    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    const testItems = [
        {
            id: "1",
            userId: "rhrt04",
            title: "test",
            imageUrl: "https://images.unsplash.com/photo-1624555130581-1d9cca783bc0?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            id: "1",
            userId: "rhrt04",
            title: "test",
            imageUrl: "https://images.unsplash.com/photo-1624555130581-1d9cca783bc0?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            id: "1",
            userId: "rhrt04",
            title: "test",
            imageUrl: "https://images.unsplash.com/photo-1624555130581-1d9cca783bc0?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            id: "1",
            userId: "rhrt04",
            title: "test",
            imageUrl: "https://images.unsplash.com/photo-1624555130581-1d9cca783bc0?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
    ];

    const UserItem: FC<UserImage> = ({ id, userId, title, imageUrl }) => {
        return (
            <div className="border border-gray-300 flex justify-between items-center h-96 rounded-md shadow-lg">
                <div className="flex flex-col space-y-4 p-4 w-full">
                    <div>ID: {id}</div>
                    <div>User ID: {userId}</div>
                    <div>Title: {title}</div>
                </div>
                <div className="h-full">
                    <img className="object-cover w-96 h-full rounded-r-md" src={imageUrl} alt="xdd" />
                </div>
            </div>
        );
    };

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

            <div className="flex space-x-2 p-4">
                <Button className="bg-green-500">Create</Button>
                <Button className="bg-blue-500">Edit</Button>
                <Button className="bg-red-500">Delete</Button>
            </div>

            <div className="p-4 w-screen h-full space-y-4">
                {
                    testItems.map((item) => <UserItem id={item.id} userId={item.userId} title={item.title} imageUrl={item.imageUrl}></UserItem>)
                }
            </div>
        </div>
    );
}

export default MyGalery;