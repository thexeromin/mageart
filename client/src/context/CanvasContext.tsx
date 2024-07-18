import { createContext, useContext, useRef, ReactNode, RefObject, useState } from 'react';

interface CanvasContextState {
    canvasRef: RefObject<HTMLCanvasElement>;
    drawImage: (image: HTMLImageElement) => void;
    clearCanvas: () => void;
    applyGrayscaleFilter: () => void;
    applySepiaFilter: () => void;
    applyInvertFilter: () => void;
    revertToOriginal: () => void;
    downloadImage: () => void;
    resizeImage: (width: number, height: number) => void;
}

const CanvasContext = createContext<CanvasContextState | undefined>(undefined);

const CanvasProvider = ({ children }: { children: ReactNode }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [originalImageData, setOriginalImageData] = useState<ImageData>()

    const drawImage = (image: HTMLImageElement) => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas before drawing new image
                canvas.width = image.width;
                canvas.height = image.height;
                ctx.drawImage(image, 0, 0);
                const imageData = ctx!.getImageData(0, 0, canvas.width, canvas.height)
                setOriginalImageData(imageData)
            }
        }
    };

    const resizeImage = (width: number, height: number) => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                const imageData = ctx!.getImageData(0, 0, canvas.width, canvas.height)
                canvas.width = width;
                canvas.height = height;
                ctx?.putImageData(imageData, 0, 0)
            }
        }
    }

    const revertToOriginal = () => {
        const canvas = canvasRef.current;
        if (canvas && originalImageData) {
            const ctx = canvas.getContext('2d')
            ctx?.putImageData(originalImageData, 0, 0)
        }

    }

    const applyGrayscaleFilter = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d')
            const imageData = ctx!.getImageData(0, 0, canvas.width, canvas.height)
            const data = imageData!.data
            if (!data?.length) return

            // loop through each pixel and apply filter
            for (let i = 0; i < data?.length; i++) {
                const red = data[i];
                const green = data[i + 1]
                const blue = data[i + 2]

                // Calculate the grayscale value
                const grayscale = 0.3 * red + 0.59 * green + 0.11 * blue;

                // Set the pixel values to the grayscale value
                data[i] = data[i + 1] = data[i + 2] = grayscale;
            }

            ctx!.putImageData(imageData, 0, 0)
        }
    }

    const applySepiaFilter = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d')
            const imageData = ctx!.getImageData(0, 0, canvas.width, canvas.height)
            const data = imageData!.data
            if (!data?.length) return

            // loop through each pixel and apply filter
            for (let i = 0; i < data?.length; i += 4) {
                const red = data[i];
                const green = data[i + 1]
                const blue = data[i + 2]

                // output red
                data[i] = Math.min((red * .393) + (green *.769) + (blue * .189), 255.0)
                // output green
                data[i + 1] = Math.min((red * .349) + (green *.686) + (blue * .168), 255.0)
                // output blue
                data[i + 2] = Math.min((red * .272) + (green *.534) + (blue * .131), 255.0)
            }

            ctx!.putImageData(imageData, 0, 0)
        }
    }

    const applyInvertFilter = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d')
            const imageData = ctx!.getImageData(0, 0, canvas.width, canvas.height)
            const data = imageData!.data
            if (!data?.length) return

            // loop through each pixel and apply filter
            for (let i = 0; i < data?.length; i += 4) {
                // output red
                data[i] = 255 - data[i]
                // output green
                data[i + 1] = 255 - data[i + 1]
                // output blue
                data[i + 2] = 255 - data[i + 2]
            }

            ctx!.putImageData(imageData, 0, 0)
        }
    }


    const clearCanvas = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        }
    };

    const downloadImage = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
            window.location.href = image; 
        }
    };

    return (
        <CanvasContext.Provider value={{ 
            canvasRef,
            drawImage,
            clearCanvas,
            applyGrayscaleFilter,
            revertToOriginal,
            applySepiaFilter,
            applyInvertFilter,
            downloadImage,
            resizeImage
        }}>
            {children}
        </CanvasContext.Provider>
    );
};

const useCanvas = () => {
    const context = useContext(CanvasContext);
    if (context === undefined) {
        throw new Error('useCanvas must be used within a CanvasProvider');
    }
    return context;
};

export { CanvasProvider, useCanvas };
