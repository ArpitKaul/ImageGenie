import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import PhotoSearch from "../Components/Search/PhotoSearch";
import { AppContext } from "../context/AppContext";
import Card1 from "../Components/threeD/Card1";
import Card2 from "../Components/ThreeD/Card2";

const Result = () => {
    const [image, setImage] = useState(assets.sample_img_1);
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState("");

    const { generateImage } = useContext(AppContext);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (input) {
            const image = await generateImage(input);
            if (image) {
                setIsImageLoaded(true);
                setImage(image);
            }
        }
        setLoading(false);
    };

    return (
        <div className="flex flex-col ">
            <div className="flex justify-center items-start gap-32 mt-16">
                <div className="w-64">
                    <Card1 />
                </div>

                <div className="relative mt-16">
                    <img src={image} alt="" className="max-w-sm rounded" />
                    <span
                        className={`absolute bottom-0 left-0 h-1 bg-blue-500 ${
                            loading ? "w-full transition-all duration-[10s]" : "w-0"
                        }`}
                    />
                </div>

                <div className="w-56">
                    <Card2 />
                </div>
            </div>

            <form onSubmit={onSubmitHandler} className="flex flex-col items-center mt-10">
                {!isImageLoaded && (
                    <div className="flex w-full max-w-xl bg-neutral-500 text-white text-sm p-0.5 rounded-full cursor-pointer">
                        <input
                            onChange={(e) => setInput(e.target.value)}
                            value={input}
                            className="flex-1 bg-transparent outline-none ml-8 max-sm:w-20 placeholder-color"
                            type="text"
                            placeholder="Describe what you want to generate"
                        />
                        <button className="bg-purple-600 sm:px-16 py-3 rounded-full" type="submit">
                            Generate
                        </button>
                    </div>
                )}

                {loading && <p className="text-white mt-4">Loading......</p>}

                {isImageLoaded && (
                    <div className="flex gap-4 flex-wrap justify-center text-white text-sm mt-8">
                        <p
                            onClick={() => setIsImageLoaded(false)}
                            className="bg-transparent border border-zinc-100 text-white px-8 py-3 rounded-full cursor-pointer"
                        >
                            Generate Another
                        </p>
                        <a
                            href={image}
                            download
                            className="bg-zinc-100 text-black px-10 py-3 rounded-full cursor-pointer"
                        >
                            Download
                        </a>
                    </div>
                )}
            </form>

            <div className="mt-32">
                <PhotoSearch />
            </div>
        </div>
    );
};

export default Result;
