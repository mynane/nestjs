export default (ev) => {
    if (ev.pageX || ev.pageY) {
        return { x: ev.pageX, y: ev.pageY };
    }
    return {
        left: ev.clientX + document.body.scrollLeft - document.body.clientLeft,
        top: ev.clientY + document.body.scrollTop - document.body.clientTop
    }
}
