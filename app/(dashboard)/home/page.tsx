import Sidebar from '@/components/common/Sidebar';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Post from '@/components/Post';

export default function Home() {
    return (
        <>
            <div className="flex w-full justify-center">
                <Post />
            </div>
        </>
    );
}
