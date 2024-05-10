import React, { useEffect, useState } from "react";
import useSWR from "swr";
import Image from "next/image";
import { CircularProgress } from "@mui/material";
import clsx from "clsx";

interface SelectImagesProps {
  onSelect: (images: string[]) => void;
  initialImages?: string[];
  isCompleted?: boolean;
}

const SelectImages: React.FC<SelectImagesProps> = ({
  onSelect,
  initialImages,
  isCompleted,
}) => {
  const [selectedImages, setSelectedImages] = useState<string[]>(
    initialImages || []
  );
  const fetcher = async (url: string) => {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error("An error occurred while fetching the data.");
    }
    return res.json();
  };

  const { data } = useSWR(
    "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?api_key=hiugB55DCY4hyPr5NXsSVDzgewfgVL5obgziY8gK&sol=15",
    fetcher
  );

  const selectionMessage = isCompleted
    ? "The previous step has been completed. Press on Edit step to make changes."
    : selectedImages.length < 7
    ? "Please select at least one photo. You can choose up to seven."
    : "You've reached the limit. To add a new picture, click on an existing one to remove it.";

  const handleImageSelect = (img_src: string) => {
    setSelectedImages((prevImages) => {
      const newImages = [...prevImages, img_src];
      onSelect(newImages);
      return newImages;
    });
  };
  const handleImageRemove = (img_src: string) => {
    setSelectedImages((prevImages) => {
      const newImages = prevImages.filter(
        (image) => image !== img_src
      );
      onSelect(newImages);
      return newImages;
    });
  };
  useEffect(() => {
    setSelectedImages(initialImages || []);
  }, [initialImages]);

  return (
    <div className="flex flex-col justify-center w-full">
      <div className="m-auto my-6">{selectionMessage}</div>
      <div className="flex justify-center w-full gap-4">
        <div
          className={clsx(
            "flex flex-wrap flex-grow w-[324px] h-[512px] overflow-auto justify-center items-center border-gray-400 border-2 shadow-sm",
            {
              "opacity-50 pointer-events-none":
                selectedImages.length >= 7 || isCompleted,
            }
          )}
        >
          {data?.photos ? (
            data?.photos
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
                    width={100}
                    height={100}
                    className="h-1/3 hover:p-1 w-1/3 p-3 transition-all duration-200 ease-in-out cursor-pointer"
                  />
                )
              )
          ) : (
            <CircularProgress />
          )}
        </div>
        <div
          className={clsx(
            "flex flex-wrap flex-grow w-[324px] h-[512px] overflow-auto justify-center items-center border-gray-400 border-2 shadow-sm",
            {
              "opacity-50 pointer-events-none": isCompleted,
            }
          )}
        >
          {selectedImages.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt={`Selected ${index}`}
              width={100}
              height={100}
              onClick={() => handleImageRemove(image)}
              className="h-1/3 hover:p-1 w-1/3 p-3 transition-all duration-200 ease-in-out cursor-pointer"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectImages;
