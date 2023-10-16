import en from "./karelTranslationsEN";

export default function initializeKarelBlocklyBlocks(Blockly) {

    // Style Blockly Main function definition to look like other function definitions
    var karelMain = {
        "type": "karel_main",
        "message0": "%{BKY_KAREL_MAIN_TITLE} %1 %2",
        "args0": [
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "program"
            }
        ],
        "colour": 240,
        "tooltip": "Main function",
    }

    // Traditional Blockly style for Main function
    // var karelMain = {
    //   "type": "karel_main",
    //   "message0": "main %1",
    //   "args0": [
    //     {
    //       "type": "input_statement",
    //       "name": "program"
    //     }
    //   ],
    //   "colour": 240,
    //   "tooltip": "Main function",
    // }

    Blockly.Blocks['karel_main'] = {
        init: function () {
            this.jsonInit(karelMain);
        }
    }

    var karelMove = {
        "type": "karel_move",
        "message0": "%{BKY_KAREL_MOVE_FORWARD}",
        "previousStatement": null,
        "nextStatement": null,
        "colour": 160
    }

    Blockly.Blocks['karel_move'] = {
        init: function () {
            this.jsonInit(karelMove);
        }
    };

    // mostly so that we can make a pretty block in
    // problem description...
    var karelCall = {
        "type": "karel_call",
        "message0": "%1",
        "args0": [
            {
                "type": "field_label_serializable",
                "name": "NAME"
            },
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 45,
    }

    Blockly.Blocks['karel_call'] = {
        init: function () {
            this.jsonInit(karelCall);
            this.setStyle('procedure_blocks');
        },
    };

    var karelTurnLeft = {
        "type": "karel_turn_left",
        "message0": "%{BKY_KAREL_TURN_LEFT}",
        "previousStatement": null,
        "nextStatement": null,
        "colour": 160
    }

    Blockly.Blocks['karel_turn_left'] = {
        init: function () {
            this.jsonInit(karelTurnLeft);
        }
    };

    var karelPlaceStone = {
        "type": "karel_place_stone",
        "message0": "%{BKY_KAREL_PLACE_STONE}",
        "previousStatement": null,
        "nextStatement": null,
        "colour": 160
    }

    Blockly.Blocks['karel_place_stone'] = {
        init: function () {
            this.jsonInit(karelPlaceStone);
        }
    };

    // var karelProcedure = {
    //   "type": "karel_procedure",
    //   "message0": "define %1 %2 %3",
    //   "args0": [
    //     {
    //       "type": "field_input",
    //       "name": "NAME",
    //       "text": "my name"
    //     },
    //     {
    //       "type": "input_dummy"
    //     },
    //     {
    //       "type": "input_statement",
    //       "name": "BODY"
    //     }
    //   ]
    // }

    // Blockly.Blocks['karel_procedure'] = {
    //   init: function() {
    //     this.jsonInit(karelProcedure);
    //     this.setStyle('procedure_blocks');
    //   }
    // };

    var karelPickupStone = {
        "type": "karel_pickup_stone",
        "message0": "%{BKY_KAREL_PICKUP_STONE}",
        "previousStatement": null,
        "nextStatement": null,
        "colour": 160
    }

    Blockly.Blocks['karel_pickup_stone'] = {
        init: function () {
            this.jsonInit(karelPickupStone);
        }
    };

    var karelFrontIsClear = {
        "type": "karel_front_is_clear",
        "message0": "%{BKY_KAREL_FRONT_IS_CLEAR}",
        "output": "Boolean",
        "colour": 45,
        "tooltip": "Check if there is an obstacle in front of Karel",
    }

    Blockly.Blocks['karel_front_is_clear'] = {
        init: function () {
            this.jsonInit(karelFrontIsClear);
        }
    };

    var karelStonesPresent = {
        "type": "karel_stones_present",
        "message0": "%{BKY_KAREL_STONES_PRESENT}",
        "output": "Boolean",
        "colour": 45,
        "tooltip": "Check if Karel is on top of any stones",
    }

    Blockly.Blocks['karel_stones_present'] = {
        init: function () {
            this.jsonInit(karelStonesPresent);
        }
    };

    var karelIfDropdown = {
        "type": "karel_if_dropdown",
        "message0": "%{BKY_CONTROLS_IF_MSG_IF} %1 %2 %3",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "CONDITION",
                "options": [
                    [
                        "%{BKY_KAREL_FRONT_IS_CLEAR}",
                        "FRONT_CLEAR"
                    ],
                    [
                        "%{BKY_KAREL_FRONT_IS_BLOCKED}",
                        "FRONT_BLOCKED"
                    ],
                    [
                        "%{BKY_KAREL_STONES_PRESENT}",
                        "STONES_PRESENT"
                    ],
                    [
                        "%{BKY_KAREL_STONES_NOT_PRESENT}",
                        "STONES_NOT_PRESENT"
                    ]
                ]
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "THEN"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "Check if Karel's path is blocked",
        "helpUrl": ""
    }

    Blockly.Blocks['karel_if_dropdown'] = {
        init: function () {
            this.jsonInit(karelIfDropdown);
            this.setStyle('logic_blocks');
        }
    };

    var karelIfelseIf = {
        "type": "karel_ifelse_if",
        "message0": "%{BKY_KAREL_IFELSE_IF}",
        "nextStatement": null
    };
    Blockly.Blocks['karel_ifelse_if'] = {
        init: function () {
            this.jsonInit(karelIfelseIf);
            this.setStyle('logic_blocks');
        }
    };

    var karelIfelseElseif = {
        "type": "karel_ifelse_elseif",
        "message0": "%{BKY_KAREL_IFELSE_ELSEIF}",
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "else if"
    };
    Blockly.Blocks['karel_ifelse_elseif'] = {
        init: function () {
            this.jsonInit(karelIfelseElseif);
            this.setStyle('logic_blocks');
        }
    }

    var karelIfelseElse = {
        "type": "karel_ifelse_else",
        "message0": "%{BKY_KAREL_IFELSE_ELSE}",
        "previousStatement": null,
        "tooltip": "else"
    };
    Blockly.Blocks['karel_ifelse_else'] = {
        init: function () {
            this.jsonInit(karelIfelseElse);
            this.setStyle('logic_blocks');
        }
    };

    var karelIfElse = {
        "type": "karel_ifelse",
        "message0": "%{BKY_KAREL_IFELSE_IF} %1 %2",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "IF0",
                "options": [
                    [
                        "%{BKY_KAREL_FRONT_IS_CLEAR}",
                        "FRONT_CLEAR"
                    ],
                    [
                        "%{BKY_KAREL_FRONT_IS_BLOCKED}",
                        "FRONT_BLOCKED"
                    ],
                    [
                        "%{BKY_KAREL_STONES_PRESENT}",
                        "STONES_PRESENT"
                    ],
                    [
                        "%{BKY_KAREL_STONES_NOT_PRESENT}",
                        "STONES_NOT_PRESENT"
                    ]
                ]
            },
            {
                "type": "input_statement",
                "name": "THEN0"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "Do something based on conditions"
    };

    Blockly.Blocks['karel_ifelse'] = {
        init: function () {
            this.jsonInit(karelIfElse);
            this.setStyle('logic_blocks');
            this.setMutator(new Blockly.Mutator(['karel_ifelse_elseif', 'karel_ifelse_else']));
        },

        elseIfCount: 0,
        hasElse: false,

        mutationToDom: function () {
            var container = Blockly.utils.xml.createElement('mutation');
            container.setAttribute('elseIfCount', this.elseIfCount);
            container.setAttribute('hasElse', this.hasElse);

            return container;
        },

        domToMutation: function (xmlElement) {
            this.elseIfCount = parseInt(xmlElement.getAttribute('elseIfCount'), 10);
            this.hasElse = xmlElement.getAttribute('hasElse') === 'true';

            this.updateShape();
        },

        decompose: function (workspace) {
            var ifBlock = workspace.newBlock('karel_ifelse_if');
            ifBlock.initSvg();

            var connection = ifBlock.nextConnection;

            for (var elseifIndex = 1; elseifIndex <= this.elseIfCount; elseifIndex++) {
                var elseifBlock = workspace.newBlock('karel_ifelse_elseif');
                elseifBlock.initSvg();

                connection.connect(elseifBlock.previousConnection);
                connection = elseifBlock.nextConnection;
            }

            if (this.hasElse) {
                var elseBlock = workspace.newBlock('karel_ifelse_else');
                elseBlock.initSvg();

                connection.connect(elseBlock.previousConnection);
            }

            return ifBlock;
        },

        compose: function (ifBlock) {
            var block = ifBlock.nextConnection.targetBlock();

            this.elseIfCount = 0;
            this.hasElse = false;

            var elseifStatementConnections = [null];
            var elseStatementConnection = null;

            while (block && !block.isInsertionMarker()) {
                switch (block.type) {
                    case 'karel_ifelse_elseif':
                        this.elseIfCount++;
                        elseifStatementConnections.push(block.statementConnection_);

                        break;

                    case 'karel_ifelse_else':
                        this.hasElse = true;
                        elseStatementConnection = block.statementConnection_;

                        break;

                    default:
                        throw TypeError('Unknown block type: ' + block.type);
                }

                block = block.nextConnection && block.nextConnection.targetBlock();
            }

            this.updateShape();
            this.reconnectChildBlocks(elseifStatementConnections, elseStatementConnection);
        },

        saveConnections: function (ifBlock) {
            var block = ifBlock.nextConnection.targetBlock();

            var elseifCount = 1;

            while (block) {
                switch (block.type) {
                    case 'karel_ifelse_elseif': {
                        var inputThen = this.getInput('THEN' + elseifCount);
                        block.statementConnection_ = inputThen && inputThen.connection.targetConnection;

                        elseifCount++;

                        break;
                    }

                    case 'karel_ifelse_else': {
                        var inputThen = this.getInput('ELSE');
                        block.statementConnection_ = inputThen && inputThen.connection.targetConnection;

                        break;
                    }

                    default:
                        throw TypeError('Unknown block type: ' + block.type);
                }

                block = block.nextConnection && block.nextConnection.targetBlock();
            }
        },

        updateShape: function () {
            if (this.getInput('ELSE')) {
                this.removeInput('ELSE');
            }

            for (var elseifIndex = 1; this.getInput('IF' + elseifIndex); elseifIndex++) {
                this.removeInput('IF' + elseifIndex);
                this.removeInput('THEN' + elseifIndex);
            }

            for (var elseifIndex = 1; elseifIndex <= this.elseIfCount; elseifIndex++) {
                this.appendDummyInput('IF' + elseifIndex).appendField('%{BKY_KAREL_IFELSE_ELSEIF}').appendField(
                    new Blockly.FieldDropdown(
                        function () {
                            return [
                                [
                                    en.KAREL_FRONT_IS_CLEAR,
                                    "FRONT_CLEAR"
                                ],
                                [
                                    en.KAREL_FRONT_IS_BLOCKED,
                                    "FRONT_BLOCKED"
                                ],
                                [
                                    en.KAREL_STONES_PRESENT,
                                    "STONES_PRESENT"
                                ],
                                [
                                    en.KAREL_STONES_NOT_PRESENT,
                                    "STONES_NOT_PRESENT"
                                ]
                            ];
                        }
                    )
                );
                this.appendStatementInput('THEN' + elseifIndex);
            }

            if (this.hasElse) {
                this.appendStatementInput('ELSE').appendField('%{BKY_KAREL_IFELSE_ELSE}');
            }
        },

        reconnectChildBlocks: function (elseifStatementConnections, elseStatementConnection) {
            for (var elseifIndex = 1; elseifIndex <= this.elseIfCount; elseifIndex++) {
                Blockly.Mutator.reconnect(elseifStatementConnections[elseifIndex], this, 'THEN' + elseifIndex);
            }
            
            Blockly.Mutator.reconnect(elseStatementConnection, this, 'ELSE');
        }
    };

    var karelIfFrontDropdown = {
        "type": "karel_if_front_dropdown",
        "message0": "%{BKY_KAREL_IF_FRONT_IS} %1 %2 %3",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "CONDITION",
                "options": [
                    [
                        "%{BKY_KAREL_CLEAR}",
                        "FRONT_CLEAR"
                    ],
                    [
                        "%{BKY_KAREL_BLOCKED}",
                        "FRONT_BLOCKED"
                    ]
                ]
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "THEN"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "Check if Karel's path is blocked",
        "helpUrl": ""
    }

    Blockly.Blocks['karel_if_front_dropdown'] = {
        init: function () {
            this.jsonInit(karelIfFrontDropdown);
            this.setStyle('logic_blocks');
        }
    };

    var karelIfStoneDropdown = {
        "type": "karel_if_stone_dropdown",
        "message0": "%{BKY_KAREL_IF_STONES_ARE} %1 %2 %3",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "CONDITION",
                "options": [
                    [
                        "%{BKY_KAREL_PRESENT}",
                        "STONES_PRESENT"
                    ],
                    [
                        "%{BKY_KAREL_NOT_PRESENT}",
                        "STONES_NOT_PRESENT"
                    ]
                ]
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "THEN"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "Check if Karel is on top of a stone",
        "helpUrl": ""
    }

    Blockly.Blocks['karel_if_stone_dropdown'] = {
        init: function () {
            this.jsonInit(karelIfStoneDropdown);
            this.setStyle('logic_blocks');
        }
    };

    var karelWhileFrontDropdown = {
        "type": "karel_while_front_dropdown",
        "message0": "%{BKY_KAREL_WHILE_FRONT_IS} %1 %2 %3",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "CONDITION",
                "options": [
                    [
                        "%{BKY_KAREL_CLEAR}",
                        "FRONT_CLEAR"
                    ],
                    [
                        "%{BKY_KAREL_BLOCKED}",
                        "FRONT_BLOCKED"
                    ]
                ]
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "LOOP"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "Repeat until condition is met",
        "helpUrl": ""
    }

    Blockly.Blocks['karel_while_front_dropdown'] = {
        init: function () {
            this.jsonInit(karelWhileFrontDropdown);
            this.setStyle('loop_blocks');
        }
    };

    var karelWhileDropdown = {
        "type": "karel_while_dropdown",
        "message0": "%{BKY_KAREL_WHILE} %1 %2 %3",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "CONDITION",
                "options": [
                    [
                        "%{BKY_KAREL_FRONT_IS_CLEAR}",
                        "FRONT_CLEAR"
                    ],
                    [
                        "%{BKY_KAREL_FRONT_IS_BLOCKED}",
                        "FRONT_BLOCKED"
                    ],
                    [
                        "%{BKY_KAREL_STONES_PRESENT}",
                        "STONES_PRESENT"
                    ],
                    [
                        "%{BKY_KAREL_STONES_NOT_PRESENT}",
                        "STONES_NOT_PRESENT"
                    ]
                ]
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "LOOP"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "Repeat until condition is met",
        "helpUrl": ""
    }

    Blockly.Blocks['karel_while_dropdown'] = {
        init: function () {
            this.jsonInit(karelWhileDropdown);
            this.setStyle('loop_blocks');
        }
    };

    var karelWhileStoneDropdown = {
        "type": "karel_while_stone_dropdown",
        "message0": "%{BKY_KAREL_WHILE_STONES_ARE} %1 %2 %3",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "CONDITION",
                "options": [
                    [
                        "%{BKY_KAREL_PRESENT}",
                        "STONES_PRESENT"
                    ],
                    [
                        "%{BKY_KAREL_NOT_PRESENT}",
                        "STONES_NOT_PRESENT"
                    ]
                ]
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "LOOP"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "Loop until condition is met",
        "helpUrl": ""
    }

    Blockly.Blocks['karel_while_stone_dropdown'] = {
        init: function () {
            this.jsonInit(karelWhileStoneDropdown);
            this.setStyle('loop_blocks');
        }
    };
}