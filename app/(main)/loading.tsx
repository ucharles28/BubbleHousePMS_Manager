import { BounceLoader } from 'react-spinners';

export default function Loading() {
    return (
        <div className="w-full h-screen">
            <div className="flex flex-col items-center justify-center">
                <div className="lg:w-2/5 md:w-1/2 pt-10 pl-4 pr-4 justify-center lg:my-16 sm:my-5">
                    <div className="m-12 pt-14 flex flex-col items-center justify-center">
                        <BounceLoader
                            size={180}
                            color="#FFCC00"
                            aria-label="loading-indicator"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}