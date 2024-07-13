import { createContext, useContext, useRef, ReactNode, RefObject } from 'react';

interface CanvasContextState {
    canvasRef: RefObject<HTMLCanvasElement>;
    drawImage: (image: HTMLImageElement) => void;
    clearCanvas: () => void;
}

const CanvasContext = createContext<CanvasContextState | undefined>(undefined);

const CanvasProvider = ({ children }: { children: ReactNode }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const drawImage = (image: HTMLImageElement) => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas before drawing new image
                canvas.width = image.width;
                canvas.height = image.height;
                // grayscale filter
                ctx.drawImage(image, 0, 0);
                ctx.filter = 'grayscale(1)';
                ctx.drawImage(image, 0, 0);
            }
        }
    };

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
        <CanvasContext.Provider value={{ canvasRef, drawImage, clearCanvas }}>
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
