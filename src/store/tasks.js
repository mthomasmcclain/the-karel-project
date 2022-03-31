export default {
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
    },
    "73809f71-d14a-4ebd-8f62-3b7bfc40817c": {
        "name": "The Spiral",
        "instructions": "Can you get Karel to the center with only 3 blocks?  Think of how many blocks we would have to use without \"repeat\" and \"while\" to help us out!",
        "hint": "For each side, Karel will move forward to the a wall, and then turn left.  But how many times?",
        "preWorld": {
            "nCols": 5,
            "nRows": 5,
            "karelRow": 4,
            "karelCol": 0,
            "karelDir": "East",
            "walls": [
                {
                    "r": 3,
                    "c": 1,
                    "d": "North"
                },
                {
                    "r": 3,
                    "c": 2,
                    "d": "North"
                },
                {
                    "r": 2,
                    "c": 2,
                    "d": "East"
                },
                {
                    "r": 1,
                    "c": 2,
                    "d": "North"
                },
                {
                    "r": 1,
                    "c": 1,
                    "d": "North"
                },
                {
                    "r": 4,
                    "c": 0,
                    "d": "North"
                },
                {
                    "r": 4,
                    "c": 1,
                    "d": "North"
                },
                {
                    "r": 4,
                    "c": 2,
                    "d": "North"
                },
                {
                    "r": 4,
                    "c": 3,
                    "d": "North"
                },
                {
                    "r": 3,
                    "c": 3,
                    "d": "East"
                },
                {
                    "r": 2,
                    "c": 3,
                    "d": "East"
                },
                {
                    "r": 1,
                    "c": 3,
                    "d": "East"
                },
                {
                    "r": 1,
                    "c": 3,
                    "d": "North"
                },
                {
                    "r": 1,
                    "c": 0,
                    "d": "East"
                },
                {
                    "r": 2,
                    "c": 0,
                    "d": "East"
                },
                {
                    "r": 2,
                    "c": 2,
                    "d": "North"
                }
            ],
            "stones": []
        },
        "postWorld": {
            "nCols": 5,
            "nRows": 5,
            "karelRow": 2,
            "karelCol": 2,
            "karelDir": "North",
            "walls": [
                {
                    "r": 3,
                    "c": 1,
                    "d": "North"
                },
                {
                    "r": 3,
                    "c": 2,
                    "d": "North"
                },
                {
                    "r": 2,
                    "c": 2,
                    "d": "East"
                },
                {
                    "r": 1,
                    "c": 2,
                    "d": "North"
                },
                {
                    "r": 1,
                    "c": 1,
                    "d": "North"
                },
                {
                    "r": 4,
                    "c": 0,
                    "d": "North"
                },
                {
                    "r": 4,
                    "c": 1,
                    "d": "North"
                },
                {
                    "r": 4,
                    "c": 2,
                    "d": "North"
                },
                {
                    "r": 4,
                    "c": 3,
                    "d": "North"
                },
                {
                    "r": 3,
                    "c": 3,
                    "d": "East"
                },
                {
                    "r": 2,
                    "c": 3,
                    "d": "East"
                },
                {
                    "r": 1,
                    "c": 3,
                    "d": "East"
                },
                {
                    "r": 1,
                    "c": 3,
                    "d": "North"
                },
                {
                    "r": 1,
                    "c": 0,
                    "d": "East"
                },
                {
                    "r": 2,
                    "c": 0,
                    "d": "East"
                },
                {
                    "r": 2,
                    "c": 2,
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
                        "limit": 1
                    },
                    "karel_turn": {
                        "active": true,
                        "limit": 1
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
                        "active": true,
                        "limit": 1
                    },
                    "karel_while": {
                        "active": true,
                        "limit": 1
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
            "toolbox": "\n  <xml>\n    \n    <Block type=\"karel_move\" id=\"karel_move\" />\n    <Block type=\"karel_turn_left\" id=\"karel_turn\" />\n    \n    \n    \n    \n        <Block type=\"controls_repeat_ext\" id=\"karel_repeat\">\n          <Value name=\"TIMES\">\n              <Shadow type=\"math_number\">\n              <Field name=\"NUM\">10</Field>\n              </Shadow>\n            </Value>\n          </Block>\n        \n    <Block type=\"karel_while_dropdown\" id=\"karel_while\" />\n    \n  </xml>\n"
        },
        "tags": {
            "customTags": [],
            "systemTags": [
                "Has 'Repeat'",
                "Has 'While'",
                "Limit Blocks"
            ]
        }
    },
    "e266aa31-4f85-44a2-970d-c2de547c8443": {
        "name": "Learn Repeat",
        "instructions": "With 'repeat\" blocks, you can do the same thing again and again with less code.",
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
                    "n": 10
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
                        "active": true,
                        "limit": -1
                    },
                    "karel_place": {
                        "active": true,
                        "limit": -1
                    },
                    "karel_pickup": {
                        "active": true,
                        "limit": 1
                    },
                    "karel_if": {
                        "active": false,
                        "limit": -1
                    },
                    "karel_repeat": {
                        "active": true,
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
            "toolbox": "\n  <xml>\n    \n    <Block type=\"karel_move\" id=\"karel_move\" />\n    <Block type=\"karel_turn_left\" id=\"karel_turn\" />\n    <Block type=\"karel_place_stone\" id=\"karel_place\" />\n    <Block type=\"karel_pickup_stone\" id=\"karel_pickup\" />\n    \n    \n        <Block type=\"controls_repeat_ext\" id=\"karel_repeat\">\n          <Value name=\"TIMES\">\n              <Shadow type=\"math_number\">\n              <Field name=\"NUM\">10</Field>\n              </Shadow>\n            </Value>\n          </Block>\n        \n    \n    \n  </xml>\n"
        },
        "tags": {
            "customTags": [],
            "systemTags": [
                "Has 'Repeat'",
                "Limit Blocks"
            ]
        }
    },
    "602f358b-6a1c-4028-aedc-132edb1f8f1d": {
        "name": "Repeat Challenge 1",
        "instructions": "Use 'repeats' to solve this challenge.  If you can, try using one",
        "hint": "Think about how to do one \"side\" of the square.  Then have Karel do that four times!",
        "preWorld": {
            "nCols": 3,
            "nRows": 3,
            "karelRow": 2,
            "karelCol": 0,
            "karelDir": "East",
            "walls": [],
            "stones": [
                {
                    "r": 2,
                    "c": 1,
                    "n": 1
                },
                {
                    "r": 1,
                    "c": 2,
                    "n": 1
                },
                {
                    "r": 0,
                    "c": 1,
                    "n": 1
                },
                {
                    "r": 1,
                    "c": 0,
                    "n": 1
                }
            ]
        },
        "postWorld": {
            "nCols": 3,
            "nRows": 3,
            "karelRow": 2,
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
                        "active": true,
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
            "toolbox": "\n  <xml>\n    \n    <Block type=\"karel_move\" id=\"karel_move\" />\n    <Block type=\"karel_turn_left\" id=\"karel_turn\" />\n    <Block type=\"karel_place_stone\" id=\"karel_place\" />\n    <Block type=\"karel_pickup_stone\" id=\"karel_pickup\" />\n    \n    \n        <Block type=\"controls_repeat_ext\" id=\"karel_repeat\">\n          <Value name=\"TIMES\">\n              <Shadow type=\"math_number\">\n              <Field name=\"NUM\">10</Field>\n              </Shadow>\n            </Value>\n          </Block>\n        \n    \n    \n  </xml>\n"
        },
        "tags": {
            "customTags": [],
            "systemTags": [
                "Has 'Repeat'"
            ]
        }
    },
    "c756c6db-d4da-48a9-a70e-a2d4018249e6": {
        "name": "Repeat Challenge 2",
        "instructions": "Use 'repeat' blocks to place all the blocks.",
        "hint": "If you're having trouble, test going down, placing the first stone, going back, and moving one spot to the left.  Once you get that working, repeat that code multiple times.",
        "preWorld": {
            "nCols": 6,
            "nRows": 3,
            "karelRow": 0,
            "karelCol": 5,
            "karelDir": "West",
            "walls": [
                {
                    "r": 2,
                    "c": 0,
                    "d": "East"
                },
                {
                    "r": 1,
                    "c": 0,
                    "d": "East"
                },
                {
                    "r": 2,
                    "c": 1,
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
                },
                {
                    "r": 2,
                    "c": 2,
                    "d": "East"
                },
                {
                    "r": 1,
                    "c": 3,
                    "d": "East"
                },
                {
                    "r": 2,
                    "c": 3,
                    "d": "East"
                },
                {
                    "r": 2,
                    "c": 4,
                    "d": "East"
                },
                {
                    "r": 1,
                    "c": 4,
                    "d": "East"
                }
            ],
            "stones": []
        },
        "postWorld": {
            "nCols": 6,
            "nRows": 3,
            "karelRow": 0,
            "karelCol": 0,
            "karelDir": "West",
            "walls": [
                {
                    "r": 2,
                    "c": 0,
                    "d": "East"
                },
                {
                    "r": 1,
                    "c": 0,
                    "d": "East"
                },
                {
                    "r": 2,
                    "c": 1,
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
                },
                {
                    "r": 2,
                    "c": 2,
                    "d": "East"
                },
                {
                    "r": 1,
                    "c": 3,
                    "d": "East"
                },
                {
                    "r": 2,
                    "c": 3,
                    "d": "East"
                },
                {
                    "r": 2,
                    "c": 4,
                    "d": "East"
                },
                {
                    "r": 1,
                    "c": 4,
                    "d": "East"
                }
            ],
            "stones": [
                {
                    "r": 2,
                    "c": 1,
                    "n": 1
                },
                {
                    "r": 2,
                    "c": 2,
                    "n": 1
                },
                {
                    "r": 2,
                    "c": 3,
                    "n": 1
                },
                {
                    "r": 2,
                    "c": 4,
                    "n": 1
                },
                {
                    "r": 2,
                    "c": 5,
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
                        "active": true,
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
            "toolbox": "\n  <xml>\n    \n    <Block type=\"karel_move\" id=\"karel_move\" />\n    <Block type=\"karel_turn_left\" id=\"karel_turn\" />\n    <Block type=\"karel_place_stone\" id=\"karel_place\" />\n    <Block type=\"karel_pickup_stone\" id=\"karel_pickup\" />\n    \n    \n        <Block type=\"controls_repeat_ext\" id=\"karel_repeat\">\n          <Value name=\"TIMES\">\n              <Shadow type=\"math_number\">\n              <Field name=\"NUM\">10</Field>\n              </Shadow>\n            </Value>\n          </Block>\n        \n    \n    \n  </xml>\n"
        },
        "tags": {
            "customTags": [],
            "systemTags": [
                "Has 'Repeat'"
            ]
        }
    },
    "7c881004-5661-4bef-be36-a4bb662822b2": {
        "name": "Learn While",
        "instructions": "The 'while' block will repeat the enclosed code over and over as long as the condition is true.  In this case, Karel will keep step forward as long as the path in front is clear.",
        "hint": "",
        "preWorld": {
            "nCols": 7,
            "nRows": 3,
            "karelRow": 2,
            "karelCol": 0,
            "karelDir": "East",
            "walls": [
                {
                    "r": 2,
                    "c": 0,
                    "d": "North"
                },
                {
                    "r": 2,
                    "c": 1,
                    "d": "North"
                },
                {
                    "r": 2,
                    "c": 2,
                    "d": "North"
                },
                {
                    "r": 2,
                    "c": 4,
                    "d": "East"
                }
            ],
            "stones": [
                {
                    "r": 2,
                    "c": 6,
                    "n": 1
                },
                {
                    "r": 0,
                    "c": 1,
                    "n": 1
                }
            ]
        },
        "postWorld": {
            "nCols": 7,
            "nRows": 3,
            "karelRow": 2,
            "karelCol": 4,
            "karelDir": "East",
            "walls": [
                {
                    "r": 2,
                    "c": 0,
                    "d": "North"
                },
                {
                    "r": 2,
                    "c": 1,
                    "d": "North"
                },
                {
                    "r": 2,
                    "c": 2,
                    "d": "North"
                },
                {
                    "r": 2,
                    "c": 4,
                    "d": "East"
                }
            ],
            "stones": [
                {
                    "r": 2,
                    "c": 6,
                    "n": 1
                },
                {
                    "r": 0,
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
                        "active": true,
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
            "workspace": "<xml xmlns=\"https://developers.google.com/blockly/xml\"><block type=\"karel_main\" id=\"main\" deletable=\"false\" x=\"44\" y=\"0\"><statement name=\"program\"><block type=\"karel_while_dropdown\" id=\"r|8E4ETA|_iTs%%ruqSu\" deletable=\"false\"><field name=\"CONDITION\">FRONT_CLEAR</field><statement name=\"LOOP\"><block type=\"karel_move\" id=\"I9W4AdpSR}2rt}Ife[:p\" deletable=\"false\"></block></statement></block></statement></block></xml>",
            "toolbox": "\n  <xml>\n    \n    <Block type=\"karel_move\" id=\"karel_move\" />\n    \n    \n    \n    \n    \n    <Block type=\"karel_while_dropdown\" id=\"karel_while\" />\n    \n  </xml>\n"
        },
        "tags": {
            "customTags": [],
            "systemTags": [
                "Has 'While'",
                "Parson's Problem"
            ]
        }
    },
    "230b25c5-d49f-435b-9dfb-3c7eb9f86ba1": {
        "name": "While Challenge 1",
        "instructions": "Use the 'while' block to solve this challenge, with only a few blocks available to use!",
        "hint": "",
        "preWorld": {
            "nCols": 6,
            "nRows": 2,
            "karelRow": 0,
            "karelCol": 5,
            "karelDir": "West",
            "walls": [],
            "stones": []
        },
        "postWorld": {
            "nCols": 6,
            "nRows": 2,
            "karelRow": 0,
            "karelCol": 0,
            "karelDir": "West",
            "walls": [],
            "stones": [
                {
                    "r": 0,
                    "c": 3,
                    "n": 1
                },
                {
                    "r": 0,
                    "c": 1,
                    "n": 1
                },
                {
                    "r": 0,
                    "c": 0,
                    "n": 1
                },
                {
                    "r": 0,
                    "c": 2,
                    "n": 1
                },
                {
                    "r": 0,
                    "c": 4,
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
                        "active": true,
                        "limit": -1
                    },
                    "karel_define": {
                        "active": false,
                        "limit": -1
                    }
                },
                "showToolbox": true,
                "disabled": false,
                "maxBlocks": 4,
                "customizerMode": false
            },
            "workspace": "<xml xmlns=\"https://developers.google.com/blockly/xml\"><block type=\"karel_main\" id=\"main\" deletable=\"false\" x=\"44\" y=\"0\"></block></xml>",
            "toolbox": "\n  <xml>\n    \n    <Block type=\"karel_move\" id=\"karel_move\" />\n    <Block type=\"karel_turn_left\" id=\"karel_turn\" />\n    <Block type=\"karel_place_stone\" id=\"karel_place\" />\n    <Block type=\"karel_pickup_stone\" id=\"karel_pickup\" />\n    \n    \n    <Block type=\"karel_while_dropdown\" id=\"karel_while\" />\n    \n  </xml>\n"
        },
        "tags": {
            "customTags": [],
            "systemTags": [
                "Has 'While'",
                "Limit Blocks"
            ]
        }
    },
    "ac5c0453-5cdc-4e59-92d1-c5c7f1a585df": {
        "name": "While Challenge 2",
        "instructions": "Quite a challenge!  Use your helper blocks ('while' and/or 'repeat') to get Karel to the goal!",
        "hint": "Notice that Karel starts facing left.  First, see if you can move forward, place the stone, go down to place six, come BACK up, and then end up facing left again.  If you can do that first one, you'll be in good shape for \"while\" or \"repeat\" to help you again.",
        "preWorld": {
            "nCols": 6,
            "nRows": 2,
            "karelRow": 0,
            "karelCol": 5,
            "karelDir": "West",
            "walls": [
                {
                    "r": 1,
                    "c": 4,
                    "d": "East"
                },
                {
                    "r": 1,
                    "c": 3,
                    "d": "East"
                },
                {
                    "r": 1,
                    "c": 2,
                    "d": "East"
                },
                {
                    "r": 1,
                    "c": 1,
                    "d": "East"
                },
                {
                    "r": 1,
                    "c": 0,
                    "d": "East"
                },
                {
                    "r": 1,
                    "c": 5,
                    "d": "North"
                }
            ],
            "stones": []
        },
        "postWorld": {
            "nCols": 6,
            "nRows": 2,
            "karelRow": 0,
            "karelCol": 0,
            "karelDir": "West",
            "walls": [
                {
                    "r": 1,
                    "c": 4,
                    "d": "East"
                },
                {
                    "r": 1,
                    "c": 3,
                    "d": "East"
                },
                {
                    "r": 1,
                    "c": 2,
                    "d": "East"
                },
                {
                    "r": 1,
                    "c": 1,
                    "d": "East"
                },
                {
                    "r": 1,
                    "c": 0,
                    "d": "East"
                },
                {
                    "r": 1,
                    "c": 5,
                    "d": "North"
                }
            ],
            "stones": [
                {
                    "r": 1,
                    "c": 0,
                    "n": 6
                },
                {
                    "r": 0,
                    "c": 0,
                    "n": 1
                },
                {
                    "r": 0,
                    "c": 1,
                    "n": 1
                },
                {
                    "r": 1,
                    "c": 1,
                    "n": 6
                },
                {
                    "r": 0,
                    "c": 2,
                    "n": 1
                },
                {
                    "r": 1,
                    "c": 2,
                    "n": 6
                },
                {
                    "r": 0,
                    "c": 3,
                    "n": 1
                },
                {
                    "r": 1,
                    "c": 3,
                    "n": 6
                },
                {
                    "r": 0,
                    "c": 4,
                    "n": 1
                },
                {
                    "r": 1,
                    "c": 4,
                    "n": 6
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
                        "active": true,
                        "limit": -1
                    },
                    "karel_while": {
                        "active": true,
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
            "toolbox": "\n  <xml>\n    \n    <Block type=\"karel_move\" id=\"karel_move\" />\n    <Block type=\"karel_turn_left\" id=\"karel_turn\" />\n    <Block type=\"karel_place_stone\" id=\"karel_place\" />\n    <Block type=\"karel_pickup_stone\" id=\"karel_pickup\" />\n    \n    \n        <Block type=\"controls_repeat_ext\" id=\"karel_repeat\">\n          <Value name=\"TIMES\">\n              <Shadow type=\"math_number\">\n              <Field name=\"NUM\">10</Field>\n              </Shadow>\n            </Value>\n          </Block>\n        \n    <Block type=\"karel_while_dropdown\" id=\"karel_while\" />\n    \n  </xml>\n"
        },
        "tags": {
            "customTags": [],
            "systemTags": [
                "Has 'Repeat'",
                "Has 'While'"
            ]
        }
    }
}