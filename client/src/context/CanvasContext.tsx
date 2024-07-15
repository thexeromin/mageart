import { createContext, useContext, useRef, ReactNode, RefObject, useState } from 'react';

interface CanvasContextState {
    canvasRef: RefObject<HTMLCanvasElement>;
    drawImage: (image: HTMLImageElement) => void;
    clearCanvas: () => void;
    applyGrayscaleFilter: () => void;
    revertToOriginal: () => void;
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

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        }
    };

    return (
        <CanvasContext.Provider value={{ canvasRef, drawImage, clearCanvas, applyGrayscaleFilter, revertToOriginal }}>
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
