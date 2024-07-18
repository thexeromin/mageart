import { useState } from "react"
import { Button, HStack, Input } from "@chakra-ui/react"
import { useCanvas } from "../../../context"

interface Props {
    width: number
    height: number
}

function ResizeForm(props: Props) {
    const [width, setWidth] = useState(props.width)
    const [height, setHeight] = useState(props.height)

    const { resizeImage } = useCanvas()

    return (
        <HStack>
            <Input
                type="number"
                value={width}
                onChange={(e) => setWidth(parseInt(e.target.value))}
            />
            <Input
                type="number"
                value={height}
                onChange={(e) => setHeight(parseInt(e.target.value))}
            />
            <Button 
                minWidth={'100px'}
                onClick={() => resizeImage(width, height)}
            >
                Resize
            </Button>
        </HStack>
    )
}

export default ResizeForm