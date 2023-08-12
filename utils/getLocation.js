const locations = {
    ["LR-1"]: "Living Room :: Closet :: Box 1",
    ["LR-2"]: "Living Room :: Closet :: Box 2",
    ["LR-3"]: "Living Room :: Closet :: Box 3",
    ["LR-4"]: "Living Room :: Closet :: Box 4",
    ["LR-5"]: "Living Room :: Closet :: Box 5",
    ["LR-6"]: "Living Room :: Closet :: Box 6",
    ["LR-7"]: "Living Room :: Closet :: Box 7",
    ["LR-8"]: "Living Room :: Closet :: Box 8"
}

const getLocation = (locationCode) => {
    return locations[locationCode]
}

export default getLocation 