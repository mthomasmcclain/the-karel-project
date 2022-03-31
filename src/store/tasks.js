export default {
    "f9416512-a2dc-11ec-bf6c-93ce512e2f2e": {
        "name": "Build Columns",
        "hint": "To rebuild the column, use a while loop to move upwards and a conditional inside the while loop to decide whether to place a stone.",
        "preWorld": {
            "nCols": 7,
            "nRows": 5,
            "karelRow": 4,
            "karelCol": 0,
            "karelDir": "East",
            "walls": [],
            "stones": [
                {
                    "r": 4,
                    "c": 1,
                    "n": 1
                },
                {
                    "r": 4,
                    "c": 3,
                    "n": 1
                },
                {
                    "r": 3,
                    "c": 3,
                    "n": 1
                },
                {
                    "r": 4,
                    "c": 4,
                    "n": 1
                },
                {
                    "r": 4,
                    "c": 6,
                    "n": 1
                }
            ],
            "editWallR": null,
            "editWallC": null,
            "editWallD": null,
            "editRow": null,
            "editCol": null
        },
        "postWorld": {
            "nCols": 7,
            "nRows": 5,
            "karelRow": 4,
            "karelCol": 6,
            "karelDir": "East",
            "walls": [],
            "stones": [
                {
                    "r": 4,
                    "c": 1,
                    "n": 1
                },
                {
                    "r": 3,
                    "c": 1,
                    "n": 1
                },
                {
                    "r": 2,
                    "c": 1,
                    "n": 1
                },
                {
                    "r": 1,
                    "c": 1,
                    "n": 1
                },
                {
                    "r": 0,
                    "c": 1,
                    "n": 1
                },
                {
                    "r": 4,
                    "c": 3,
                    "n": 1
                },
                {
                    "r": 3,
                    "c": 3,
                    "n": 1
                },
                {
                    "r": 2,
                    "c": 3,
                    "n": 1
                },
                {
                    "r": 1,
                    "c": 3,
                    "n": 1
                },
                {
                    "r": 0,
                    "c": 3,
                    "n": 1
                },
                {
                    "r": 4,
                    "c": 4,
                    "n": 1
                },
                {
                    "r": 3,
                    "c": 4,
                    "n": 1
                },
                {
                    "r": 2,
                    "c": 4,
                    "n": 1
                },
                {
                    "r": 1,
                    "c": 4,
                    "n": 1
                },
                {
                    "r": 0,
                    "c": 4,
                    "n": 1
                },
                {
                    "r": 4,
                    "c": 6,
                    "n": 1
                },
                {
                    "r": 3,
                    "c": 6,
                    "n": 1
                },
                {
                    "r": 2,
                    "c": 6,
                    "n": 1
                },
                {
                    "r": 1,
                    "c": 6,
                    "n": 1
                },
                {
                    "r": 0,
                    "c": 6,
                    "n": 1
                }
            ],
            "editWallR": null,
            "editWallC": null,
            "editWallD": null,
            "editRow": null,
            "editCol": null
        },
        "instructions": "Use all of the code blocks in the workspace to complete the two functions, and help Karel achieve the goal.",
        "karelBlockly": {
            "toolbox": "\n  <xml>\n    <Block type=\"procedures_callnoreturn\"><mutation name=\"build column\" /></Block><Block type=\"procedures_callnoreturn\"><mutation name=\"return to base\" /></Block>\n    <Block type=\"karel_move\" id=\"karel_move\" />\n    <Block type=\"karel_turn_left\" id=\"karel_turn\" />\n    <Block type=\"karel_place_stone\" id=\"karel_place\" />\n    <Block type=\"karel_pickup_stone\" id=\"karel_pickup\" />\n    <Block type=\"karel_if_dropdown\" id=\"karel_if\" />\n    \n    <Block type=\"karel_while_dropdown\" id=\"karel_while\" />\n    <Block type=\"procedures_defnoreturn\" id=\"karel_define\" />\n  </xml>\n",
            "settings": {
                "blocks": {
                    "karel_move": {
                        "active": true,
                        "limit": -1
                    },
                    "karel_turn": {
                        "active": true,
                        "limit": -1
                    },
                    "karel_place": {
                        "active": true,
                        "limit": -1
                    },
                    "karel_pickup": {
                        "active": true,
                        "limit": -1
                    },
                    "karel_if": {
                        "active": true,
                        "limit": -1
                    },
                    "karel_repeat": {
                        "active": false,
                        "limit": -1
                    },
                    "karel_while": {
                        "active": true,
                        "limit": -1
                    },
                    "karel_define": {
                        "active": true,
                        "limit": -1
                    }
                },
                "showToolbox": false,
                "disabled": false,
                "maxBlocks": -1,
                "customizerMode": false
            },
            "workspace": "<xml xmlns=\"https://developers.google.com/blockly/xml\"><block type=\"karel_main\" id=\"main\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"16\" y=\"16\"><statement name=\"program\"><block type=\"karel_while_dropdown\" id=\"ktD#LExN#8uy{tuj6I0D\" deletable=\"false\" movable=\"false\" editable=\"false\"><field name=\"CONDITION\">FRONT_CLEAR</field><statement name=\"LOOP\"><block type=\"karel_move\" id=\"3EeNN{fqghpdDX{y)PAO\" deletable=\"false\" movable=\"false\" editable=\"false\"><next><block type=\"karel_if_dropdown\" id=\"?%abueatYT.nDu}zM@U|\" deletable=\"false\" movable=\"false\" editable=\"false\"><field name=\"CONDITION\">STONES_PRESENT</field><statement name=\"THEN\"><block type=\"procedures_callnoreturn\" id=\"w;G%t[)8U;Up@.FNc!sv\" deletable=\"false\" movable=\"false\" editable=\"false\"><mutation name=\"build column\"></mutation><next><block type=\"procedures_callnoreturn\" id=\"$Ap;Tb]1TB{AYZ0sg]aX\" deletable=\"false\" movable=\"false\" editable=\"false\"><mutation name=\"return to base\"></mutation></block></next></block></statement></block></next></block></statement></block></statement></block><block type=\"procedures_defnoreturn\" id=\"Wx08ytl3s9|l.Hrb5F)3\" deletable=\"false\" x=\"235\" y=\"18\"><field name=\"NAME\">build column</field></block><block type=\"karel_turn_left\" id=\".i]4)-;iu4FeUxH2C.oS\" deletable=\"false\" x=\"459\" y=\"24\"></block><block type=\"karel_turn_left\" id=\"?|]:OU6`M%x*oPIr*DHf\" deletable=\"false\" x=\"245\" y=\"103\"></block><block type=\"karel_turn_left\" id=\"2,51g+SO:br6|(=GA~*/\" deletable=\"false\" x=\"356\" y=\"105\"></block><block type=\"karel_place_stone\" id=\":=Io:/uBMCW;(BVg@Rt^\" deletable=\"false\" x=\"458\" y=\"107\"></block><block type=\"karel_turn_left\" id=\"g?uC+evimd77(M%0K[$E\" deletable=\"false\" x=\"249\" y=\"161\"></block><block type=\"karel_place_stone\" id=\"3bVXvdZvP5j%ROe}(wZg\" deletable=\"false\" x=\"350\" y=\"164\"></block><block type=\"karel_while_dropdown\" id=\"nnTPj+K2V!rGsjnm@Eyn\" deletable=\"false\" x=\"228\" y=\"245\"><field name=\"CONDITION\">FRONT_CLEAR</field></block><block type=\"karel_move\" id=\"gh?{?_bzeS;0%pf+)MS3\" deletable=\"false\" x=\"424\" y=\"235\"></block><block type=\"procedures_defnoreturn\" id=\"4u?bvx}c3^cJMnENL?=3\" deletable=\"false\" x=\"22\" y=\"264\"><field name=\"NAME\">return to base</field></block><block type=\"karel_move\" id=\"|Yq:{$4zrU^HAxj]1z5y\" deletable=\"false\" x=\"430\" y=\"301\"></block><block type=\"karel_if_dropdown\" id=\")-/h8Oz~m|Z|e8ovP[vK\" deletable=\"false\" x=\"27\" y=\"350\"><field name=\"CONDITION\">STONES_NOT_PRESENT</field></block><block type=\"karel_while_dropdown\" id=\"%hntys;-tweX$0GO}P~E\" deletable=\"false\" x=\"232\" y=\"343\"><field name=\"CONDITION\">FRONT_CLEAR</field></block></xml>",
            "highlight": []
        },
        "tags": {
            "customTags": [],
            "systemTags": [
                "Expert Task"
            ]
        }
    },
    "9e28bda0-a33f-11ec-8730-6586a90590bb": {
        "name": "Simplify with Functions",
        "hint": "",
        "preWorld": {
            "nCols": 4,
            "nRows": 2,
            "karelRow": 0,
            "karelCol": 0,
            "karelDir": "East",
            "walls": [
                {
                    "r": 1,
                    "c": 0,
                    "d": "North"
                },
                {
                    "r": 1,
                    "c": 0,
                    "d": "East"
                },
                {
                    "r": 1,
                    "c": 1,
                    "d": "East"
                },
                {
                    "r": 1,
                    "c": 2,
                    "d": "East"
                }
            ],
            "stones": [
                {
                    "r": 1,
                    "c": 1,
                    "n": 2
                },
                {
                    "r": 1,
                    "c": 2,
                    "n": 2
                },
                {
                    "r": 1,
                    "c": 3,
                    "n": 2
                }
            ],
            "editRow": null,
            "editCol": null,
            "editWallR": null,
            "editWallC": null,
            "editWallD": null
        },
        "postWorld": {
            "nCols": 4,
            "nRows": 2,
            "karelRow": 0,
            "karelCol": 3,
            "karelDir": "East",
            "walls": [
                {
                    "r": 1,
                    "c": 0,
                    "d": "North"
                },
                {
                    "r": 1,
                    "c": 0,
                    "d": "East"
                },
                {
                    "r": 1,
                    "c": 1,
                    "d": "East"
                },
                {
                    "r": 1,
                    "c": 2,
                    "d": "East"
                }
            ],
            "stones": [],
            "editRow": null,
            "editCol": null,
            "editWallR": null,
            "editWallC": null,
            "editWallD": null
        },
        "instructions": "Use functions to group blocks from the starter code in a way that makes the code simpler and easier to understand. Try to get the fewest possible number of blocks, and at least 10 blocks fewer than the starter code. Click the 'Reset Code' button to reset all of the blocks to the starting state.",
        "karelBlockly": {
            "toolbox": "\n  <xml>\n    \n    <Block type=\"karel_move\" id=\"karel_move\" />\n    <Block type=\"karel_turn_left\" id=\"karel_turn\" />\n    <Block type=\"karel_place_stone\" id=\"karel_place\" />\n    <Block type=\"karel_pickup_stone\" id=\"karel_pickup\" />\n    \n    \n    \n    <Block type=\"procedures_defnoreturn\" id=\"karel_define\" />\n  </xml>\n",
            "settings": {
                "blocks": {
                    "karel_move": {
                        "active": true,
                        "limit": -1
                    },
                    "karel_turn": {
                        "active": true,
                        "limit": -1
                    },
                    "karel_place": {
                        "active": true,
                        "limit": -1
                    },
                    "karel_pickup": {
                        "active": true,
                        "limit": -1
                    },
                    "karel_if": {
                        "active": false,
                        "limit": -1
                    },
                    "karel_repeat": {
                        "active": false,
                        "limit": -1
                    },
                    "karel_while": {
                        "active": false,
                        "limit": -1
                    },
                    "karel_define": {
                        "active": true,
                        "limit": -1
                    }
                },
                "showToolbox": true,
                "disabled": false,
                "maxBlocks": -1,
                "customizerMode": false
            },
            "workspace": "<xml xmlns=\"https://developers.google.com/blockly/xml\"><block type=\"karel_main\" id=\"main\" deletable=\"false\" x=\"44\" y=\"0\"><statement name=\"program\"><block type=\"karel_move\" id=\"0p}tkgbE#tDG$Za`xOyS\"><next><block type=\"karel_turn_left\" id=\"hn3*_K5yJ~MD]31DHQv)\"><next><block type=\"karel_turn_left\" id=\"C+$jL!6kk]2bLmEX1Uz+\"><next><block type=\"karel_turn_left\" id=\"Z[|GT9^3LmxY`[pf(YKR\"><next><block type=\"karel_move\" id=\"-;?kEpc@K]-i@%)uG/$N\"><next><block type=\"karel_pickup_stone\" id=\":1jZ)H(?^CUU5fd6.cC]\"><next><block type=\"karel_pickup_stone\" id=\"Z0a/_r|f$Xf?Gy4~*;q}\"><next><block type=\"karel_turn_left\" id=\"[~:Zu$lHVs|nZej=7]lP\"><next><block type=\"karel_turn_left\" id=\"@11=]$O8,9^3I%IO{dtf\"><next><block type=\"karel_move\" id=\"_vxpjY+JXc?[Q[SpXJkV\"><next><block type=\"karel_turn_left\" id=\"h/CQaQ/ur|SW,RG*_~sB\"><next><block type=\"karel_turn_left\" id=\"Z?W{9Cvm#!^^@sD@!k_5\"><next><block type=\"karel_turn_left\" id=\"|yXHShAFU7m^a!mN.amK\"><next><block type=\"karel_move\" id=\"CKp;WOy)12URfj]:;i8u\"><next><block type=\"karel_turn_left\" id=\"x4b2fLwthp@z^/Ub8H4L\"><next><block type=\"karel_turn_left\" id=\"p!^@Rlv1_;bTm-U[]VJo\"><next><block type=\"karel_turn_left\" id=\"[_{wLQSntGIzg=jAb-Q9\"><next><block type=\"karel_move\" id=\"Ihw)_OLU-s[{h]@;34^Y\"><next><block type=\"karel_pickup_stone\" id=\"LRR4`3[MZWxw)uRGD5CD\"><next><block type=\"karel_pickup_stone\" id=\"h-N`T]cICa-JWa3$,z@/\"><next><block type=\"karel_turn_left\" id=\"-.[hSELmG*2;=iQMa2Xr\"><next><block type=\"karel_turn_left\" id=\"+hQVVcKk.cBXV~`UmHLV\"><next><block type=\"karel_move\" id=\"Tp(:raXC^Ho..x|(6j@m\"><next><block type=\"karel_turn_left\" id=\"fik.vtJ{qBr9D9%W7vX(\"><next><block type=\"karel_turn_left\" id=\"$F7E=(D4upJe#iLL)V.p\"><next><block type=\"karel_turn_left\" id=\"7STo3_o+~Tn9m9O@GEg6\"><next><block type=\"karel_move\" id=\"d,U.*lgOk}sLORZjA7=Q\"><next><block type=\"karel_turn_left\" id=\"P~.;2)S{gb7#9:6Wh,qR\"><next><block type=\"karel_turn_left\" id=\"+f/.g9[*Raa5^(I_]_dG\"><next><block type=\"karel_turn_left\" id=\"%FFY@Bg]$,iRK4vYgp1y\"><next><block type=\"karel_move\" id=\"Q16;URmAL)8[6Yuez4LP\"><next><block type=\"karel_pickup_stone\" id=\"EG{{n9FSo@g_cuMJsPQp\"><next><block type=\"karel_pickup_stone\" id=\"Qs=,NhyZTlEJ!?B(t}+b\"><next><block type=\"karel_turn_left\" id=\"@`uK:!:]Z/~8]XWX!-S[\"><next><block type=\"karel_turn_left\" id=\"%ZW!~S$#o=)R+823o?#E\"><next><block type=\"karel_move\" id=\"1fMi96fPuBDm(oeK4*$v\"><next><block type=\"karel_turn_left\" id=\"9P^!b`:/e1KN~b^{GhQE\"><next><block type=\"karel_turn_left\" id=\"p-74Zhn/A3kUTVLe7Ijx\"><next><block type=\"karel_turn_left\" id=\"ndCIXxn^O~YQtY~Je%C2\"></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></statement></block></xml>",
            "highlight": []
        },
        "tags": {
            "customTags": [],
            "systemTags": [
                "Expert Task"
            ]
        }
    },
    "3da7a961-a0e7-46e7-aa2d-f2cc2994a275": {
        "name": "Karel the Turtle",
        "instructions": "Karel is a turtle.  Press the \"play\" button and watch Karel spin around",
        "hint": "",
        "preWorld": {
            "nCols": 3,
            "nRows": 3,
            "karelRow": 1,
            "karelCol": 1,
            "karelDir": "East",
            "walls": [],
            "stones": []
        },
        "postWorld": {
            "nCols": 3,
            "nRows": 3,
            "karelRow": 1,
            "karelCol": 1,
            "karelDir": "East",
            "walls": [],
            "stones": []
        },
        "karelBlockly": {
            "highlight": [],
            "settings": {
                "blocks": {
                    "karel_move": {
                        "active": true,
                        "limit": -1
                    },
                    "karel_turn": {
                        "active": true,
                        "limit": -1
                    },
                    "karel_place": {
                        "active": true,
                        "limit": -1
                    },
                    "karel_pickup": {
                        "active": true,
                        "limit": -1
                    },
                    "karel_if": {
                        "active": false,
                        "limit": -1
                    },
                    "karel_repeat": {
                        "active": false,
                        "limit": -1
                    },
                    "karel_while": {
                        "active": false,
                        "limit": -1
                    },
                    "karel_define": {
                        "active": false,
                        "limit": -1
                    }
                },
                "showToolbox": false,
                "disabled": true,
                "maxBlocks": -1,
                "customizerMode": false
            },
            "workspace": "<xml xmlns=\"https://developers.google.com/blockly/xml\"><block type=\"karel_main\" id=\"main\" deletable=\"false\" x=\"44\" y=\"0\"><statement name=\"program\"><block type=\"karel_turn_left\" id=\"sVZupNrTLSv$~.|ezCrj\" deletable=\"false\"><next><block type=\"karel_turn_left\" id=\"=BQ]`4?2}O1uq^ztXC38\" deletable=\"false\"><next><block type=\"karel_turn_left\" id=\"P:yUUx,}yCP86i]CFDfE\" deletable=\"false\"><next><block type=\"karel_turn_left\" id=\"bCZ;/6~Urq/5?9]=~uS;\" deletable=\"false\"></block></next></block></next></block></next></block></statement></block></xml>",
            "toolbox": "\n  <xml>\n    \n    <Block type=\"karel_move\" id=\"karel_move\" />\n    <Block type=\"karel_turn_left\" id=\"karel_turn\" />\n    <Block type=\"karel_place_stone\" id=\"karel_place\" />\n    <Block type=\"karel_pickup_stone\" id=\"karel_pickup\" />\n    \n    \n    \n    \n  </xml>\n"
        },
        "tags": {
            "customTags": [],
            "systemTags": [
                "Basic Toolbox",
                "Parson's Problem"
            ]
        }
    },
    "c446fe42-5945-4b04-a00a-9bc824b0d7de": {
        "name": "Karel Can Move",
        "instructions": "Notice the \"start\" world and the \"goal\" world.  Drag move blocks into the code space to move Karel forward two times.",
        "hint": "",
        "preWorld": {
            "nCols": 3,
            "nRows": 3,
            "karelRow": 1,
            "karelCol": 0,
            "karelDir": "East",
            "walls": [],
            "stones": [
                {
                    "r": 1,
                    "c": 1,
                    "n": 1
                }
            ]
        },
        "postWorld": {
            "nCols": 3,
            "nRows": 3,
            "karelRow": 1,
            "karelCol": 2,
            "karelDir": "East",
            "walls": [],
            "stones": [
                {
                    "r": 1,
                    "c": 1,
                    "n": 1
                }
            ]
        },
        "karelBlockly": {
            "highlight": [],
            "settings": {
                "blocks": {
                    "karel_move": {
                        "active": true,
                        "limit": -1
                    },
                    "karel_turn": {
                        "active": false,
                        "limit": -1
                    },
                    "karel_place": {
                        "active": false,
                        "limit": -1
                    },
                    "karel_pickup": {
                        "active": false,
                        "limit": -1
                    },
                    "karel_if": {
                        "active": false,
                        "limit": -1
                    },
                    "karel_repeat": {
                        "active": false,
                        "limit": -1
                    },
                    "karel_while": {
                        "active": false,
                        "limit": -1
                    },
                    "karel_define": {
                        "active": false,
                        "limit": -1
                    }
                },
                "showToolbox": true,
                "disabled": false,
                "maxBlocks": -1,
                "customizerMode": false
            },
            "workspace": "<xml xmlns=\"https://developers.google.com/blockly/xml\"><block type=\"karel_main\" id=\"main\" deletable=\"false\" x=\"44\" y=\"0\"></block></xml>",
            "toolbox": "\n  <xml>\n    \n    <Block type=\"karel_move\" id=\"karel_move\" />\n    \n    \n    \n    \n    \n    \n    \n  </xml>\n"
        },
        "tags": {
            "customTags": [],
            "systemTags": []
        }
    },
    "73a2eff1-05e5-4334-bedd-cdcc2caf0adb": {
        "name": "Karel Cleans Up",
        "instructions": "Try to write a program for Karel to move to the blue diamond and then pick it up.",
        "hint": "Karel needs to move forward twice and then pickup the stone.",
        "preWorld": {
            "nCols": 3,
            "nRows": 3,
            "karelRow": 1,
            "karelCol": 0,
            "karelDir": "East",
            "walls": [],
            "stones": [
                {
                    "r": 1,
                    "c": 2,
                    "n": 1
                }
            ]
        },
        "postWorld": {
            "nCols": 3,
            "nRows": 3,
            "karelRow": 1,
            "karelCol": 2,
            "karelDir": "East",
            "walls": [],
            "stones": []
        },
        "karelBlockly": {
            "highlight": [],
            "settings": {
                "blocks": {
                    "karel_move": {
                        "active": true,
                        "limit": -1
                    },
                    "karel_turn": {
                        "active": false,
                        "limit": -1
                    },
                    "karel_place": {
                        "active": false,
                        "limit": -1
                    },
                    "karel_pickup": {
                        "active": true,
                        "limit": -1
                    },
                    "karel_if": {
                        "active": false,
                        "limit": -1
                    },
                    "karel_repeat": {
                        "active": false,
                        "limit": -1
                    },
                    "karel_while": {
                        "active": false,
                        "limit": -1
                    },
                    "karel_define": {
                        "active": false,
                        "limit": -1
                    }
                },
                "showToolbox": true,
                "disabled": false,
                "maxBlocks": -1,
                "customizerMode": false
            },
            "workspace": "<xml xmlns=\"https://developers.google.com/blockly/xml\"><block type=\"karel_main\" id=\"main\" deletable=\"false\" x=\"44\" y=\"0\"></block></xml>",
            "toolbox": "\n  <xml>\n    \n    <Block type=\"karel_move\" id=\"karel_move\" />\n    \n    \n    <Block type=\"karel_pickup_stone\" id=\"karel_pickup\" />\n    \n    \n    \n    \n  </xml>\n"
        },
        "tags": {
            "customTags": [],
            "systemTags": []
        }
    },
    "d5c5a939-5fb7-4917-af68-4f8643239bae": {
        "name": "Karel Turns Left",
        "instructions": "Write a program to direct Karel to the \"Goal World!\"",
        "hint": "",
        "preWorld": {
            "nCols": 3,
            "nRows": 2,
            "karelRow": 1,
            "karelCol": 0,
            "karelDir": "East",
            "walls": [
                {
                    "r": 1,
                    "c": 0,
                    "d": "North"
                },
                {
                    "r": 1,
                    "c": 1,
                    "d": "North"
                }
            ],
            "stones": []
        },
        "postWorld": {
            "nCols": 3,
            "nRows": 2,
            "karelRow": 0,
            "karelCol": 0,
            "karelDir": "West",
            "walls": [
                {
                    "r": 1,
                    "c": 0,
                    "d": "North"
                },
                {
                    "r": 1,
                    "c": 1,
                    "d": "North"
                }
            ],
            "stones": []
        },
        "karelBlockly": {
            "highlight": [],
            "settings": {
                "blocks": {
                    "karel_move": {
                        "active": true,
                        "limit": -1
                    },
                    "karel_turn": {
                        "active": true,
                        "limit": -1
                    },
                    "karel_place": {
                        "active": false,
                        "limit": -1
                    },
                    "karel_pickup": {
                        "active": false,
                        "limit": -1
                    },
                    "karel_if": {
                        "active": false,
                        "limit": -1
                    },
                    "karel_repeat": {
                        "active": false,
                        "limit": -1
                    },
                    "karel_while": {
                        "active": false,
                        "limit": -1
                    },
                    "karel_define": {
                        "active": false,
                        "limit": -1
                    }
                },
                "showToolbox": true,
                "disabled": false,
                "maxBlocks": -1,
                "customizerMode": false
            },
            "workspace": "<xml xmlns=\"https://developers.google.com/blockly/xml\"><block type=\"karel_main\" id=\"main\" deletable=\"false\" x=\"44\" y=\"0\"></block></xml>",
            "toolbox": "\n  <xml>\n    \n    <Block type=\"karel_move\" id=\"karel_move\" />\n    <Block type=\"karel_turn_left\" id=\"karel_turn\" />\n    \n    \n    \n    \n    \n    \n  </xml>\n"
        },
        "tags": {
            "customTags": [],
            "systemTags": []
        }
    },
    "bf258132-7bc9-4c85-947c-9d7b4de5f8ec": {
        "name": "Summary",
        "instructions": "Nice Work!  You have learned how to make Karel move, turn, and pick things up.  Press play to see Karel's happy dance.",
        "hint": "Just press play!",
        "preWorld": {
            "nCols": 5,
            "nRows": 5,
            "karelRow": 2,
            "karelCol": 1,
            "karelDir": "East",
            "walls": [],
            "stones": []
        },
        "postWorld": {
            "nCols": 5,
            "nRows": 5,
            "karelRow": 2,
            "karelCol": 1,
            "karelDir": "East",
            "walls": [],
            "stones": []
        },
        "karelBlockly": {
            "highlight": [],
            "settings": {
                "blocks": {
                    "karel_move": {
                        "active": true,
                        "limit": -1
                    },
                    "karel_turn": {
                        "active": true,
                        "limit": -1
                    },
                    "karel_place": {
                        "active": true,
                        "limit": -1
                    },
                    "karel_pickup": {
                        "active": true,
                        "limit": -1
                    },
                    "karel_if": {
                        "active": false,
                        "limit": -1
                    },
                    "karel_repeat": {
                        "active": false,
                        "limit": -1
                    },
                    "karel_while": {
                        "active": false,
                        "limit": -1
                    },
                    "karel_define": {
                        "active": true,
                        "limit": -1
                    }
                },
                "showToolbox": false,
                "disabled": true,
                "maxBlocks": -1,
                "customizerMode": false
            },
            "workspace": "<xml xmlns=\"https://developers.google.com/blockly/xml\"><block type=\"karel_main\" id=\"main\" deletable=\"false\" x=\"44\" y=\"0\"><statement name=\"program\"><block type=\"procedures_callnoreturn\" id=\"+}HVSm,Z~$gxL5`!E{*Z\" deletable=\"false\"><mutation name=\"make karel dance\"></mutation></block></statement></block><block type=\"procedures_defnoreturn\" id=\"B;c$VD%PBr#_u}=~x8SC\" deletable=\"false\" x=\"237\" y=\"49\"><field name=\"NAME\">make karel dance</field><statement name=\"STACK\"><block type=\"karel_move\" id=\"_oWw|[2[=TD-J0w;HA^@\" deletable=\"false\"><next><block type=\"karel_turn_left\" id=\"}_g(chg$|mWWC$HJIYj#\" deletable=\"false\"><next><block type=\"karel_turn_left\" id=\"nV`aL]?y1R0~VP,Ze};f\" deletable=\"false\"><next><block type=\"karel_turn_left\" id=\"=UQb8F/|=KF.]TbHfUo[\" deletable=\"false\"><next><block type=\"karel_turn_left\" id=\"=9JI7!DyK:BRU,0)=@Q{\" deletable=\"false\"><next><block type=\"karel_move\" id=\"1s-a1kpXQK8;TMxgy`74\" deletable=\"false\"><next><block type=\"karel_turn_left\" id=\".IQUXU,ND9~|#j[]ROky\" deletable=\"false\"><next><block type=\"karel_turn_left\" id=\"MK61XH}STD2;:D+%P?{R\" deletable=\"false\"><next><block type=\"karel_turn_left\" id=\"#Pij0lNh}!YDax%WiT9V\" deletable=\"false\"><next><block type=\"karel_turn_left\" id=\"._~5d.!#YNb]I%vVp.SA\" deletable=\"false\"><next><block type=\"karel_move\" id=\"565KW^3SP8/mSI/hf}3Z\" deletable=\"false\"><next><block type=\"karel_turn_left\" id=\"Ka9MR=U[piG%1FPmwCn-\" deletable=\"false\"><next><block type=\"karel_turn_left\" id=\"{]rTdXH3M^e}[V9x`_vk\" deletable=\"false\"><next><block type=\"karel_move\" id=\"vtX:|1rB9AKhNvNXDhY{\" deletable=\"false\"><next><block type=\"karel_move\" id=\"{`1K]7c%3~_$_wn8r$Pu\" deletable=\"false\"><next><block type=\"karel_move\" id=\"bq){Eqq]WhcN14n**$Vu\" deletable=\"false\"><next><block type=\"karel_turn_left\" id=\"J2hKk~[$-5i|TA`AAi{G\" deletable=\"false\"><next><block type=\"karel_turn_left\" id=\"WkZX|tZveJ^u+z+1a_80\" deletable=\"false\"></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></statement></block></xml>",
            "toolbox": "\n  <xml>\n    <Block type=\"procedures_callnoreturn\"><mutation name=\"make karel dance\" /></Block>\n    <Block type=\"karel_move\" id=\"karel_move\" />\n    <Block type=\"karel_turn_left\" id=\"karel_turn\" />\n    <Block type=\"karel_place_stone\" id=\"karel_place\" />\n    <Block type=\"karel_pickup_stone\" id=\"karel_pickup\" />\n    \n    \n    \n    <Block type=\"procedures_defnoreturn\" id=\"karel_define\" />\n  </xml>\n"
        },
        "tags": {
            "customTags": [],
            "systemTags": [
                "Has Function",
                "Parson's Problem"
            ]
        }
    },
    "031a29f7-772e-4570-ad67-cdc398b71df5": {
        "name": "Speed Karel Up",
        "instructions": "This code takes a long to time execute. Use the \"Play Speed\" to make your code and the turtle go faster (or slower).",
        "hint": "",
        "preWorld": {
            "nCols": 5,
            "nRows": 5,
            "karelRow": 4,
            "karelCol": 0,
            "karelDir": "East",
            "walls": [],
            "stones": [
                {
                    "r": 4,
                    "c": 2,
                    "n": 1
                },
                {
                    "r": 2,
                    "c": 4,
                    "n": 1
                },
                {
                    "r": 0,
                    "c": 2,
                    "n": 1
                },
                {
                    "r": 2,
                    "c": 0,
                    "n": 1
                }
            ]
        },
        "postWorld": {
            "nCols": 5,
            "nRows": 5,
            "karelRow": 4,
            "karelCol": 0,
            "karelDir": "East",
            "walls": [],
            "stones": []
        },
        "karelBlockly": {
            "highlight": [],
            "settings": {
                "blocks": {
                    "karel_move": {
                        "active": true,
                        "limit": -1
                    },
                    "karel_turn": {
                        "active": true,
                        "limit": -1
                    },
                    "karel_place": {
                        "active": true,
                        "limit": -1
                    },
                    "karel_pickup": {
                        "active": true,
                        "limit": -1
                    },
                    "karel_if": {
                        "active": false,
                        "limit": -1
                    },
                    "karel_repeat": {
                        "active": false,
                        "limit": -1
                    },
                    "karel_while": {
                        "active": false,
                        "limit": -1
                    },
                    "karel_define": {
                        "active": true,
                        "limit": -1
                    }
                },
                "showToolbox": false,
                "disabled": true,
                "maxBlocks": -1,
                "customizerMode": false
            },
            "workspace": "<xml xmlns=\"https://developers.google.com/blockly/xml\"><block type=\"karel_main\" id=\"main\" deletable=\"false\" x=\"0\" y=\"-159\"><statement name=\"program\"><block type=\"karel_move\" id=\"80GJX_%cZ!(.DC}-Nd}:\" deletable=\"false\"><next><block type=\"karel_move\" id=\"RZ8@.+`{p:HfrYzuzOLO\" deletable=\"false\"><next><block type=\"karel_pickup_stone\" id=\"L[DS2/T*]qaH7M3gBe(W\" deletable=\"false\"><next><block type=\"procedures_callnoreturn\" id=\".yZ9xc0ZPgjM+]NN0QW3\" deletable=\"false\"><mutation name=\"spin around twice\"></mutation><next><block type=\"karel_move\" id=\"3W!Q%Mh]T8;EV+3d#Ep}\" deletable=\"false\"><next><block type=\"karel_move\" id=\"3%+szTW7afv31_?y[*|q\" deletable=\"false\"><next><block type=\"karel_turn_left\" id=\"B6dpMQYUv}gCWQ*,ya|@\" deletable=\"false\"><next><block type=\"karel_move\" id=\"b#^dgDWWb43-K@54{qLK\" deletable=\"false\"><next><block type=\"karel_move\" id=\"qHeL7EYQ@g!14bWg^*.{\" deletable=\"false\"><next><block type=\"karel_pickup_stone\" id=\"?FN%,IZ0O,tx|2~BDNQ%\" deletable=\"false\"><next><block type=\"procedures_callnoreturn\" id=\"3F{(m[7j!bc?B2{avN|K\" deletable=\"false\"><mutation name=\"spin around twice\"></mutation><next><block type=\"karel_move\" id=\"m=]bB*7wU(lyZ/SW?t)|\" deletable=\"false\"><next><block type=\"karel_move\" id=\"BRaT(Gm)|VtZ-@qmr2Xc\" deletable=\"false\"><next><block type=\"karel_turn_left\" id=\"dknQ2bdE5Rw!0?WT+FsW\" deletable=\"false\"><next><block type=\"karel_move\" id=\"O/H:@qyIE_-JqT-B-)36\" deletable=\"false\"><next><block type=\"karel_move\" id=\"5I6@%EEW*K#Bv8-Pqp7b\" deletable=\"false\"><next><block type=\"karel_pickup_stone\" id=\"vX_,c1x}f(;/5fu0LTVH\" deletable=\"false\"><next><block type=\"procedures_callnoreturn\" id=\"GTtb^,L(I!/b?J*)qNwC\" deletable=\"false\"><mutation name=\"spin around twice\"></mutation><next><block type=\"karel_move\" id=\"q}):WQQXmn)XV#sG?G%n\" deletable=\"false\"><next><block type=\"karel_move\" id=\"jYa20/qnb5{ZD^e./:8?\" deletable=\"false\"><next><block type=\"karel_turn_left\" id=\"?NaKmv/([@m0?BF(CR%)\" deletable=\"false\"><next><block type=\"karel_move\" id=\".:J1W+AW`2,qwSiu;t3j\" deletable=\"false\"><next><block type=\"karel_move\" id=\"*)Wp:d~w@}8,Rk3OC(}M\" deletable=\"false\"><next><block type=\"karel_pickup_stone\" id=\":T~,JU#6qE,s:!.Zf)q;\" deletable=\"false\"><next><block type=\"procedures_callnoreturn\" id=\"aD3PhWq3puxI80n96Gf@\" deletable=\"false\"><mutation name=\"spin around twice\"></mutation><next><block type=\"karel_move\" id=\";F-K{u5(+P2y6[58^I+J\" deletable=\"false\"><next><block type=\"karel_move\" id=\"8zf`}9RkPkPi,Q_0Vg#8\" deletable=\"false\"><next><block type=\"karel_turn_left\" id=\"F):uTCGa:30wF^.,S[T5\" deletable=\"false\"></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></statement></block><block type=\"procedures_defnoreturn\" id=\"8,dZwk~har~=R{aIY=`a\" deletable=\"false\" x=\"244\" y=\"97\"><field name=\"NAME\">spin around twice</field><statement name=\"STACK\"><block type=\"karel_turn_left\" id=\"@RO~z=7bMOTay%=8!H5f\" deletable=\"false\"><next><block type=\"karel_turn_left\" id=\"+$BxS8xJsi3@]zGG,GP7\" deletable=\"false\"><next><block type=\"karel_turn_left\" id=\".F#-[#^_Vs41_p6-pxo9\" deletable=\"false\"><next><block type=\"karel_turn_left\" id=\"C]Td.odFv*a/Q5Mm*(Kn\" deletable=\"false\"><next><block type=\"karel_turn_left\" id=\"Jq.Hzp=)?O~$5trBV;:F\" deletable=\"false\"><next><block type=\"karel_turn_left\" id=\"cE9,4r^J(g|d6JBcrco@\" deletable=\"false\"><next><block type=\"karel_turn_left\" id=\"]t2Kf+i/hwsaLbg3I:Cr\" deletable=\"false\"><next><block type=\"karel_turn_left\" id=\"*WemNnay6aP={*xoGs%*\" deletable=\"false\"></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></statement></block></xml>",
            "toolbox": "\n  <xml>\n    <Block type=\"procedures_callnoreturn\"><mutation name=\"spin around twice\" /></Block>\n    <Block type=\"karel_move\" id=\"karel_move\" />\n    <Block type=\"karel_turn_left\" id=\"karel_turn\" />\n    <Block type=\"karel_place_stone\" id=\"karel_place\" />\n    <Block type=\"karel_pickup_stone\" id=\"karel_pickup\" />\n    \n    \n    \n    <Block type=\"procedures_defnoreturn\" id=\"karel_define\" />\n  </xml>\n"
        },
        "tags": {
            "customTags": [],
            "systemTags": [
                "Has Function",
                "Parson's Problem"
            ]
        }
    }
}