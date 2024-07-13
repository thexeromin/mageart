import { useState, useCallback } from "react"
import {
    Box,
    Text,
    useColorModeValue,
} from "@chakra-ui/react"
import { useDropzone, DropzoneOptions, DropzoneState } from 'react-dropzone'
import { useCanvas } from "../../../context"


function ImageContainer() {
    const [imageSrc, setImageSrc] = useState<string | null>(null)
    const { canvasRef, drawImage } = useCanvas();
    const onDrop = useCallback<NonNullable<DropzoneOptions['onDrop']>>(
        (acceptedFiles: File[]) => {
            // Do something with the files
            console.log(acceptedFiles)

            const reader = new FileReader();

            reader.onloadend = (e) => {
                if (typeof reader.result === 'string' && e.target) {
                    setImageSrc(reader.result);
                    const img = new Image();
                    img.src = e.target.result as string;
                    img.onload = () => {
                        drawImage(img);
                    };
                } else {
                    setImageSrc(null)
                }
            };

            reader.readAsDataURL(acceptedFiles[0]);
        },
        [drawImage],
    )

    // Use useDropzone with the onDrop function
    const { getRootProps, getInputProps, isDragActive }: DropzoneState =
        useDropzone({ onDrop })

    // Define styles using useColorModeValue
    const borderColor = useColorModeValue('gray.300', 'gray.600')
    const activeBorderColor = useColorModeValue('blue.400', 'blue.500')
    const bgColor = useColorModeValue('gray.100', 'gray.700')
    const color = useColorModeValue('gray.600', 'gray.300')

    return (
        <>
            {!imageSrc ? (
                <Box
                    {...getRootProps()}
                    borderWidth="2px"
                    borderRadius="md"
                    borderStyle="dashed"
                    p={5}
                    bg={isDragActive ? 'gray.50' : bgColor}
                    color={color}
                    borderColor={
                        isDragActive
                            ? activeBorderColor
                            : borderColor
                    }
                    _hover={{ borderColor: activeBorderColor }}
                    transition="border 0.24s ease-in-out"
                    textAlign="center"
                    cursor="pointer"
                >
                    <input {...getInputProps()} />
                    <Text fontSize="md" mb={4}>
                        {isDragActive
                            ? 'Drop the files here ...'
                            : "Drag 'n' drop some files here, or click to select files"}
                    </Text>
                </Box>
            ) : (
                <>
                    {/* <img src={imageSrc} alt="Preview" /> */}
                    <canvas ref={canvasRef}></canvas>
                </>
            )}
        </>
    )
}

export default ImageContainer