import { Button, Box, VStack } from "@chakra-ui/react"
import { useCanvas } from "../../../context"

function LeftToolbar() {
    const { 
        applyGrayscaleFilter,
        applySepiaFilter,
        applyInvertFilter,
        revertToOriginal,
    } = useCanvas()
    return (
        <Box>
            <VStack
                spacing={2}
                align='stretch'
            >
                <Button
                    onClick={() => applyGrayscaleFilter()}
                >
                    Apply gray scale
                </Button>

                <Button
                    onClick={() => applySepiaFilter()}
                >
                    Apply sepia tone
                </Button>

                <Button
                    onClick={() => applyInvertFilter()}
                >
                    Apply invert filter
                </Button>

                <Button
                    onClick={() => revertToOriginal()}
                >
                    Revert changes
                </Button>
            </VStack>
        </Box>
    )
}

export default LeftToolbar