import 'blockly/javascript'

export default function initializeKarelBlocklyGenerators(Blockly) {
    /**
     * @license
     * 
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */

    /**
     * @fileoverview Define generation methods for custom blocks.
     * @author samelh@google.com (Sam El-Husseini)
     */

    const CONDITIONS_TO_KAREL_JS = {
        FRONT_CLEAR: 'karel.frontIsClear()',
        FRONT_BLOCKED: '!karel.frontIsClear()',
        STONES_PRESENT: 'karel.stonesPresent()',
        STONES_NOT_PRESENT: '!karel.stonesPresent()'
    }

    // More on generating code:
    // https://developers.google.com/blockly/guides/create-custom-blocks/generating-code
    Blockly.JavaScript['karel_main'] = function (block) {
        var statements_program = Blockly.JavaScript.statementToCode(block, 'program');
        return statements_program
    };

    Blockly.JavaScript['karel_move'] = function () {
        return 'karel.move();\n'
    };

    //  Monkeypatch callnoreturn so we can make the await
    // TODO Fix Bug when Learner Defins Fn Name that Starts with a Number
    Blockly.JavaScript['procedures_callreturn'] = function (block) {
        let funcName = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
        let args = [];
        let variables = block.getVars();
        for (let i = 0; i < variables.length; i++) {
            args[i] = Blockly.JavaScript.valueToCode(block, 'ARG' + i, Blockly.JavaScript.ORDER_NONE) || 'null';
        }
        var code = `await ${funcName}(${args.join(',')})`;
        return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
    };
    Blockly.JavaScript['procedures_callnoreturn'] = function (block) {
        return Blockly.JavaScript['procedures_callreturn'](block)[0] + ';\n';
    };

    Blockly.JavaScript['karel_turn_left'] = function () {
        return 'karel.turnLeft();\n'
    };

    Blockly.JavaScript['karel_place_stone'] = function (block) {
        var color = block.getFieldValue('COLOR');
        return 'karel.placeStone("' + color + '");\n'
    };

    Blockly.JavaScript['karel_pickup_stone'] = function (block) {
        var color = block.getFieldValue('COLOR');
        return 'karel.pickStone("' + color + '");\n'
    };

    Blockly.JavaScript['karel_if_dropdown'] = function (block) {
        var dropdown_condition = CONDITIONS_TO_KAREL_JS[block.getFieldValue('CONDITION')];
        var statements_then = Blockly.JavaScript.statementToCode(block, 'THEN');
        var code = 'if (' + dropdown_condition + ') { await step();\n';
        code += statements_then
        code += '}\n'
        return code;
    };

    Blockly.JavaScript['karel_ifelse'] = function (block) {
        var if_condition = CONDITIONS_TO_KAREL_JS[block.getFieldValue('IF0')];
        var if_statement = Blockly.JavaScript.statementToCode(block, 'THEN0');
        var code = 'if (' + if_condition + ') { await step();\n';
        code += if_statement
        code += '}\n'
        
        var i = 1;
        while(block.getInput('IF' + i)) {
            var elseif_condition = CONDITIONS_TO_KAREL_JS[block.getFieldValue('IF' + i)]
            var elseif_statement = Blockly.JavaScript.statementToCode(block, 'THEN' + i);
            code += 'else if (' + elseif_condition + ') { await step();\n';
            code += elseif_statement
            code += '}\n'
        }

        if (block.getInput('ELSE')) {
            var else_statement = Blockly.JavaScript.statementToCode(block, 'ELSE');
            code += 'else { await step()\n';
            code += else_statement
            code += '}\n'
        }

        return code;
    };

    var while_count = 0;
    Blockly.JavaScript['karel_while_dropdown'] = function (block) {
        var dropdown_condition = CONDITIONS_TO_KAREL_JS[block.getFieldValue('CONDITION')];
        var statements_loop = Blockly.JavaScript.statementToCode(block, 'LOOP');
        var code = 'var while_counter_' + while_count + ' = 100;\n';
        code += 'while (' + dropdown_condition + ') { await step();\n'
        code += 'if (--while_counter_' + while_count + ' === 0) karel.error = "Infinite loop!";\n'
        code += statements_loop + '\n'
        code += '}\n'
        ++while_count;
        return code;
    };
    Blockly.JavaScript['controls_whileUntil'] = function(block)  {
        var mode = block.getFieldValue('MODE');
        var condition = Blockly.JavaScript.valueToCode(
            block,
            'BOOL',
            mode === 'UNTIL' ? Blockly.JavaScript.ORDER_LOGICAL_NOT : Blockly.JavaScript.ORDER_NONE
        );
        var statements = Blockly.JavaScript.statementToCode(block, 'DO');
        var code = 'var while_counter_' + while_count + ' = 100;\n';
        code += 'while (' + condition + ') { await step();\n'
        code += 'if (--while_counter_' + while_count + ' === 0) karel.error = "Infinite loop!";\n'
        code += statements + '\n'
        code += '}\n'
        ++while_count;
        return code;
    };
}