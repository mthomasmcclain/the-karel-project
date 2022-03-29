export default {
    "name": "Simplify with Functions",
    "hint": "",
    "preWorld": { "nCols": 4, "nRows": 2, "karelRow": 0, "karelCol": 0, "karelDir": "East", "walls": [{ "r": 1, "c": 0, "d": "North" }, { "r": 1, "c": 0, "d": "East" }, { "r": 1, "c": 1, "d": "East" }, { "r": 1, "c": 2, "d": "East" }], "stones": [{ "r": 1, "c": 1, "n": 2 }, { "r": 1, "c": 2, "n": 2 }, { "r": 1, "c": 3, "n": 2 }], "editRow": null, "editCol": null, "editWallR": null, "editWallC": null, "editWallD": null },
    "postWorld": { "nCols": 4, "nRows": 2, "karelRow": 0, "karelCol": 3, "karelDir": "East", "walls": [{ "r": 1, "c": 0, "d": "North" }, { "r": 1, "c": 0, "d": "East" }, { "r": 1, "c": 1, "d": "East" }, { "r": 1, "c": 2, "d": "East" }], "stones": [], "editRow": null, "editCol": null, "editWallR": null, "editWallC": null, "editWallD": null },
    "instructions": "Use functions to group blocks from the starter code in a way that makes the code simpler and easier to understand. Try to get the fewest possible number of blocks, and at least 10 blocks fewer than the starter code. Click the 'Reset Code' button to reset all of the blocks to the starting state.",
    "karelBlockly": {
        "toolbox": "\n  <xml>\n    \n    <Block type=\"karel_move\" id=\"karel_move\" />\n    <Block type=\"karel_turn_left\" id=\"karel_turn\" />\n    <Block type=\"karel_place_stone\" id=\"karel_place\" />\n    <Block type=\"karel_pickup_stone\" id=\"karel_pickup\" />\n    \n    \n    \n    <Block type=\"procedures_defnoreturn\" id=\"karel_define\" />\n  </xml>\n",
        "settings": {
            "blocks": {
                "karel_move": { "active": true, "limit": -1 },
                "karel_turn": { "active": true, "limit": -1 },
                "karel_place": { "active": true, "limit": -1 },
                "karel_pickup": { "active": true, "limit": -1 },
                "karel_if": { "active": false, "limit": -1 },
                "karel_repeat": { "active": false, "limit": -1 },
                "karel_while": { "active": false, "limit": -1 },
                "karel_define": { "active": true, "limit": -1 }
            },
            "showToolbox": true,
            "disabled": false,
            "maxBlocks": -1,
            "customizerMode": false
        },
        "workspace": "<xml xmlns=\"https://developers.google.com/blockly/xml\"><block type=\"karel_main\" id=\"main\" deletable=\"false\" x=\"44\" y=\"0\"><statement name=\"program\"><block type=\"karel_move\" id=\"0p}tkgbE#tDG$Za`xOyS\"><next><block type=\"karel_turn_left\" id=\"hn3*_K5yJ~MD]31DHQv)\"><next><block type=\"karel_turn_left\" id=\"C+$jL!6kk]2bLmEX1Uz+\"><next><block type=\"karel_turn_left\" id=\"Z[|GT9^3LmxY`[pf(YKR\"><next><block type=\"karel_move\" id=\"-;?kEpc@K]-i@%)uG/$N\"><next><block type=\"karel_pickup_stone\" id=\":1jZ)H(?^CUU5fd6.cC]\"><next><block type=\"karel_pickup_stone\" id=\"Z0a/_r|f$Xf?Gy4~*;q}\"><next><block type=\"karel_turn_left\" id=\"[~:Zu$lHVs|nZej=7]lP\"><next><block type=\"karel_turn_left\" id=\"@11=]$O8,9^3I%IO{dtf\"><next><block type=\"karel_move\" id=\"_vxpjY+JXc?[Q[SpXJkV\"><next><block type=\"karel_turn_left\" id=\"h/CQaQ/ur|SW,RG*_~sB\"><next><block type=\"karel_turn_left\" id=\"Z?W{9Cvm#!^^@sD@!k_5\"><next><block type=\"karel_turn_left\" id=\"|yXHShAFU7m^a!mN.amK\"><next><block type=\"karel_move\" id=\"CKp;WOy)12URfj]:;i8u\"><next><block type=\"karel_turn_left\" id=\"x4b2fLwthp@z^/Ub8H4L\"><next><block type=\"karel_turn_left\" id=\"p!^@Rlv1_;bTm-U[]VJo\"><next><block type=\"karel_turn_left\" id=\"[_{wLQSntGIzg=jAb-Q9\"><next><block type=\"karel_move\" id=\"Ihw)_OLU-s[{h]@;34^Y\"><next><block type=\"karel_pickup_stone\" id=\"LRR4`3[MZWxw)uRGD5CD\"><next><block type=\"karel_pickup_stone\" id=\"h-N`T]cICa-JWa3$,z@/\"><next><block type=\"karel_turn_left\" id=\"-.[hSELmG*2;=iQMa2Xr\"><next><block type=\"karel_turn_left\" id=\"+hQVVcKk.cBXV~`UmHLV\"><next><block type=\"karel_move\" id=\"Tp(:raXC^Ho..x|(6j@m\"><next><block type=\"karel_turn_left\" id=\"fik.vtJ{qBr9D9%W7vX(\"><next><block type=\"karel_turn_left\" id=\"$F7E=(D4upJe#iLL)V.p\"><next><block type=\"karel_turn_left\" id=\"7STo3_o+~Tn9m9O@GEg6\"><next><block type=\"karel_move\" id=\"d,U.*lgOk}sLORZjA7=Q\"><next><block type=\"karel_turn_left\" id=\"P~.;2)S{gb7#9:6Wh,qR\"><next><block type=\"karel_turn_left\" id=\"+f/.g9[*Raa5^(I_]_dG\"><next><block type=\"karel_turn_left\" id=\"%FFY@Bg]$,iRK4vYgp1y\"><next><block type=\"karel_move\" id=\"Q16;URmAL)8[6Yuez4LP\"><next><block type=\"karel_pickup_stone\" id=\"EG{{n9FSo@g_cuMJsPQp\"><next><block type=\"karel_pickup_stone\" id=\"Qs=,NhyZTlEJ!?B(t}+b\"><next><block type=\"karel_turn_left\" id=\"@`uK:!:]Z/~8]XWX!-S[\"><next><block type=\"karel_turn_left\" id=\"%ZW!~S$#o=)R+823o?#E\"><next><block type=\"karel_move\" id=\"1fMi96fPuBDm(oeK4*$v\"><next><block type=\"karel_turn_left\" id=\"9P^!b`:/e1KN~b^{GhQE\"><next><block type=\"karel_turn_left\" id=\"p-74Zhn/A3kUTVLe7Ijx\"><next><block type=\"karel_turn_left\" id=\"ndCIXxn^O~YQtY~Je%C2\"></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></statement></block></xml>",
        "highlight": []
    },
    tags: {
        'customTags': [ ],
        'systemTags': ['Expert Task'],
    }
}