export default (element) => {
    const rect = element.getBoundingClientRect();
    const { height, width } = rect;
    const { clientTop, clientLeft } = document.activeElement;

    return {
        top: rect.top - clientTop,
        bottom: rect.bottom - clientTop,
        left: rect.left - clientLeft,
        right: rect.right - clientLeft,
        height,
        width
    }
}
