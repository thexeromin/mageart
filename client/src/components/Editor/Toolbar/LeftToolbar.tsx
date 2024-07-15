import { Button, Text } from "@chakra-ui/react"
import { useCanvas } from "../../../context"

function LeftToolbar() {
    const { 
        applyGrayscaleFilter,
        revertToOriginal
    } = useCanvas()
    return (
        <>
            <Text>Left Toolbar</Text>

            <Button
                onClick={() => applyGrayscaleFilter()}
            >
                Apply Gray Scale
            </Button>

            <Button
                onClick={() => revertToOriginal()}
            >
                Revert Changes
            </Button>
        </>
    )
}

export default LeftToolbar