const extractDataByLevels = (data, path, level = 0) => {
    data = data[path[level++]]

    if (level < path.length) {
        data = extractDataByLevels(data, path, level)
    }

    return data
}

module.exports = {
    extractDataByLevels
}
