export default function karelWorldsMatch(kw1, kw2) {
    if (kw1.karelRow !== kw2.karelRow) return false
    if (kw1.karelCol !== kw2.karelCol) return false
    if (kw1.karelDir !== kw2.karelDir) return false


    function stonesMatch(s1, s2) {
        if (s1.r !== s2.r) return false
        if (s1.c !== s2.c) return false
        if (s1.n !== s2.n) return false
        return true
    }

    const all1in2 = kw1.stones.every(w1Stone =>
        kw2.stones.some(w2Stone => stonesMatch(w1Stone, w2Stone))
    )
    const all2in1 = kw2.stones.every(w2Stone =>
        kw1.stones.some(w1Stone => stonesMatch(w1Stone, w2Stone))
    )
    if (!all1in2 || !all2in1) return false

    return true
}
