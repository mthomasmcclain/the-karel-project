//  Given a rectangle of w/h centered at the origin and a line with slope m that passes
//  through the origin, this function returns the coordiates of the intersections.

export default function minimumAreaEllipsePositiveXIntersection(w, h, m) {
    const x = Math.sqrt(w * w * h * h / (2 * h * h + 2 * m * m * w * w))
    const y = m * x
    return [{ x, y }, { x: -x, y: -y }]
}