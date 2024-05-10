import React, { useState } from "react";
import useSWR from "swr";
import Image from "next/image";

interface SelectImagesProps {
  onSelect: (images: string[]) => void;
}

const SelectImages: React.FC<SelectImagesProps> = ({ onSelect }) => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const fetcher = (url: string) =>
    fetch(url).then((res) => res.json());

  const { data } = useSWR(
    "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?api_key=DEMO_KEY&sol=15",
    fetcher
  );

  const handleImageSelect = (img_src: string) => {
    setSelectedImages((prevImages) => {
      const newImages = [...prevImages, img_src];
      onSelect(newImages);
      return newImages;
    });
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-wrap w-[512px] h-[512px] overflow-auto">
        {data?.photos
          .filter(
            (image: { img_src: string }) =>
              !selectedImages.includes(image.img_src)
          )
          .map(
            (
              image: { img_src: string; id: string },
              index: number
            ) => (
              <Image
                onClick={() => handleImageSelect(image.img_src)}
                key={index}
                src={image.img_src}
                alt={image.id}
                width={20}
                height={20}
                className="w-1/3 p-1"
              />
            )
          )}
      </div>
      <div className="flex items-center justify-center w-1/2 w-[512px] max-h-[512px] flex-wrap overflow-auto">
        {selectedImages.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt={`Selected ${index}`}
            width={100}
            height={100}
            className="w-1/3 p-1"
          />
        ))}
      </div>
    </div>
  );
};

export default SelectImages;
